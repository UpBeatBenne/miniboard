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

/**
 * 
 * @param {HTMLDOMIdentifier} id A DOM element ID to fade in.
 * 
 */
async function fadeIn(id) {
    var fade = document.getElementById(id);
    var opacity = 0.01;
    var intervalID = setInterval(function() {
        if (opacity <= 0) return clearInterval(intervalID);
        if (opacity < 1) {
            opacity = opacity + 0.01
            fade.style.opacity = opacity;
        }
    }, 15);
}

/**
 * 
 * @param {HTMLDOMIdentifier} id A DOM element ID to fade out. 
 * 
 */
async function fadeOut(id) {
    var fade = document.getElementById(id);
    var opacity = 1;
    var intervalID = setInterval(function() {
        if (opacity <= 0) return clearInterval(intervalID);
        if (opacity !== 0) {
            opacity = opacity - 0.01
            fade.style.opacity = opacity;
        }
    }, 15);
}

/**
 * 
 * @param {Number} min The lowest integer that should be generated.
 * @param {Number} max The highest integer that should be generated. 
 * @returns {Number} The random integer.
 */
function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}  

/**
 * 
 * @param {HTMLDOMIdentifier} id The DOM ID for the element that should have its font changed
 * @param {*} font The name of the font
 * @returns The font name passed
 */
function loadFonts(id, font) {
    const element = document.getElementById(id);

    element.style.fontFamily = font;

    return font;
};

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
        "morning": [`Rise and shine!`, `Good morning ${name}!`, `How's your morning?`],
        "noon": [`Noontime!`, `Good mid-day, ${name}!`],
        "afternoon": [`Good afternoon, ${name}!`, `Nice day out, innit?`],
        "evening": [`How's your evening ${name}?`],
        "night": [`Good night, ${name}.`, `Good night!`]
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

/**
 * @param {VibrantPalette} colours The Vibrant.js colour palette to use
 * @param {Boolean} dark If the colour should be dark or light
 */
function randomStyle(colours, dark) {
    var odd = [1, 3, 5, 7, 9];
    var even = [2, 4, 6, 8, 10];
    if (typeof dark !== "boolean") return new TypeError("Type of dark expected was Boolean");
    const int = randomInteger(1, 10);
    if (dark) {
        if (even.includes(int)) return colours.DarkVibrant.hex;
        if (odd.includes(int)) return colours.DarkMuted.hex;
    } if (!dark) {
        if (even.includes(int)) return colours.LightVibrant.hex;
        if (odd.includes(int)) return colours.LightMuted.hex;
    };
};

async function track() {
    const conf = configuration;
    if (conf.media.lastfm.enabled !== true || !conf.media.lastfm.key || !conf.media.lastfm.username) {
        return document.getElementById("spotify").style.display = "none";
    };
    const track = await window.bridge.media.getNewestTrack();
    const spotifycolournext = document.getElementById("spotifycolournext");
    const spotifycolour = document.getElementById("spotifycolour");

    if (track["@attr"] == undefined) {
        if (document.getElementById("spotify").style.opacity <= 0) return;
        fadeOut("spotify");
        fadeOut("spotifycolour");
        return fadeOut("spotifycolournext");
    };

    
    var title = track.name.slice(0, 28);
    var artist = track.artist["#text"].slice(0, 33);
    if (track.name.length >= 29) title = title + "...";
    if (track.artist["#text"].length >= 34) artist = artist + "...";
    const albumArt = track.image[3]["#text"].replace("300x300", "2048x2048");
    const colours = await Vibrant.from(albumArt).getPalette();
    const dark = randomStyle(colours, true)
    const light = randomStyle(colours, false)
    
    spotifycolournext.style.background = `linear-gradient(45.34deg, ${dark} 3.5%, ${light} 96.5%)`;
    if (spotifycolour.style.background == "") spotifycolour.style.background = `linear-gradient(45.34deg, ${dark} 3.5%, ${light} 96.5%)`;
    if (spotifycolour.style.opacity >= 1) {
        if (spotifycolournext.style.background == spotifycolour.style.background) return;
        fadeOut("spotifycolour");
        fadeIn("spotifycolournext");
        spotifycolour.style.background = `linear-gradient(45.34deg, ${dark} 3.5%, ${light} 96.5%)`;
        setTimeout(function () {
            spotifycolournext.style.opacity = 0;
            spotifycolour.style.opacity = 1;
        }, 3000);
    };


    document.getElementById("lasttitle").innerText = title;
    document.getElementById("lastartist").innerText = artist;
    document.getElementById("albumart").src = albumArt;

    if (track["@attr"] !== undefined) {
        if (document.getElementById("spotify").style.opacity == 1) return;
        document.getElementById("spotify").style.display = "block";
        fadeIn("spotify");
        fadeIn("spotifycolour");
    };
};

