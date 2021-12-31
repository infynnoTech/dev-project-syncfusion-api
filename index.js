var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var express = require("express");
// const api = require("./routes");
var helmet = require("helmet");
var fs = require("fs");
var passport = require("passport");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();
var dataPath = "./lib/jsondata.json";
// require("./seeder");
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
        error: err
    });
});
app.get("/getAllTasks", function (req, res) {
    res.send(getAllTasks());
});
app.post("/setAllTasks", function (req, res) {
    console.log({ tasks: req.file });
    return;
});
app.get("/add", function (req, res) {
    var _a = req.body, parentItem = _a.parentItem, index = _a.index, level = _a.level, taskData = _a.taskData, type = _a.type;
    var tasks = getAllTasks();
    if (parentItem) {
    }
    else {
        var temp = __spreadArray([], tasks, true);
        if (type === "Child") {
            //@ts-ignore
            temp[index].subtasks.push(taskData);
        }
        else {
            temp.splice(index, 0, taskData);
        }
        saveAllTasks(temp);
    }
    res.status(201).send({ message: "Task added successfully" });
});
app.get("/update", function (req, res) {
    var _a = req.body, parentItem = _a.parentItem, index = _a.index, level = _a.level, taskData = _a.taskData, type = _a.type;
    var tasks = getAllTasks();
    if (parentItem) {
    }
    else {
        var temp = __spreadArray([], tasks, true);
        if (type === "Child") {
            //@ts-ignore
            temp[index].subtasks.push(taskData);
        }
        else {
            temp.splice(index, 0, taskData);
        }
        saveAllTasks(temp);
    }
    res.status(201).send({ message: "Task added successfully" });
});
app.get("/delete", function (req, res) {
    var _a = req.body, parentItem = _a.parentItem, index = _a.index, level = _a.level, taskData = _a.taskData, type = _a.type;
    var tasks = getAllTasks();
    if (parentItem) {
    }
    else {
        var temp = __spreadArray([], tasks, true);
        temp.splice(index, 1);
        saveAllTasks(temp);
    }
});
app.get("/copy", function (req, res) {
    var _a = req.body, parentItem = _a.parentItem, index = _a.index, level = _a.level, selectedTasks = _a.selectedTasks, type = _a.type;
    var tasks = getAllTasks();
    if (parentItem) {
    }
    else {
        var temp = __spreadArray([], tasks, true);
        if (type === "Child") {
            //@ts-ignore
            temp[index].subtasks.push(selectedTasks);
        }
        else {
            temp.splice(index, 0, selectedTasks);
        }
        saveAllTasks(temp);
    }
});
app.get("/cut", function (req, res) {
    var _a = req.body, parentItem = _a.parentItem, index = _a.index, level = _a.level, selectedTasks = _a.selectedTasks, type = _a.type;
    var tasks = getAllTasks();
    if (parentItem) {
    }
    else {
        var temp = __spreadArray([], tasks, true);
        if (type === "Child") {
            //@ts-ignore
            temp[index].subtasks.push(selectedTasks);
        }
        else {
            temp.splice(index, 0, selectedTasks);
        }
        saveAllTasks(temp);
    }
});
var getAllTasks = function () {
    var jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};
var saveAllTasks = function (data) {
    var stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
};
module.exports = app;
