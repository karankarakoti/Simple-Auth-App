const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const ErrorHandler = require("../utils/error-handler");
const { localUpload, removeLocalFile } = require("../utils/file-management");

const router = express.Router();

router.route("/")
  .post(localUpload.single("file"), (req, res) => {
    res.status(200).json({ 
      success: true,
      data: req.file?.filename
    });
  })
  .delete(isAuthenticatedUser, (req, res, next) => {
    const { file } = req.body;
    if(!file) return next(new ErrorHandler(400, "Invalid Data"));
    removeLocalFile(file);
    res.status(200).json({
      success: true,
      message: "File Deleted",
    });
  });

module.exports = router;