// const express = require("express");
import session from "express-session";
import "dotenv/config";
import express from "express";
import EnrollmentRoutes from "./enrollments/routes.js";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import mongoose from "mongoose";
import LikesRoutes from "./likes/routes.js";
import FollowsRoutes from "./follows/routes.js";
import SectionRoutes from "./sections/routes.js";
import cors from "cors";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);

// checks connection status (from piazza)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB at localhost');
});

const app = express();
app.use(
  cors()
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

app.use(express.json());

FollowsRoutes(app);
LikesRoutes(app);
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);
SectionRoutes(app);
EnrollmentRoutes(app);

app.listen(4000);