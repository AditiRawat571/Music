const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://b22ai004:JJVOraDr1EEyI5eT@cluster0.u15uqaf.mongodb.net/Music?retryWrites=true&w=majority",{
  useNewUrlParser:true,  
  useUnifiedTopology:true,
}).then(()=>{
  console.log("connection");
}).catch((err)=>{
  console.log(err);
})