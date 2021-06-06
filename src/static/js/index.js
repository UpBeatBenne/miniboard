var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let timeout;

const crazyArray = [
    {
        id: "putin",
        day: "7",
        month: "October",
        message: "HAPPY BIRTHDAY PRESIDENT PUTIN!"
    },
    {
        id: "jong",
        day: "8",
        month: "January",
        message: "happy birthday to the supreme leader"
    },
    {
        id: "laden",
        day: "10",
        month: "March",
        message: "it's osama bin laden's birthday"
    }
];

async function fadeInNotif() {
    var fade = document.getElementById("notif");
    var opacity = 0.01;
    var intervalID = setInterval(function() {
        if (opacity <= 0) return clearInterval(intervalID);
        if (opacity < 1) {
            opacity = opacity + 0.01
            fade.style.opacity = opacity;
        }
    }, 15);
}

async function fadeOutNotif() {
    var fade = document.getElementById("notif");
    var opacity = 1;
    var intervalID = setInterval(function() {
        if (opacity <= 0) return clearInterval(intervalID);
        if (opacity !== 0) {
            opacity = opacity - 0.01
            fade.style.opacity = opacity;
        }
    }, 15);
}

const hoursOfDay = {
    "morning": [5, 6, 7, 8, 9, 10, 11],
    "noon": [12],
    "afternoon": [13, 14, 15, 16, 17],
    "evening": [18, 19, 20, 21],
    "night": [22, 23, 0, 1, 2, 3, 4]
};
const configuration = window.bridge.information.getConfig();
const name = configuration.decor.name;

function pickTz() {
    if (configuration.decor["12hr"] == true) {
        return new Date().toLocaleTimeString("en-US").replace(/(.*)\D\d+/, '$1');
    } if (configuration.decor["12hr"] !== true) {
        return new Date().toLocaleTimeString("en-GB").replace(/(.*)\D\d+/, '$1');
    }
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTime() {
    var d = pickTz();
    document.getElementById("timeJS").innerHTML = d;
}

function getGreeting() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate());
    const birthday = configuration.decor.birthday.toLowerCase().split(" ")

    const greetings = {
        "morning": [`Good morning, ${name}!`, `Rise and shine, ${name}!`, `How's your morning ${name}?`, `Did you have a nice sleep ${name}?`, `When's breakfast, ${name}?`],
        "noon": [`Howdy, ${name}, how's your lunch been?`, `Lunch-time, ${name}!`, `How was the food, ${name}?`],
        "afternoon": [`Good afternoon, ${name}!`, `Have a good rest of your day, ${name}!`, `Good afternoon ${name}, when's dinner?`, `Quite hungry, ${name}, what about you?`],
        "evening": [`Evenin', ${name}. How's your night been?`, `${name}, dinner time!`, `${name}, good evening!`],
        "night": [`Good night, ${name}. Sleep well!`, `Good night ${name}.`, `Don't let the bed bugs bite, ${name}.`]
    }

    if (hoursOfDay.morning.includes(new Date().getHours())) {
        document.getElementById("greeting").innerText = greetings.morning[Math.floor(Math.random() * greetings.morning.length)];
    } if (hoursOfDay.noon.includes(new Date().getHours())) {
        document.getElementById("greeting").innerText = greetings.noon[Math.floor(Math.random() * greetings.noon.length)];
    } if (hoursOfDay.afternoon.includes(new Date().getHours())) {
        document.getElementById("greeting").innerText = greetings.afternoon[Math.floor(Math.random() * greetings.afternoon.length)];
    } if (hoursOfDay.evening.includes(new Date().getHours())) {
        document.getElementById("greeting").innerText = greetings.evening[Math.floor(Math.random() * greetings.evening.length)];
    } if (hoursOfDay.night.includes(new Date().getHours())) {
        document.getElementById("greeting").innerText = greetings.night[Math.floor(Math.random() * greetings.night.length)];
    }

    if (birthday[0] == day && birthday[1] == month.toLowerCase()) {
        document.getElementById("greeting").innerHTML = `Happy birthday ${name}! &#127881;`
    }
};

