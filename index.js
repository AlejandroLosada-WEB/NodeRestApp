require("dotenv").config();
const express = require("express");
const path = require("path");

const  app  = require('./app');
const http = require('http');
const httpServer = http.createServer(app);




const { mongoose } = require("./server/database");


app.use(express.static('./server/dist/frontend',{redirect:false}));


app.get('*',function(req,res,next){
      res.sendFile(path.resolve('./server/dist/frontend/index.html'));
});


const server=httpServer.listen(process.env.PORT,()=>{
    console.log("Escuchando en el puerto "+process.env.PORT);
});



