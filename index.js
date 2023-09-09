import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/city", async (req, res) => {
  const searchCity = req.body.city;

  const searchUrl =
    "http://api.weatherapi.com/v1/current.json?key=" +
    apiKey +
    "&q=" +
    searchCity +
    "&aqi=yes";
//   console.log(searchUrl);

  try {
    const result = await axios.get(searchUrl);
    const aqi= result.data.current.air_quality['us-epa-index'];
    let cls= "aqi";
    cls+=aqi;
    let category;
    switch(aqi)
    {
        case 1:
            category="Good";
        break;
        case 2:
            category="Moderate";
        break;
        case 3:
            category="Unhealthy for sensitive group";
        break;
        case 4:
            category="Unhealthy";
        break;
        case 5:
            category="Very Unhealthy";
        break;
        case 6:
            category="Hazardous";
        break;
        default:
            category="";
        
    }
    res.render("index.ejs", { data: result.data,aqiClass:cls,category:category });
    // console.log(cls);
    
     

  } catch (error) {
    console.log(error);
    res.render("index.ejs");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
