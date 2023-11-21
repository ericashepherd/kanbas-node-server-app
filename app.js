// const express = require("express");
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import "dotenv/config";
import session from "express-session";

const app = express();
app.use(cors());
app.use(express.json());

ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);
/*
const express = require('express') // older import syntax
const app = express()
app.get('/hello', (req, res) => {res.send(Life is good!')})
app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
*/

app.listen(process.env.PORT || 4000);
