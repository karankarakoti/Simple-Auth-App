const jwt = require("jsonwebtoken");
const { prisma } = require("../config/prisma");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/error-handler");

const getUser = async (id) => {
  let user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      verified: true,
    }
  });
  return user;
}

const isAuthenticatedUser = () => {
  return catchAsyncErrors(async (req, res, next) => {        
    const { token } = req.cookies;    
    if (!token) return next(new ErrorHandler(401, "Please Login to access this Resource"));        
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);        
    let user = await getUser(decodedData.id);    
    if(!user) return next(new ErrorHandler(401, "Please Login to access this Resource"));
    if(!user.verified) return next(new ErrorHandler(401, "Please verify your email to access this Resource"));
    req.user = user;   
    next();        
  });
}

module.exports = {
  isAuthenticatedUser
};