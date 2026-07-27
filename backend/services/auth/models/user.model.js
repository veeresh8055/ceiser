import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name:String ,
    firebaseUid: {type:String , unique:true},
    email: {type:String , unique:true},
    avatar: String,


 }, {timestamps: true});

const User = model("User", userSchema);

export default User;