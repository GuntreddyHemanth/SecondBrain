"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";
app.post("/api/v1/google-signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, displayName } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        // Check if user exists with this email as username
        let user = yield db_1.UserModel.findOne({ username: email });
        // If user doesn't exist, create a new one with a random password
        if (!user) {
            // Generate a secure random password
            const securePassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
            user = yield db_1.UserModel.create({
                username: email,
                password: securePassword
            });
        }
        // Generate your app's JWT token
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, `${process.env.JWT_PASSWORD}`);
        // Return the token
        res.json({ token });
    }
    catch (error) {
        console.error("Google auth error:", error);
        res.status(401).json({
            message: "Authentication failed",
            error: error.message
        });
    }
}));
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        // const { username, password } = req.body as { username: User.username; password: User.password };
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.status(200).json({
            message: "user signed up successfully"
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username: username,
        password: password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, `${process.env.JWT_PASSWORD}`);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link,
        title,
        type,
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content Created"
    });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content/:contentId", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.contentId;
    yield db_1.ContentModel.deleteMany({
        _id: contentId,
        userId: req.userId
    });
    res.json({
        message: "Deleted successfully"
    });
}));
app.post("/api/v1/brian/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        const existingLink = yield db_1.LinkMOdel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(11);
        yield db_1.LinkMOdel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            message: hash
        });
    }
    else {
        yield db_1.LinkMOdel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Remove link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkMOdel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect inputs"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
app.listen(PORT, HOST, () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGDB_URL);
    console.log("successfully connected mongdb", process.env.MONGDB_URL);
}));
