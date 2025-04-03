
import { model, Schema, Types } from "mongoose";

const UserSchema = new Schema({
    username: {type: String, unique:true},
    password: String
})


 export const UserModel = model("User", UserSchema)

 const contentType = ["Youtube", "Twitter"]

 const ContentSchema = new Schema({
    link: {type: String, require:true},
    title: {type:String, require: true},
    type: {type:String, enum: contentType, require: true},
    tags:[{type: Types.ObjectId, ref:"Tag"}],
    userId: {type:Types.ObjectId, ref:"User", required:true}
 })

 export const ContentModel = model("Content", ContentSchema)

 const TagSchema = new Schema({
    title : {type: String, require: true, unique: true}
 })

 export const TagModel = model("Tag", TagSchema)

 const LinkSchema = new Schema({
    hash: {type: String, require:true},
    userId: {type: Types.ObjectId, ref:"User", require:true, unique:true}
 })

 export const LinkMOdel = model("Link", LinkSchema)