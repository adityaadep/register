const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
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
        required:true
    }
})

employeeSchema.pre("save",async function(next){
//also call this.isModified("password") if incase u r modifying it in future

if(this.isModified("password")){    
// const passwordHash=await bcrypt.hash(this.password,10);
this.password=await bcrypt.hash(this.password,10);
console.log(`the current password is ${this.password}`);

this.confirmpassword=undefined;
}
    next(); 

})



const Register=new mongoose.model("Register",employeeSchema);

module.exports=Register;