/* các chức năng
- tìm và chọn vị trí 
- hiển hị nhiệt độ
- hiển thị độ ẩm
- hiển thị tốc độ gió
-     
*/

const apiKey = "c590254b458193c2cb1b1bb2baf0255d";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");

    async function checkWeather (city){
        const response =await fetch (apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status==404){//404 là khi search invalid city name 
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
        }
        else {
        let data = await response.json();
        //console.log (data);
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
        document.querySelector(".wind").innerHTML = data.wind.speed+"km/h";
        
        if (data.weather[0].main=="Clouds"){
            weatherIcon.src= "images/clouds.png";
        }
        else if (data.weather[0].main=="Clear"){
            weatherIcon.src= "images/clear.png";
        }
        else if (data.weather[0].main=="Rain"){
            weatherIcon.src= "images/rain.png";
        }
        else if (data.weather[0].main=="Drizzle"){
            weatherIcon.src= "images/drizzle.png";
        }
        else if (data.weather[0].main=="Mist"){
            weatherIcon.src= "images/mist.png";
        }
        document.querySelector(".weather").style.display = "block"; 
        document.querySelector(".error").style.display="none";    
        }
    }

    searchBtn.addEventListener("click", ()=>{ 
        checkWeather(searchBox.value);
    })

    //đây là dòng function enter để search, nhưng vẫn không sử dụng được
    searchBtn.addEventListener('keydown', (e)=>{ 
        if (e.key==='Enter'){
        checkWeather(searchBox.value);
        }
    })

    checkWeather();// gọi hàm weather để check loại thời thiết
