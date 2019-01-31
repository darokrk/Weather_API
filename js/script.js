(function() {
  const id = "f898e87d753c1e5de2cf49473bed40c5";
  const content = document.getElementById("weather__box");
  const inputElem = document.getElementById("input");

  const form = document.getElementById("form");
  const cityContainer = document.createElement("div");

  form.addEventListener("submit", weatherSearch);

  function weatherSearch(e) {
    e.preventDefault();
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${
      inputElem.value
    }&units=metric&APPID=${id}`;
    if (inputElem.value.length > 0) {
      fetch(URL)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error(response.status);
        })
        .then(response => response.json())
        .then(data => {
          insertData(data);
        })
        .catch(err => {
          console.log(err + " something goes wrong :(");
          alert("Cannot find that name city :(");
        });
    } else {
      alert("Please insert city name first");
    }
  }

  function insertData(data) {
    content.innerHTML = "";
    cityContainer.innerHTML = "";
    inputElem.value = "";
    weatherDisplay(data.weather);
    insertCityData(data);
    insertMainData(data.main);
    insertWindData(data.wind);
    insertCordData(data.coord);
  }

  function insertCityData(data) {
    const cityInfo = document.createElement("p");
    const citySpan = document.createElement("span");
    cityContainer.classList.add("city__box");
    cityInfo.classList.add("city__text");
    citySpan.classList.add("city__text--span");
    citySpan.innerHTML = data.weather[0].description;
    cityInfo.innerText = `${data.name}, ${data.sys.country} `;
    cityInfo.appendChild(citySpan);
    cityContainer.appendChild(cityInfo);

    content.appendChild(cityContainer);
  }

  function weatherDisplay(data) {
    const iconBox = document.createElement("div");
    iconBox.classList.add("icon__box");
    const img = document.createElement("img");
    img.classList.add("icon__img");
    img.src = `https://openweathermap.org/img/w/${data[0].icon}.png`;
    iconBox.appendChild(img);
    content.appendChild(iconBox);
  }

  function insertMainData(data) {
    Object.keys(data).forEach((key, i) => {
      const mainParagraph = document.createElement("p");
      mainParagraph.classList.add("temp__info");
      if (i === 0) {
        const tempSpan = document.createElement("span");
        tempSpan.classList.add("temp__info--span");
        const temp = document.createTextNode(`${Math.floor(data[key])} °C`);
        tempSpan.appendChild(temp);
        mainParagraph.appendChild(tempSpan);
        cityContainer.appendChild(mainParagraph);
      } else if (i === 1) {
        const pressure = document.createTextNode(`${key} ${data[key]} hpa`);
        mainParagraph.appendChild(pressure);
        cityContainer.appendChild(mainParagraph);
      } else if (i === 2) {
        const humidity = document.createTextNode(`${key} ${data[key]} %`);
        mainParagraph.appendChild(humidity);
        cityContainer.appendChild(mainParagraph);
      } else return;
    });
  }

  function insertWindData(data) {
    const windParagraph = document.createElement("p");
    windParagraph.classList.add("wind__info");
    const wind = document.createTextNode(`wind ${data.speed} m/s`);
    windParagraph.appendChild(wind);
    cityContainer.appendChild(windParagraph);
  }

  function insertCordData(data) {
    const coordParagraph = document.createElement("p");
    coordParagraph.classList.add("coord__info");
    coordParagraph.innerHTML = "coords";
    const coordLink = document.createElement("a");
    coordLink.classList.add("coord__link");
    const linkText = document.createTextNode(`${data.lat} , ${data.lon}`);
    coordLink.href = `https://openweathermap.org/weathermap?zoom=12&lat=${
      data.lat
    }&lon=${data.lon}`;
    coordLink.target = "_blank";
    coordLink.appendChild(linkText);
    coordParagraph.appendChild(coordLink);
    cityContainer.appendChild(coordParagraph);
  }
})();
