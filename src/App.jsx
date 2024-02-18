import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import clear from "./assets/clear.png"
import clouds from "./assets/clouds.png"
import drizzle from "./assets/drizzle.png"
import haze from "./assets/haze.png"
import mist from "./assets/mist.png"
import rain from "./assets/rain.png"
import snow from "./assets/snow.png"
import {SearchOutlined,HistoryOutlined} from "@ant-design/icons"


function App() {

  let [weather, setweather] = useState("");
  let [inpValue, setinpValue] = useState("");
  let [Temp, setTemp] = useState("");
  let [cityName, setCityName] = useState("");
  let [weatherpng, setweatherpng] = useState(null);
  useEffect(function () {
    getDataFromApi('islamabad')
  }, [])

  const getDataFromApi = (cityName) => {
    if (cityName) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=23452a215e99c24e452175b6ff4e8081`)
        .then((res) => res.json())
        .then((data) => {
          setTemp(Math.round(data.main.temp))
          setCityName(data.name)
          setweather(data.weather[0].main)

          if (data.weather[0].main === "Haze") {
            setweatherpng(haze)
          }
          else if (data.weather[0].main === "Clear") {
            setweatherpng(clear)
          }
          else if (data.weather[0].main === "Clouds") {
            setweatherpng(clouds)
          }
          else if (data.weather[0].main === "Drizzle") {
            setweatherpng(drizzle)
          }
          else if (data.weather[0].main === "Mist") {
            setweatherpng(mist)
          }
          else if (data.weather[0].main === "Smoke") {
            setweatherpng(haze)
          }
          else if (data.weather[0].main === "Rain") {
            setweatherpng(rain)
          }
          else if (data.weather[0].main === "Snow") {
            setweatherpng(snow)
          }

        })
        .catch((error) => {
          Swal.fire({
            imageUrl: "https://png.pngtree.com/png-vector/20220616/ourmid/pngtree-sad-apologizing-emoticon-holding-a-sign-with-the-text-sorry-png-image_5103588.png",
            imageWidth: 120,
            imageHeight: 110,
            text: "City not found!",
          });
        })
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Enter City Name!",
      });
    }
  }
 



  if (!cityName) {
    return <img src="https://i.gifer.com/ZZ5H.gif" id='loader' alt="" />
  }

  const SearchWeather = () => {
    getDataFromApi(inpValue)
    setinpValue("")
  }

  return (
    <div className="App">

      <div className="main">
        <div className='childDiv'>
          <input placeholder='Enter City Name' type="text" className="inp" value={inpValue} onChange={(e) => setinpValue(e.target.value)} name="" id="" />
          <button className='searchbtn' onClick={SearchWeather} id='searchbtn'><SearchOutlined style={{color:'white',fontSize:'20px',margin:'auto'}}/></button>
          <button className='searchbtn' onClick={weatherhistory}><HistoryOutlined className='history' style={{color:'white',fontSize:'20px',margin:'auto'}}/></button>
        </div>
        <h1 id='cityname'>{cityName}</h1>
        <h2 id='weather'>{weather}</h2>
        <img id='weatherImg' src={weatherpng} alt="" />
        <h2 id='temp'>{Temp}°C</h2><br />
        <div className='windDiv'>
  
        </div>
      </div>
    </div>
  );
}

export default App;