async function weather() {
    fetch(`https://api.veth1.cc/utils/weather`)  
    .then(function(resp) { return resp.json() })
    .then(function(data) {
        const icon = document.getElementsByClassName("weather-icon")[0]

        switch (configuration.openweather.locationHidden) {
            case true:
                document.getElementById("place").innerText = `Location hidden`;
                break;

            case false:
                document.getElementById("place").innerText = `${data.name}, ${data.sys.country}`;
                break;
            default:
                document.getElementById("place").innerText = `${data.name}, ${data.sys.country}`;
                break;
        }

        if (configuration.openweather.locationOverride.enabled) document.getElementById("place").innerText = configuration.openweather.locationOverride.location;

        var temperature = Math.round(parseFloat(data.main.temp));
        var conditions = data.weather[0].description;
        document.getElementById('temp').innerHTML = temperature + `&deg;C`;
        document.getElementById('weatherdesc').innerHTML = conditions.split("")[0].toUpperCase() + conditions.slice(1);



        if (hoursOfDay.morning.includes(new Date().getHours())) {
            if (conditions == "clear sky") icon.src = "./assets/sunrise.png";
            if (conditions.includes("clouds")) icon.src = "./assets/suncloud.png";
            if (conditions.includes("rain")) icon.src = "./assets/rain.png";
            if (conditions == "snow") icon.src = "./assets/snow.png";
            if (conditions == "thunderstorm") icon.src = "./assets/storm.png";
            if (conditions == "mist") icon.src = "./assets/mist.png";
        } if (hoursOfDay.noon.includes(new Date().getHours())) {
            if (conditions == "clear sky") icon.src = "./assets/sun.png";
            if (conditions.includes("clouds")) icon.src = "./assets/suncloud.png";
            if (conditions.includes("rain")) icon.src = "./assets/rain.png";
            if (conditions == "snow") icon.src = "./assets/snow.png";
            if (conditions == "thunderstorm") icon.src = "./assets/storm.png";
            if (conditions == "mist") icon.src = "./assets/mist.png";
        } if (hoursOfDay.afternoon.includes(new Date().getHours())) {
            if (conditions == "clear sky") icon.src = "./assets/sun.png";
            if (conditions.includes("clouds")) icon.src = "./assets/suncloud.png";
            if (conditions.includes("rain")) icon.src = "./assets/rain.png";
            if (conditions == "snow") icon.src = "./assets/snow.png";
            if (conditions == "thunderstorm") icon.src = "./assets/storm.png";
            if (conditions == "mist") icon.src = "./assets/mist.png";
        } if (hoursOfDay.evening.includes(new Date().getHours())) {
            if (conditions == "clear sky") icon.src = "./assets/sunset.png";
            if (conditions.includes("clouds")) icon.src = "./assets/suncloud.png";
            if (conditions.includes("rain")) icon.src = "./assets/rain.png";
            if (conditions == "snow") icon.src = "./assets/snow.png";
            if (conditions == "thunderstorm") icon.src = "./assets/storm.png";
            if (conditions == "mist") icon.src = "./assets/mist.png";
        } if (hoursOfDay.night.includes(new Date().getHours())) {
            if (conditions == "clear sky") icon.src = "./assets/moon.png";
            if (conditions.includes("clouds")) icon.src = "./assets/mooncloud.png";
            if (conditions.includes("rain")) icon.src = "./assets/rain.png";
            if (conditions == "snow") icon.src = "./assets/snow.png";
            if (conditions == "thunderstorm") icon.src = "./assets/storm.png";
            if (conditions == "mist") icon.src = "./assets/mist.png";
        };
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
    findHolidays();
    setFonts();

    document.querySelector("body").style.cursor = "auto";
    if (configuration.media.youtube.enabled) document.getElementById("youtube").style.visibility = "visible";
    if (configuration.media.netflix) document.getElementById("netflix").style.visibility = "visible";
}

setInterval(getTime, 1000);
setInterval(getGreeting, 600000);
setInterval(getDDMMYY, 10000);
setInterval(findHolidays, 1000);
setInterval(weather, 120000);
setInterval(getBirthday, 120000);
setInterval(track, 7500);

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
    }, 5000);
})();


/**
 * @param {Notification} data The notification data that is to be printed to the window.
 */
window.sendNotification = async function (data) {
    document.getElementById("notif-title").innerText = data.title;
    document.getElementById("notif-description").innerText = data.description;
    if (data.description.length >= 42) document.getElementById("notif-description").innerText = data.description.substr(0, 41) + "..";
    if (data.title.length >= 32) document.getElementById("notif-title").innerText = data.title.substr(0, 31) + "..";
    fadeInNotif();
    setTimeout(async function () {
        fadeOutNotif();
    }, 8000);
};

function setFonts() {
    const fontConf = window.bridge.information.getConfig().decor.fonts;
    if (fontConf.time.enabled) loadFonts("timeJS", fontConf.time.font);
    if (fontConf.greeting.enabled) loadFonts("greeting", fontConf.greeting.font);
    if (fontConf.date.enabled) loadFonts("daynamemid", fontConf.date.font);
    if (fontConf.temperature.enabled) loadFonts("temp", fontConf.temperature.font);
    if (fontConf.UIElement.enabled) {
        loadFonts("place", fontConf.UIElement.font);
        loadFonts("weatherdesc", fontConf.UIElement.font);
        loadFonts("notif-title", fontConf.UIElement.font);
        loadFonts("notif-description", fontConf.UIElement.font);
        loadFonts("lasttitle", fontConf.UIElement.font);
        loadFonts("lastartist", fontConf.UIElement.font);
    };
};