function getDDMMYY() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate());
    const year = dateObj.getFullYear();
    const dayforweek = days[dateObj.getDay()];
    output = `${dayforweek}, ${day} ${month} ${year}`;
    document.getElementById("daynamemid").innerHTML = output;
}

function findHolidays() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const snowMonths = ["December", "January", "February"];
    const snowDays = ["17", "18", "19", "20", "21", "22", "23", "24", "25"];
    const dateObj = new Date();
    const birthday = configuration.decor.birthday.toLowerCase().split(" ")
    const month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate());
    const year = dateObj.getFullYear();
    const dayforweek = days[dateObj.getDay()];
    if (snowMonths.includes(month)) {
        if (month == "December" && snowDays.includes(day)) {
            document.getElementById("greeting").innerHTML = `Happy holidays, ${name}! &#10052;`
        }
    } if (month == "January" && day == "1") {
        document.getElementById("greeting").innerHTML = `Happy new year, ${name}! &#127881;`
    } if (configuration.decor.crazyholidays == true) {
        console.log("Holidays v1.0.0 || Matched configuration criteria!")
        crazyArray.forEach(mainElement => {
            if (mainElement.month.includes(month) && mainElement.day.includes(day)) {
                console.log("Holidays v1.0.0 || Matched a holiday!")
                crazyArray.forEach(arrayElement => {
                    if (month !== arrayElement.month && day !== arrayElement.day) return;
                    if (month == arrayElement.month && day == arrayElement.day) {
                        document.getElementById("greeting").innerHTML = arrayElement.message;
                    };
                });
            };
        });
    };
}

function getBirthday() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const birthday = configuration.decor.birthday.toLowerCase().split(" ")
    let day = String(dateObj.getDate());
    if (birthday[0] == day && birthday[1] == month.toLowerCase()) {
        confetti.start(1000)
    }
};

async function track() {
    const conf = configuration;
    if (conf.media.lastfm.enabled !== true || !conf.media.lastfm.key || !conf.media.lastfm.username) {
        return document.getElementById("spotify").style.display = "none";
    };
    const track = await window.bridge.media.getNewestTrack();
    const title = track.name.slice(0, 23);
    const artist = track.artist["#text"].slice(0, 33);
    const albumArt = track.image[3]["#text"].replace("300x300", "2048x2048");
    const colours = await Vibrant.from(albumArt).getPalette();
    document.getElementById("spotifycolour").style.background = `linear-gradient(45.34deg, ${colours.DarkVibrant.hex} 3.5%, ${colours.LightVibrant.hex} 96.5%)`;
    document.getElementById("lasttitle").innerText = title;
    document.getElementById("lastartist").innerText = artist;
    document.getElementById("albumart").src = albumArt;
    console.log(colours)
    console.log(await window.bridge.media.getNewestTrack());
    if (track["@attr"] == undefined) {
        return document.getElementById("spotify").style.display = "none";
    } if (track["@attr"] !== undefined) {
        return document.getElementById("spotify").style.display = "block";
    };
};

