const express=require("express");
const path=require("path");
const bcrypt=require("bcryptjs");
const app=express();
const port=process.env.PORT||8000;
const hbs=require("hbs");
require("./db/conn");
const Register=require("./models/registers")
const staticPath=path.join(__dirname,"../public");
const templatePath=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials");
app.use(express.json());


//this is to get form data of our html page 
app.use(express.urlencoded({extended:false}))
//app.use(express.static(staticPath));

app.set("view engine","hbs");
app.set("views",templatePath);

hbs.registerPartials(partial_path);
//console.log(path.join(__dirname,"../public"))
app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register",async(req,res)=>{
    try{
        // console.log(req.body.firstname)
        // res.send(req.body.firstname);

        const password=req.body.password;
        const cpassword=req.body.confirmpassword;

        if(password===cpassword){
            const registerEmployee=new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })
//we havbe to encrypt the password here
//using bcryptjs 
//middleware

            const registered=await registerEmployee.save();
            res.status(201).render("index");

        }else{
            res.send("passwords are not matching")
        }


    }
   catch(er){
       res.status(400).send(er);
   }
})


app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;

        


        //the whole document will be stored in the useremail variable i.e all the data
        const useremail=await Register.findOne({email:email});

        const isMatch=await bcrypt.compare(password,useremail.password);


        if(isMatch){
            res.status(201).render("index")
        }else{
            res.status(404).send("password are not matching");
        }

        


    }catch(er){
       res.status(400).send(er);
    }

    res.render("login");
})


const jwt=require("jsonwebtoken");

const createToken=async()=>{
   const Token=await jwt.sign({_id:"616adabfa42ddae59295132d"},"mynameisadityaadepvcogsdigitalmedia");
console.log(Token);

const userVerify=await jwt.verify(Token,"mynameisadityaadepvcogsdigitalmedia");

console.log(userVerify)
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZhZGFiZmE0MmRkYWU1OTI5NTEzMmQiLCJpYXQiOjE2MzQzOTQzNjl9.EF7REEmv5G6OEkGFODHyrSITDKN1flo8IGdPiMAokKg
createToken()






app.listen(port,()=>{
    console.log(`server is running at port numebr ${port}`);
})



/* 
hashing using bcryptjs

const securePassword=async(password1)=>{
    const password=await bcrypt.hash(password1,11);
    console.log(password);
    const passwordmatch=await bcrypt.compare("aditya123",password);
    console.log(passwordmatch)
}
securePassword("aditya123");


*/