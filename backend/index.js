import express from "express";
import cors from "cors";
import pg from "pg";

const app = express()
const PORT = process.env.PORT

//middleware
app.use(cors())
app.use(express.json())