async function weather() {
    let units = {};
    if (!configuration.openweather.key || !configuration.openweather.placeid) {
        document.getElementById("weather").style.display = "none";
    } if (configuration.openweather.key && configuration.openweather.placeid) {
        document.getElementById("weather").style.display = "block";
    };
    
    if (configuration.openweather.units == 0 || configuration.openweather.units == undefined) {
        units.fc = "C"
        units.unit = "metric"
    }
    if (configuration.openweather.units == 1) { 
        units.fc = "F"
        units.unit = "imperial"
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${configuration.openweather.placeid}&appid=${configuration.openweather.key}&units=${units.unit}`)  
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        const icon = document.getElementsByClassName("weather-icon")[0]
        document.getElementById("place").innerText = `${data.name}, ${data.sys.country}`
        var temperature = Math.round(parseFloat(data.main.temp));
        var conditions = data.weather[0].description
        document.getElementById('temp').innerHTML = temperature + `&deg;${units.fc}`;
        document.getElementById('weatherdesc').innerHTML = capitalizeFirstLetter(conditions);



        if (hoursOfDay.morning.includes(new Date().getHours())) {
            if (conditions == "clear sky") icon.src = "./assets/sunrise.png"
            if (conditions.includes("clouds")) icon.src = "./assets/suncloud.png"
            if (conditions.includes("rain")) icon.src = "./assets/rain.png"
            if (conditions == "snow") icon.src = "./assets/snow.png"
            if (conditions == "thunderstorm") icon.src = "./assets/storm.png"
            if (conditions == "mist") icon.src = "./assets/mist.png"
        } if (hoursOfDay.noon.includes(new Date().getHours())) {
            if (conditions == "clear sky") icon.src = "./assets/sun.png"
            if (conditions.includes("clouds")) icon.src = "./assets/suncloud.png"
            if (conditions.includes("rain")) icon.src = "./assets/rain.png"
            if (conditions == "snow") icon.src = "./assets/snow.png"
            if (conditions == "thunderstorm") icon.src = "./assets/storm.png"
            if (conditions == "mist") icon.src = "./assets/mist.png"
        } if (hoursOfDay.afternoon.includes(new Date().getHours())) {
            if (conditions == "clear sky") icon.src = "./assets/sun.png"
            if (conditions.includes("clouds")) icon.src = "./assets/suncloud.png"
            if (conditions.includes("rain")) icon.src = "./assets/rain.png"
            if (conditions == "snow") icon.src = "./assets/snow.png"
            if (conditions == "thunderstorm") icon.src = "./assets/storm.png"
            if (conditions == "mist") icon.src = "./assets/mist.png"
        } if (hoursOfDay.evening.includes(new Date().getHours())) {
            if (conditions == "clear sky") icon.src = "./assets/sunset.png"
            if (conditions.includes("clouds")) icon.src = "./assets/suncloud.png"
            if (conditions.includes("rain")) icon.src = "./assets/rain.png"
            if (conditions == "snow") icon.src = "./assets/snow.png"
            if (conditions == "thunderstorm") icon.src = "./assets/storm.png"
            if (conditions == "mist") icon.src = "./assets/mist.png"
        } if (hoursOfDay.night.includes(new Date().getHours())) {
            if (conditions == "clear sky") icon.src = "./assets/moon.png"
            if (conditions.includes("clouds")) icon.src = "./assets/mooncloud.png"
            if (conditions.includes("rain")) icon.src = "./assets/rain.png"
            if (conditions == "snow") icon.src = "./assets/snow.png"
            if (conditions == "thunderstorm") icon.src = "./assets/storm.png"
            if (conditions == "mist") icon.src = "./assets/mist.png"
        }
    })
    .catch(e => console.log(e));
}

window.onload = function() {
    weather();   
    getTime();
    getDDMMYY();
    getGreeting();
    getBirthday();
    track();
    document.querySelector("body").style.cursor = "auto";
    findHolidays();
}

setInterval(getTime, 1000);
setInterval(getGreeting, 600000);
setInterval(getDDMMYY, 10000);
setInterval(findHolidays, 1000);
setInterval(weather, 120000);
setInterval(getBirthday, 120000);
setInterval(track, 10000)
document.body.style.background = `url(${configuration.decor.background}) no-repeat center center`;

(async function() {
    var mouseTimer = null, cursorVisible = true;

    function disappearCursor() {
        mouseTimer = null;
        document.body.style.cursor = "none";
        cursorVisible = false;
    }

    document.onmousemove = function() {
        if (mouseTimer) {
            window.clearTimeout(mouseTimer);
        }
        if (!cursorVisible) {
            document.body.style.cursor = "default";
            cursorVisible = true;
        }
        mouseTimer = window.setTimeout(disappearCursor, 5000);
    };

    setTimeout(function() {
        mouseTimer = window.setTimeout(disappearCursor, 5000);
    }, 5000)
})();

window.sendNotification = async function (data) {
    document.getElementById("notif-title").innerText = data.title;
    document.getElementById("notif-description").innerText = data.description;
    fadeInNotif();
    setTimeout(async function () {
        fadeOutNotif();
    }, 8000);
};