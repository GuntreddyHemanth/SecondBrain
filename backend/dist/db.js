"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkMOdel = exports.TagModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: String
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
const contentType = ["Youtube", "Twitter"];
const ContentSchema = new mongoose_1.Schema({
    link: { type: String, require: true },
    title: { type: String, require: true },
    type: { type: String, enum: contentType, require: true },
    tags: [{ type: mongoose_1.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", required: true }
});
exports.ContentModel = (0, mongoose_1.model)("Content", ContentSchema);
const TagSchema = new mongoose_1.Schema({
    title: { type: String, require: true, unique: true }
});
exports.TagModel = (0, mongoose_1.model)("Tag", TagSchema);
const LinkSchema = new mongoose_1.Schema({
    hash: { type: String, require: true },
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", require: true, unique: true }
});
exports.LinkMOdel = (0, mongoose_1.model)("Link", LinkSchema);
