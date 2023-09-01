import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import 'dotenv/config';

const app= express();
const port =3000;
const apiKey=process.env.API_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/city",async(req,res)=>{

    const searchCity=req.body.city;

    const searchUrl = "http://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+searchCity+"&aqi=yes"
    console.log(searchUrl);

    try{
        const result =await axios.get(searchUrl);
        //res.render("index.ejs");
        res.render("index.ejs",{data:result.data});
        console.log(result.data);
    }catch (error) {
           console.log(error);
           res.render("index.ejs")
        //    alert("Invalid City Name !!!")
           }

    

})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });