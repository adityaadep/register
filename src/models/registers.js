const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const employeeSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        
    },
    tokens:[{
        token:{
        type:String,
        required:true

        }
    }]
})

employeeSchema.methods.generateAuthToken= async function(){
    //converting password into hash
    try{
        const token=jwt.sign({_id:this._id.toString()},"mynameisadityaadepvcogsdigitalmedia");
        //here from tokens array of object we r assigning the value to jwt token in database
        this.tokens=this.tokens.concat({token:token});

        await this.save();
        console.log(token);
        return token; 



    }catch(e){
        res.send(e);
        console.log(e);
    }
}



employeeSchema.pre("save",async function(next){
//also call this.isModified("password") if incase u r modifying it in future

if(this.isModified("password")){    
// const passwordHash=await bcrypt.hash(this.password,10);
this.password=await bcrypt.hash(this.password,10);
this.confirmpassword=await bcrypt.hash(this.confirmpassword,10);
//console.log(`the current password is ${this.password}`);

this.confirmpassword=undefined;
}
    next(); 

})



const Register=new mongoose.model("Register",employeeSchema);

module.exports=Register;