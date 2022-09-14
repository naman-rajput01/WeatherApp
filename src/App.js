import { useState } from "react";

const api={
  key:"c045d4491af2353700aed4805ab81a89",
  base:"https://api.openweathermap.org/data/2.5/"
} 


function App() {
  const [query , setQuery]=useState('')
  const [weather ,setWeather]=useState({})
  
  
  const calssN=(n)=>{
    if(n.main===undefined)
    return 'app'
    else if(n.main.temp>16){
      return 'app warm'
    }
    
    return'app' 
  }
  const search= evt =>{
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=> res.json())
      .then(result => {setWeather(result)
     
      setQuery('')
      
      })
    }
  }


  const dateBuilder=(d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day=days[d.getDay()]
    let date=d.getDate()
    let month=months[d.getMonth()]
    let year=d.getFullYear()
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={calssN(weather)}>
     <main>
      <div className="search-box">
        <input type="text"
        className="search-bar"
        placeholder="Search..."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
         />
      </div>
      {weather.main && <>
      <div className="location-box">
        <div className="location">{weather.name} , {weather.sys.country} </div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">
          {Math.round(weather.main.temp)}*c
        </div>
        <div className="weather">
          {weather.weather[0].main}
        </div>
        <div className="img-box">
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
        </div>
      </div>
      </>
      }
     </main>
    </div>
  );
}

export default App;
