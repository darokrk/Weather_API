var url = 'https://api.openweathermap.org/data/2.5/weather?q=';
var city = input.value;
var id = 'f898e87d753c1e5de2cf49473bed40c5';
var content = document.getElementById('container');
var inputElem = document.getElementById('input');
var btnSearch = document.getElementById('btn-search');
var cityContainer = document.createElement('div');
var cityInfo = document.createElement('p');
var citySpan = document.createElement('span');



btnSearch.addEventListener('click', weatherSearch);
inputElem.addEventListener('keypress', function (e) {
    if (e.which == 13) {
        weatherSearch();
    }
})

function insertCityData(data) {
    // content.innerHTML = '';
    inputElem.value = '';
    cityContainer.classList.add('city-info')
    cityInfo.classList.add('city-info__content');
    citySpan.classList.add('city-info--span');
    citySpan.innerHTML = data.weather[0].description;
    cityInfo.innerText = data.name + ', ' + data.sys.country + ' ';
    cityInfo.appendChild(citySpan);
    cityContainer.appendChild(cityInfo);

    content.appendChild(cityContainer);
}

function weatherDisplay(data) {
    var iconContainer = document.createElement('div');
    iconContainer.classList.add('icon__content');
    var img = document.createElement('img');
    img.src = 'https://openweathermap.org/img/w/' + data[0].icon + '.png';
    iconContainer.appendChild(img);
    content.appendChild(iconContainer);
}

function insertMainData(data) {
    Object.keys(data).forEach(function (key, i) {
        var paragraph = document.createElement('p');
        paragraph.classList.add('temp-info');
        if (i === 0) {
            var tempSpan = document.createElement('span');
            tempSpan.classList.add('temp-info--span');
            var temp = document.createTextNode(data[key] + '°C');
            tempSpan.appendChild(temp);
            paragraph.appendChild(tempSpan);
            cityContainer.appendChild(paragraph);
        } else if (i === 1) {
            var pressure = document.createTextNode(key + ' ' + data[key] + ' hpa');
            paragraph.appendChild(pressure);
            cityContainer.appendChild(paragraph);
        } else if (i === 2) {
            var humidity = document.createTextNode(key + ' ' + data[key] + ' %');
            paragraph.appendChild(humidity);
            cityContainer.appendChild(paragraph);
        }
    })
}

function insertWindData(data) {
    var windParagraph = document.createElement('p');
    windParagraph.classList.add('wind-info');
    var wind = document.createTextNode('wind ' + data.speed + ' m/s');
    windParagraph.appendChild(wind);
    cityContainer.appendChild(windParagraph);
}

function insertCordData(data) {
    var coordLink = document.createElement('a');
    coordLink.classList.add('coord-link');
    var linkText = document.createTextNode('coords ' + data.lat + ',' + data.lon);
    coordLink.href = 'https://openweathermap.org/weathermap?zoom=12&lat=' + data.lat + '&lon=' + data.lon;
    coordLink.target = '_blank';
    coordLink.appendChild(linkText);
    cityContainer.appendChild(coordLink);
}

var xhr = new XMLHttpRequest();

function weatherSearch() {
    var inputValue = document.getElementById('input').value;
    xhr.open('GET', url + inputValue + '&units=metric' + '&APPID=' + id);
    xhr.addEventListener('load', function () {
        if (this.status === 200) {
            var json = JSON.parse(this.response);
            console.log(json);
            weatherDisplay(json.weather);
            insertCityData(json);
            insertMainData(json.main);
            insertWindData(json.wind);
            insertCordData(json.coord);
        }
    })
    xhr.send();
}