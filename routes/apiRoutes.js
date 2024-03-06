'use strict'; 
const express = require('express');
const routes = express.Router();
const apiURL = "https://minelife-api.azurewebsites.net/";

//Routes
routes.get('/pages/api/controllers', excel_to_pdf_converter);