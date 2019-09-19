$(document).ready(() => {
    const SearchBox = $("#search");
    SearchBox.keyup( event => {
        if (event.keyCode == 13) {
            let query = SearchBox.val();
            SearchBox.val('');
            getWeather(query);
        }
      });
});

getWeather = (query) => {
    let url = 'http://api.openweathermap.org/data/2.5/weather?';
    let params = {
      APPID: "1177c4d6b79fc812f33857dfde2d9650",
      units: 'metric',
      q: query
    };
    $.ajax(url + $.param( params ), {
        success: ( data ) => showData(data),
        error: function (error) {
            console.log(error);
        }
    });
}

showData = (data) => {
    const temp = Math.round(data.main.temp) + "°C";
    const max = Math.round(data.main.temp_max) + "°C";
    const min = Math.round(data.main.temp_min) + "°C";
    const city = data.name;
    const country = data.sys.country;
    const humidity = "Humidity: " + data.main.humidity + "%";
    const wind = "Wind: " + data.wind.speed + " kmph";
    let desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    let currentdate = new Date();
    let hours = currentdate.getHours();
    let minutes = currentdate.getMinutes();
    let iconClass = "icon ";
    let ap;
    desc = desc.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });

    if ( hours > 12 ) {
        ap = 'PM'
        hours -= 12;
    } else {
        ap = 'AM';
    }

    if ( minutes < 10 ) {
        minutes = '0' + minutes;
    }

    const time = hours + ":" + minutes + " " + ap; 

    switch (icon) {
        // day
        case '01d':
        iconClass += 'wi wi-day-sunny';
        break;
        case '02d':
        iconClass += 'wi wi-day-cloudy';
        break;
        case '03d':
        iconClass += 'wi wi-cloud';
        break;
        case '04d':
        iconClass += 'wi wi-cloudy';
        break;
        case '09d':
        iconClass += 'wi wi-day-rain';
        break;
        case '10d':
        iconClass += 'wi wi-day-rain-mix';
        break;
        case '11d':
        iconClass += 'wi wi-day-lightning';
        break;
        case '13d':
        iconClass += 'wi wi-day-snow-wind';
        break;
        case '50d':
        iconClass += 'wi wi-fog';
        break;
        case '01n':
        iconClass += 'wi wi-night-clear';
        break;
        case '02n':
        iconClass += 'wi wi-night-alt-cloudy';
        break;
        case '03n':
        iconClass += 'wi wi-cloud';
        break;
        case '04n':
        iconClass += 'wi wi-cloudy';
        break;
        case '09n':
        iconClass += 'wi wi-showers';
        break;
        case '10n':
        iconClass += 'wi wi-night-alt-showers';
        break;
        case '11n':
        iconClass += 'wi wi-storm-showers';
        break;
        case '13n':
        iconClass += 'wi wi-wi-night-alt-snow';
        break;
        case '50n':
        iconClass += 'wi wi-fog';
        break;
      }

    $("#icon").addClass(iconClass);
    $("#time").text(time);
    $("#temp").text(temp);
    $("#maxTemp").text(max);
    $("#minTemp").text(min);
    $("#city").text(city);
    $("#country").text(country);
    $("#humidity").text(humidity);
    $("#wind").text(wind);
    $("#description").text(desc);
    $('.WeatherArea').css("display","flex");
    $('.WeatherArea').animate({height:"400px"});
}
