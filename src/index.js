const http = require('https');
const request=require('requests');
const express=require("express");
const path=require('path');
const axios=require('axios');
require("./db/connect-db.js");

const port=process.env.PORT || 8000;

const app=express();

const static_path=path.join(__dirname,"../public");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine","ejs");



// Defining a route handler for the GET requests
app.get('/', async (req, res) => {

const options_releases = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/charts/track',
  params: {
    locale: 'en-US',
    pageSize: '20',
    startFrom: '0'
  },
  headers: {
    'X-RapidAPI-Key': 'ce6b10e98bmsh6c44a8918ed3302p16c8bajsn4af974dc3335',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
};


  const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/search',
    params: {
      term: 'senorita',
      locale: 'en-US',
      offset: '0',
      limit: '5'
    },
    headers: {
      'X-RapidAPI-Key': 'ce6b10e98bmsh6c44a8918ed3302p16c8bajsn4af974dc3335',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };

try {
	const response = await axios.request(options);
  const response_releases = await axios.request(options_releases);
  res.render("index",{obj:response.data.tracks.hits ,releases : response_releases.data.tracks});
} catch (error) {
	console.error(error);
} 
});


// Defining a route handler for the POST requests
app.post('/index',async(req,res)=>{
  const options_releases = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/charts/track',
    params: {
      locale: 'en-US',
      pageSize: '20',
      startFrom: '0'
    },
    headers: {
      'X-RapidAPI-Key': 'ce6b10e98bmsh6c44a8918ed3302p16c8bajsn4af974dc3335',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  try {
    const item=req.body.search;
    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: item,
        locale: 'en-US',
        offset: '0',
        limit: '5'
      },
      headers: {
        'X-RapidAPI-Key': 'ce6b10e98bmsh6c44a8918ed3302p16c8bajsn4af974dc3335',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    const response_releases = await axios.request(options_releases);
    res.render("index",{obj:response.data.tracks.hits,releases : response_releases.data.tracks});
  } catch (error) {
    console.log(error);
  }
})

app.post('/contact',async(req,res)=>{
   res.send("Feedback subitted");
})
// Start the server

app.listen(port,()=>{
    console.log("LISTENING");
})