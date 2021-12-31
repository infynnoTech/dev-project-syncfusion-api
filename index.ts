const express = require("express");
const api = require("./routes");
const helmet = require("helmet");
const fs = require("fs");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const dataPath = "./lib/jsondata.json";

require("./seeder");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.get("/getAllTasks", (req: any, res: any) => {
  res.send(getAllTasks());
});

app.post("/setAllTasks", (req: any, res: any) => {
  console.log({tasks: req.file});
  return;
});

app.get("/add", function (req: any, res: any) {
  const { parentItem, index, level, taskData, type } = req.body;
  const tasks = getAllTasks();
  if (parentItem) {
  } else {
    let temp = [...tasks];
    if (type === "Child") {
      //@ts-ignore
      temp[index].subtasks.push(taskData);
    } else {
      temp.splice(index, 0, taskData);
    }
    saveAllTasks(temp);
  }
  res.status(201).send({ message: "Task added successfully" });
});

app.get("/update", function (req: any, res: any) {
  const { parentItem, index, level, taskData, type } = req.body;
  const tasks = getAllTasks();
  if (parentItem) {
  } else {
    let temp = [...tasks];
    if (type === "Child") {
      //@ts-ignore
      temp[index].subtasks.push(taskData);
    } else {
      temp.splice(index, 0, taskData);
    }
    saveAllTasks(temp);
  }
  res.status(201).send({ message: "Task added successfully" });
});

app.get("/delete", function (req: any, res: any) {
  const { parentItem, index, level, taskData, type } = req.body;
  const tasks = getAllTasks();
  if (parentItem) {
  } else {
    let temp = [...tasks];
    temp.splice(index, 1);
    saveAllTasks(temp);
  }
});

app.get("/copy", function (req: any, res: any) {
  const { parentItem, index, level, selectedTasks, type } = req.body;
  const tasks = getAllTasks();
  if (parentItem) {
  } else {
    let temp = [...tasks];
    if (type === "Child") {
      //@ts-ignore
      temp[index].subtasks.push(selectedTasks);
    } else {
      temp.splice(index, 0, selectedTasks);
    }
    saveAllTasks(temp);
  }
});

app.get("/cut", function (req: any, res: any) {
  const { parentItem, index, level, selectedTasks, type } = req.body;
  const tasks = getAllTasks();
  if (parentItem) {
  } else {
    let temp = [...tasks];
    if (type === "Child") {
      //@ts-ignore
      temp[index].subtasks.push(selectedTasks);
    } else {
      temp.splice(index, 0, selectedTasks);
    }
    saveAllTasks(temp);
  }
});

const getAllTasks = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

const saveAllTasks = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

module.exports = app;
