import express from "express";
import apiexamplesRouter from './routes/apiExamples.js';
import SqliteManager from "./SqliteManager.js";
import cors from 'cors';


const app=express();

const port = process.env.PORT || 3011;

app.use(express.json());
app.use(cors());
app.use('/apiexamples',apiexamplesRouter);
const sqm = new SqliteManager("./backend/data/northwind_database.sqlite");
const exampleRecords = await sqm.getRecordsWithSql(`SELECT ProductID, ProductName, UnitPrice FROM Products LIMIT 10`);

app.get('/',(req,res)=>{
    res.json(exampleRecords)
})
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})
