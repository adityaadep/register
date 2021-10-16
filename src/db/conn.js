const express=require("express");
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/employee",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   // useCreateIndex:true
}).then(()=>{
    console.log("conection is successfull");
}).catch((err)=>{
    console.log(`no connection due to ${err}`);
})

