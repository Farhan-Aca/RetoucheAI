import express from "express";
import session from "express-session";
import authRoute from "./routes/auth.route.js"
import mongoose from "mongoose";
import cors from "cors";

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/")
.then(()=> console.log("Connected to the data base"))
.catch((err)=> console.log(`Error : ${err}`));

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true, // si tu utilises les cookies de session
}));

/*
app.use(session({
  secret: process.env.SESSION_SECRET,  // clé secrète pour signer l’ID de session
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000, // 1h
  },
}));*/

app.use(express.json());
app.use("/api/auth",authRoute);

app.listen(8800 , () => {
    console.log("server running !");
});