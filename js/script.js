var url = 'https://api.openweathermap.org/data/2.5/weather?q=';
var id = 'f898e87d753c1e5de2cf49473bed40c5';
var content = document.getElementById('weather__box');
var inputElem = document.getElementById('input');

var form = document.getElementById('form');
var cityContainer = document.createElement('div');

form.addEventListener('submit', weatherSearch);

function weatherSearch(event) {

    event.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + inputElem.value + '&units=metric&APPID=' + id);
    xhr.addEventListener('load', function () {
        if (this.status === 200) {
            var json = JSON.parse(this.response);
            insertData(json);
        } else if (this.status == 400) {
            alert('Please insert city name first');
        }
    })
    xhr.send();
}

function insertData(data) {
    content.innerHTML = '';
    cityContainer.innerHTML = '';
    inputElem.value = '';
    weatherDisplay(data.weather);
    insertCityData(data);
    insertMainData(data.main);
    insertWindData(data.wind);
    insertCordData(data.coord);
}

function insertCityData(data) {
    var cityInfo = document.createElement('p');
    var citySpan = document.createElement('span');
    cityContainer.classList.add('city__box');
    cityInfo.classList.add('city__text');
    citySpan.classList.add('city__text--span');
    citySpan.innerHTML = data.weather[0].description;
    cityInfo.innerText = data.name + ', ' + data.sys.country + ' ';
    cityInfo.appendChild(citySpan);
    cityContainer.appendChild(cityInfo);

    content.appendChild(cityContainer);
}

function weatherDisplay(data) {
    var iconBox = document.createElement('div');
    iconBox.classList.add('icon__box');
    var img = document.createElement('img');
    img.classList.add('icon__img');
    img.src = 'https://openweathermap.org/img/w/' + data[0].icon + '.png';
    iconBox.appendChild(img);
    content.appendChild(iconBox);
}

function insertMainData(data) {
    Object.keys(data).forEach(function (key, i) {
        var mainParagraph = document.createElement('p');
        mainParagraph.classList.add('temp__info');
        if (i === 0) {
            var tempSpan = document.createElement('span');
            tempSpan.classList.add('temp__info--span');
            var temp = document.createTextNode(data[key] + ' °C');
            tempSpan.appendChild(temp);
            mainParagraph.appendChild(tempSpan);
            cityContainer.appendChild(mainParagraph);
        } else if (i === 1) {
            var pressure = document.createTextNode(key + ' ' + data[key] + ' hpa');
            mainParagraph.appendChild(pressure);
            cityContainer.appendChild(mainParagraph);
        } else if (i === 2) {
            var humidity = document.createTextNode(key + ' ' + data[key] + ' %');
            mainParagraph.appendChild(humidity);
            cityContainer.appendChild(mainParagraph);
        }
    })
}

function insertWindData(data) {
    var windParagraph = document.createElement('p');
    windParagraph.classList.add('wind__info');
    var wind = document.createTextNode('wind ' + data.speed + ' m/s');
    windParagraph.appendChild(wind);
    cityContainer.appendChild(windParagraph);
}

function insertCordData(data) {
    var coordParagraph = document.createElement('p');
    coordParagraph.classList.add('coord__info');
    coordParagraph.innerHTML = 'coords';
    var coordLink = document.createElement('a');
    coordLink.classList.add('coord__link');
    var linkText = document.createTextNode(data.lat + ',' + data.lon);
    coordLink.href = 'https://openweathermap.org/weathermap?zoom=12&lat=' + data.lat + '&lon=' + data.lon;
    coordLink.target = '_blank';
    coordLink.appendChild(linkText);
    coordParagraph.appendChild(coordLink);
    cityContainer.appendChild(coordParagraph);
}