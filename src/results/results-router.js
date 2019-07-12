require('dotenv').config();
const express = require('express');
const ResultsRouter = express.Router();
const fetch = require('node-fetch')
fetch.Promise = global.Promise

