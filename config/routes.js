const express = require("express");
const path = require("path");

const apiRoutes = require("../utils/api-routes");

module.exports.setRoutes = (app) => {
  app.get("/", (req, res) => {
    res.render(
      "common-template.ejs",
      {
        title: `Welcome to ${process.env.APP_NAME}`,
        desc: "Server Running🔥🔥",
        app: process.env.APP_NAME,
      }
    );
  });

  app.post("/redirect", (req, res) => {
    const { url } = req.query;
    res.redirect(url);
  });

  app.get("/ping", (req, res) => {
    res.json({ 
      success: true,
      message: "pong" 
    });
  });

  app.use("/api/v1", apiRoutes);  

  app.use("/public", express.static(path.join(__dirname, "../public")));
  app.use("/media", express.static(path.join(__dirname, process.env.UPLOAD_PATH)));      

  app.use("/*", (req, res) => {
    res.render(
      "common-template.ejs",
      {
        title: "404 Not Found",
        desc: "🚫Not Found🚫",
        app: process.env.APP_NAME,
      }     
    );
  })
}