import express from "express";
import cors from "cors";
import pg from "pg";

const app = express()
const PORT = process.env.PORT

//middleware
app.use(cors())
app.use(express.json())

//database connection

//check if this is working
app.get("/api/status", (req, res) => {
  res.json({ status: "online" })
})

//---(WORKSHOP) TO-DO (ROUTES)---

//set up GET /api/habits


//set up POST /api/habits


//set up POST /api/log 



//---(ON YOUR OWN) TO-DOS (ROUTES)---

// set up DELETE /api/habits


// set up DELETE /api/log

//start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})