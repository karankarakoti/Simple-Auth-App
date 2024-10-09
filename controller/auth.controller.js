const bcrypt = require("bcrypt");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");

const { prisma } = require("../config/prisma");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/error-handler");
const sendEmail = require("../utils/send-email");

let cookieOptions = {}
if(process.env.NODE_ENV === "production"){
  cookieOptions = {
    ...cookieOptions,
    sameSite: "none",
    secure: true
  }
}else{
  cookieOptions = {
    ...cookieOptions,
    httpOnly: true
  }
}

const login = () => {
  return catchAsyncErrors(async (req, res, next) => {    
    const { email, password } = req.body;    
    if (!email || !password) {
      return next(new ErrorHandler(400, "Please provide all fields"));
    }    
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
      omit: {
        otp: true,
        otpExpires: true
      }
    });
    if(!user) return next(new ErrorHandler(401, "Invalid credentials"));
    if(!user.verified){      
      let otp = Math.floor(100000 + Math.random() * 900000);
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          otp,
          otpExpires: new Date(Date.now() + 15 * 60 * 1000)
        }
      });
      let frontendUrl = `${process.env.FRONTEND_URL}/auth/verify-otp?uid=${user.id}`;
      ejs.renderFile(
        __dirname + "/../views/message-template.ejs",
        {
          title: "OTP Verification",
          username: user.name,
          logo: `${process.env.SERVER_URL}/public/images/favicon-lg.png`,
          app: process.env.APP_NAME,
          messages: [            
            `Please use the OTP below to login.`,            
            `Your OTP is: ${otp}`,
            `This OTP is only valid for the next 15 minutes.`,
          ],
          buttons: [
            {
              label: "Verify OTP",
              url: frontendUrl
            }          
          ],
          notWorkingLabel: "If the button above is not working, please click on the link below to verify your OTP.",
          notWorkingUrl: frontendUrl
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const mailOptions = {
              from: process.env.SMTP_FROM,
              to: user.email,
              subject: "OTP Verification",
              html: data,
            };
            await sendEmail(mailOptions);
          }
        }
      );
      return res.status(400).json({
        success: true,
        error: "OTP sent to your email.",
        data: {
          redirect: `/auth/verify-otp?uid=${user.id}`          
        }
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return next(new ErrorHandler(401, "Invalid credentials"));
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    user.password = undefined;
    res
    .cookie("token", token, {
      ...cookieOptions,      
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    })
    .status(200)
    .json({
      success: true,
      data: user
    });
  });
}

const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .clearCookie("token")
    .json({
      success: true,
      message: "Logged Out"
    });
});

const register = (...userType) => {
  return catchAsyncErrors(async (req, res, next) => {
    const { 
      name,
      email,       
      password,      
    } = req.body;
    if (!name || !email || !password) {
      return next(new ErrorHandler(400, "Please provide all fields"));
    }    
    let _user = await prisma.user.findUnique({
      where: {
        email,
      }
    }); 
   
    if(_user) return next(new ErrorHandler(400, "User already exists"));    
    const hashedPassword = await bcrypt.hash(password, 10);    
    let data = {
      name,
      email,
      password: hashedPassword,
      otp: Math.floor(100000 + Math.random() * 900000),
      otpExpires: new Date(Date.now() + 15 * 60 * 1000),
    }
    
    let user = await prisma.user.create({
      data: data
    });
    
    let otpUrl = `${process.env.FRONTEND_URL}/auth/verify-otp?uid=${user.id}`;        
    if(otpUrl){
      ejs.renderFile(
        __dirname + "/../views/message-template.ejs",
        {
          title: "User Registration Successful!",
          username: user.name,
          logo: `${process.env.SERVER_URL}/public/images/favicon-lg.png`,
          app: process.env.APP_NAME,
          messages: [
            `Thank you for registering with us.`,
            `Please use the OTP below to login.`,
            `Your OTP is: ${user.otp}`,
            `This OTP is only valid for the next 15 minutes.`,            
          ],
          buttons: [
            {
              label: "Verify OTP",
              url: otpUrl
            }          
          ],
          notWorkingLabel: "If the button above is not working, please click on the link below to verify your OTP.",
          notWorkingUrl: otpUrl
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const mailOptions = {
              from: process.env.SMTP_FROM,
              to: user.email,
              subject: "Registration Successful!",
              html: data,
            };
            await sendEmail(mailOptions);
          }
        }
      );      
    }    
    user.password = undefined;
    user.otp = undefined;
    user.otpExpires = undefined;
    res    
      .status(200)
      .json({
        success: true,
        data: {      
          redirect: `/auth/verify-otp?uid=${user.id}`,
        },
        message: "Registration successful. Please check your email for further instructions."
      });
  });
}

const getProfile = (...userType) => {
  return catchAsyncErrors(async (req, res, next) => {            
    let user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      omit: {
        otp: true,
        otpExpires: true,
        password: true
      }
    });          
    if(!user) return next(new ErrorHandler(401, "User not found"));
    if(!user.verified) return next(new ErrorHandler(401, "User not verified"));
    res    
    .status(200)
    .json({
      success: true,
      data: user
    });
  });
}

const verifyOTP = () => {
  return catchAsyncErrors(async (req, res, next) => {
    const { uid } = req.query;
    const { otp } = req.body;
    if (!otp || !uid) {
      return next(new ErrorHandler(400, "Please provide all fields"));
    }
    let user = await prisma.user.findUnique({
      where: {
        id: uid,
      }
    });
    if(!user) return next(new ErrorHandler(401, "User not found"));
    if(user.verified) return next(new ErrorHandler(400, "User already verified"));
    if(user.otp !== parseInt(otp)) return next(new ErrorHandler(400, "Invalid OTP"));
    if(user.otpExpires < Date.now()){  
      let newOtp = Math.floor(100000 + Math.random() * 900000);    
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          otp: newOtp,
          otpExpires: new Date(Date.now() + 15 * 60 * 1000)
        }
      });
      let frontendUrl = `${process.env.FRONTEND_URL}/auth/verify-otp?uid=${user.id}`;
      ejs.renderFile(
        __dirname + "/../views/message-template.ejs",
        {
          title: "OTP Verification",
          username: user.name,
          logo: `${process.env.SERVER_URL}/public/images/favicon-lg.png`,
          app: process.env.APP_NAME,
          messages: [            
            `Please use the OTP below to login.`,            
            `Your OTP is: ${newOtp}`,
            `This OTP is only valid for the next 15 minutes.`,
          ],
          buttons: [
            {
              label: "Verify OTP",
              url: frontendUrl
            }          
          ],
          notWorkingLabel: "If the button above is not working, please click on the link below to verify your OTP.",
          notWorkingUrl: frontendUrl
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const mailOptions = {
              from: process.env.SMTP_FROM,
              to: user.email,
              subject: "OTP Verification",
              html: data,
            };
            await sendEmail(mailOptions);
          }
        }
      );
      return res.status(400).json({
        success: false,
        error: "OTP expired. New OTP sent to your email.",
        data: {
          redirect: `/auth/verify-otp?uid=${user.id}`
        }
      });
    }
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        verified: true,
        otp: null,
        otpExpires: null
      }
    });    
    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });    
    res
      .cookie("token", token, {
        ...cookieOptions,      
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({
        success: true,
        message: "OTP verified successfully.",
      });
  });
}

module.exports = {
  login,
  logout,
  register,  
  getProfile,  
  verifyOTP
};