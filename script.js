// Grant's start/end date
// var retireeName = "Grant Bridges"
// var workStartDate = new Date('2016-05-23T08:00:00');
// var workEndDate = new Date('2057-12-21T05:00:00');
var retireeName = "Tommy Bridges"
var workStartDate = new Date('1981-06-01T08:00:00');
var workEndDate = new Date('2034-12-20T17:00:00');
//var workEndDate = new Date(new Date().getTime() + /*24 * 60 * 60 * 1000*/ + (10 * 1000));

refreshUI();

// set refresh timer
const progressUpdateTimerId = setInterval(onProgressUpdateTimer, 100/*ms*/);

// ----------

function onProgressUpdateTimer() {
    refreshUI();
    
    let now = new Date();
    let hasRetired = (workEndDate - now) <= 0;

    if (hasRetired) {
        clearInterval(progressUpdateTimerId);
    }
}

// refresh functions
function refreshUI() {
    refreshDateDisplay();
    refreshProgressBar();
}

function refreshDateDisplay() {
    let retireeNameText = document.getElementById("retiree-name");
    let timeLeft = document.getElementById("readout-time-left");
    let bottomText = document.getElementById("readout-bottom");

    retireeNameText.innerHTML = retireeName;

    let now = new Date();

    // get total number of milliseconds remaining
    let totalMilliseconds = workEndDate - now;

    if (totalMilliseconds <= 0) {
        // retired handling
        totalMilliseconds = 0;

        timeLeft.innerHTML = "Retired"
        timeLeft.style.color = "#ffffff";
        timeLeft.style.textShadow = "";
        bottomText.style.display = "none";
    } else {
        // not yet retired handling

        // convert that to days
        let days = totalMilliseconds / 1000 / 60 / 60 / 24;

        // use the decimal portion of days remaining to get how many hours are left
        let daysDecimal = getDecimal(days);
        let hours = daysDecimal * 24;

        // and so on for minutes and seconds...
        let hoursDecimal = getDecimal(hours);
        let minutes = hoursDecimal * 60;
        let minutesDecimal = getDecimal(minutes);
        let seconds = minutesDecimal * 60;

        // round all those values down to whole numbers for display purposes
        days = Math.floor(days);
        hours = Math.floor(hours);
        minutes = Math.floor(minutes);

        let finalDay = days == 0;

        let finalMinute = days == 0 && hours == 0 && minutes == 0;
        if (finalMinute) {
            // show decimal place for final minute countdown
            seconds = seconds.toFixed(1);
        }
        else {
            seconds = Math.floor(seconds);
        }

        let countDownText = "";
        timeLeft.innerHTML = "";

        let hideDays = days == 0;
        let hideHours = hideDays && hours == 0;
        let hideMinutes = hideHours && minutes == 0;

        if (!hideDays) {
            countDownText += days + (days == 1 ? " day" : " days") + ", "; 
        }
        if (!hideHours) {
            countDownText += hours + (hours == 1 ? " hour" : " hours") + ", "; 
        }
        if (!hideMinutes) {
            countDownText += minutes + (minutes == 1 ? " minute" : " minutes") + " and "; 
        }
        countDownText += seconds + (Math.floor(seconds) == 1 ? " second" : " seconds");

        timeLeft.innerHTML = countDownText;

        // change colors for dramatic effect
        
        if (finalMinute) {
            timeLeft.style.color = "#ed4b24";
            timeLeft.style.textShadow = "0px 0px 3px #e1b5b5"
        } else if (finalDay) {
            timeLeft.style.color = "#ff9b83";
        }
        
        bottomText.innerHTML = "until retirement";
    }
}

function refreshProgressBar() {
    let now = new Date()
    let percentComplete = (now - workStartDate) / (workEndDate - workStartDate) * 100;
    
    if (percentComplete >= 100) {
        percentComplete = 100;

        let golfGif = document.getElementById("golfing-gif");
        golfGif.style.display = "block";
    }
    else {
        percentComplete = percentComplete.toFixed(9);
    }

    // update progress bar position and percent text
    let progBar = document.getElementById("progress-bar");
    progBar.value = percentComplete;

    let progBarPercent = document.getElementById("progress-bar-percent");
    progBarPercent.innerHTML = percentComplete + "%";
}

// helper functions
function getDecimal(value){
    // returns the decimal portion of a given number
    return value - Math.floor(value);
}
