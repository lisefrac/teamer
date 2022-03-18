const teas = {
    "white": {
        "displayName": "white",
        "tempC" : 90,
        "tempF": 195,
        "timeFloor": 3,
        "timeCeiling": 5,
        "bgColor":"#b2e1d9",
        "textBorderColor": "#094161"
    },
    "green": {
        "displayName": "green",
        "tempC" : 85,
        "tempF": 185,
        "timeFloor": 2,
        "timeCeiling": 4,
        "bgColor":"#b3db78",
        "textBorderColor": "#fff"
    },
    "oolong": {
        "displayName": "oolong",
        "tempC" : 90,
        "tempF": 195,
        "timeFloor": 4,
        "timeCeiling": 5,
        "bgColor":"#278cc0",
        "textBorderColor": "#fff"
    },
    "black": {
        "displayName": "black",
        "tempC" : 95,
        "tempF": 200,
        "timeFloor": 3,
        "timeCeiling": 5,
        "bgColor":"#224A6D",
        "textBorderColor": "#fff"
    },
    "puerh": {
        "displayName": "pu'erh",
        "tempC" : 95,
        "tempF": 200,
        "timeFloor": 4,
        "timeCeiling": 5,
        "bgColor":"#9D667E",
        "textBorderColor": "#fff"
    },
    "mate": {
        "displayName": "mat&eacute;",
        "tempC" : 95,
        "tempF": 200,
        "timeFloor": 4,
        "timeCeiling": 5,
        "bgColor":"#D6166B",
        "textBorderColor": "#fff"
    },
    "rooibos": {
        "displayName": "rooibos",
        "tempC" : 95,
        "tempF": 200,
        "timeFloor": 4,
        "timeCeiling": 5,
        "bgColor":"#FD8F18",
        "textBorderColor": "#fff"
    },
    "herbal": {
        "displayName": "herbal",
        "tempC" : 95,
        "tempF": 200,
        "timeFloor": 5,
        "timeCeiling": 6,
        "bgColor":"#A0A956",
        "textBorderColor": "#094161"
    }
}
const second = document.querySelector('.second');
const minute = document.querySelector('.minute');
const teaBox = document.querySelector(".tea-buttons");
const playPause = document.querySelector(".play-pause");
const stop = document.querySelector(".stop");
const timeControlsBtns = document.querySelectorAll(".time-controls button");
let playing=false;
//console.log("setting initial value of playing to false");
let ticker;
const errorBox = document.querySelector(".error");
const alarm = document.querySelector(".alarm");
const changelog = document.querySelector(".changelog");
const changelogContents = document.querySelector(".changelog-contents");

function loadTeas() {
    Object.keys(teas).forEach(key => {
        // console.log(teas[key].displayName);
        const currentTea = teas[key];
        let btn = document.createElement("button");
        btn.type = "button";
        btn.value = key;
        btn.classList.add("tea-btn");
        btn.innerHTML = `
        <h3>${currentTea.displayName}</h3>
        <div class="steeping-instructions">
            <div class="temp">&#x1F321 ${currentTea.tempF}&deg;F (${currentTea.tempC}&deg;C)</div>
            <div class="time">&#x23F3 ${currentTea.timeFloor}-${currentTea.timeCeiling} min</div>
        </div>`;
        btn.style.backgroundColor = currentTea.bgColor;
        btn.style.color = currentTea.textBorderColor;
        btn.style.borderColor = currentTea.textBorderColor;
        btn.addEventListener("click", function() {
            setTimer(currentTea.timeCeiling, 0);
        });
        teaBox.appendChild(btn);
    });
    
}//loadTeas() declaration

function setTimer(min, sec) {
    minute.textContent = min.toString().padStart(2, '0');
    second.textContent = sec.toString().padStart(2, '0');
    playPause.value = (min * 60 * 1000) + (sec * 1000); //add time in ms to value of play/pause button
    
}
function playTimer() {
    const ms = parseInt(playPause.value);
    if (ms === 0) {
        error("you need to add time to the timer");
    }
    else {
        const startTime = Date.now();
        const deadline = startTime + ms;
        playing=true;
        //console.log("setting playing to true");
        //I'm setting the interval to not-quite-one-second to avoid jumps/gaps in the countdown
        //Should not affect deadline, only the interval at which the current time is calculated and displayed
        ticker = setInterval(tick, 990, deadline); 
    }
}
function tick(end) {
    let now = Date.now();
        if (end > now) {//time hasn't elapsed yet
            let diffMs = end - now;
            let diffMin = Math.floor(diffMs / 60000);
            let diffRemSec = Math.floor(diffMs % 60000 / 1000 );            
            setTimer(diffMin, diffRemSec);
                    
        }
        else {//time has elapsed
            stopTicker();
            setTimer(0,0);
            playAlarm();
        }
}
function stopTicker() {
    clearInterval(ticker);
    playing=false;
    //console.log("set playing to false");
}
function error(msg) {
    console.error(`Teamer error: ${msg}`);
    errorBox.textContent = msg;
    errorBox.style.opacity = "1";
}
function deError() {
    errorBox.textContent = "";
    errorBox.style.opacity = "0";
}
function playAlarm() {
    alarm.currentTime = 0;
    alarm.play();
}
function stopAlarm() {
    alarm.pause();
    alarm.currentTime = 0;
}

window.addEventListener("load", loadTeas);

playPause.addEventListener("click", function() {
    deError();
    stopAlarm();
    if (playing === true) {
        stopTicker();
    }
    else {
        playTimer();
    }
    
});
stop.addEventListener("click", function() {
    deError();
    stopAlarm();
    stopTicker();
    setTimer(0,0);
});
timeControlsBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        stopAlarm();
        let mins = parseInt(minute.textContent);
        let secs = parseInt(second.textContent);
        switch (parseInt(btn.value)) {
            case 60:
                deError();
                setTimer(mins+1, secs);
                break;
            case -60:
                if (mins === 0) {
                    setTimer(0, 0);
                }
                else setTimer(mins-1, secs);
                break;
            case 10:
                deError();
                if (secs > 49) {
                    setTimer(mins+1, (secs+10)-60);
                }
                else setTimer(mins, secs+10);
                break;
            case -10:
                if (secs < 10 && mins === 0) {
                    setTimer(0, 0);
                }
                else if (secs < 10) {
                    setTimer(mins-1, (secs-10)+60);
                }
                else setTimer(mins, secs-10);
                break;
        }
        if (playing === true) {
            stopTicker();
            playTimer(); //if timer is running, run playTimer() to update the deadline; otherwise it will update when the play/pause button is clicked again
        }
    });
    
});
changelog.addEventListener("click", function() {
    const plusMin = changelog.querySelector("span");
    if (!changelog.classList.contains("open")) {
        changelog.classList.add("open");
        plusMin.innerHTML = "&#45;"
    }
    else {
        changelog.classList.remove("open");
        plusMin.innerHTML = "&#43;"
    }
    
    
});
