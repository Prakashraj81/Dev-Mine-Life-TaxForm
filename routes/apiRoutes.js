'use strict'; 
const fs = require('fs');
const express = require('express');
const { url } = require('inspector');
const { headers } = require('next/headers');
const routes = express.Router();
const apiURL = "https://minelife-api.azurewebsites.net/";

//Routes
//routes.get(`${apiURL}user_login`, userLogin);

const function userLogin(params) {
    url: "https://minelife-api.azurewebsites.net/user_login",
    headers: "application/headers",
    data: params
}

const function ExportAPI(params) {
    userLogin;
}

export default function ExportAPI;
module.exports = routes;