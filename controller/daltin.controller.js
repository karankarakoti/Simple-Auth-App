const ejs = require("ejs");

const { prisma } = require("../config/prisma");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/error-handler");
const sendEmail = require("../utils/send-email");

const register = catchAsyncErrors(async (req, res, next) => {  
  const {
    personal,
    address,
    academic,
    education,    
    background,
    documents,
  } = req.body;
  if (!personal || !address || !academic || !education || !background || !documents) return next(new ErrorHandler(400, "All fields are required"));  
  let data = {
    title: personal?.title || "",
    firstName: personal?.firstName || "",
    middleName: personal?.middleName || "",
    lastName: personal?.lastName || "",
    mobile: personal?.mobile || "",
    emergencyContact: personal?.emergencyContact || "",
    email: personal?.email || "",
    martialStatus: personal?.martialStatus || "",
    gender: personal?.gender || "",
    dob: personal?.dob ? new Date(personal?.dob) : null,
    city: address?.city?.label || "",
    state: address?.state?.label || "",
    country: address?.country?.label || "",
    pincode: address?.pincode || "",
    passportNumber: address?.passportNumber || "",
    passportExpiry: address?.passportExpiry ? new Date(address?.passportExpiry) : null,
    intrerestedCountry: academic?.intrerestedCountry?.label || "",
    englishProficiencyTest: academic.englishProficiencyTest,
    englishProficiencyTestScore: academic?.englishProficiencyTestScore || 0,
    visaRejected: background.visaRejected,
    gapInEducation: background.gapInEducation,
    Education: {
      createMany: {
        data: education?.map((item) => ({
          qualification: item?.qualification || "",
          university: item?.university || "",
          percentage: item?.percentage,
          passingYear: item?.passingYear,
          country: item?.country?.label || "",
        }))
      }
    },
    Documents: {
      createMany: {
        data: documents?.map((item) => ({
          label: item?.label || "",
          value: item?.value || "",
          url: item?.url || "",
        }))
      }
    }
  }; 
  const student = await prisma.daltinStudent.create({    
    data
  });
  if(!student) return next(new ErrorHandler(400, "Failed to register student"));
  if(student?.email){
    ejs.renderFile(
      __dirname + "/../views/message-template.ejs",
      {
        title: "Student Registration Successful!",
        username: student.firstName,
        logo: `${process.env.SERVER_URL}/public/images/favicon-lg.png`,
        app: process.env.APP_NAME,
        messages: [
          `Thank you for registering with us.`,
          `Your registration is successful.`,          
        ],
        buttons: [
          {
            label: "View Application",
            url: `${process.env.FRONTEND_URL}/register/${student.id}`
          }          
        ],
        notWorkingLabel: "If the button above is not working, please click on the link below to view your application.",
        notWorkingUrl: `${process.env.FRONTEND_URL}/register/${student.id}`
      },
      async (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const mailOptions = {
            from: process.env.SMTP_FROM,
            to: student.email,
            subject: "Registration Successful!",
            html: data,
          };
          await sendEmail(mailOptions);
        }
      }
    );      
  }    
  res.status(200).json({
    success: true,    
    message: "Student registered successfully",
    data: student
  });
});

const get = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler(400, "Student id is required"));
  const student = await prisma.daltinStudent.findUnique({
    where: {
      id
    },
    include: {
      Education: true,
      Documents: true
    }
  });
  if(!student) return next(new ErrorHandler(400, "Student not found"));
  res.status(200).json({
    success: true,    
    data: student
  });
});

module.exports = {
  register,
  get
};