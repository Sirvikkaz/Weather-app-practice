let weather = {
    "apiKey":"0067023a5d51cc75b942bd79a3a3f5b8",
    fetchWeather: function(city){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + city
        +'&units=metric&appid='+
        this.apiKey
        )
    .then(response=>response.json())
    .then(data=>weather.displayWeather(data)) //we wont console.log data since we want to use the data practically this time around;
    /*then(data=>weather.displayWeather(data)) this code will pass the data to the displayWeather function,which will then store only 
    the necessary data*/
    .catch(err=>(console.log(err)))
    },
    displayWeather: function(data){
        const {name} = data; // const name = data.name
        const {description, icon} = data.weather[0] //const description = data.weather['description'], const icon = data.weather['icon']
        const {temp, humidity} = data.main
        const {speed} = data.wind;
        console.log(name,description,icon,temp,humidity,speed)
        document.querySelector('.temp').innerHTML = temp + '°C';
        document.querySelector('.city').innerHTML = 'Weather in ' + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" +  icon + "@2x.png"; 
        document.querySelector('.description').innerHTML = description;
        document.querySelector('.humidity').innerHTML = 'Humidity :' + humidity + '%';
        document.querySelector('.wind').innerHTML = "Speed :" + speed + 'Km/h';
        document.querySelector('.weather').classList.remove('loading')
    },
    search: function(){
        weather.fetchWeather(document.querySelector('.search-bar').value)
    }
}
document.querySelector('.search button').addEventListener('click', function(){
    weather.search()
})
//making the enter key also work for search
document.querySelector('.search-bar').addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        weather.search()
    }
})
weather.fetchWeather('London')