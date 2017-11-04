const mongoose=require('mongoose');
// mongoose.Promise =global.Promise;
const Schema=mongoose.Schema;

let userSchema=new Schema({
    key:String,
    image:[String],
});
module.exports=mongoose.model('user',userSchema);
