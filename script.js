const workStartDate = new Date('1981-06-01T08:00:00');
const workEndDate = new Date('2024-12-31T05:00:00');

refreshUI();

// set refresh timer
setInterval(refreshUI, 100/*ms*/);

// ----------

// refresh functions
function refreshUI() {
    refreshDateDisplay();
    refreshProgressBar();
}

function refreshDateDisplay() {
    let now = new Date();

    // get total number of milliseconds remaining
    let totalMilliseconds = workEndDate - now;

    if (totalMilliseconds < 0)
        totalMilliseconds = 0;

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
    seconds = Math.floor(seconds);

    let timeLeft = document.getElementById("readout-time-left");
    timeLeft.innerHTML = 
        days + " days, " + 
        hours + " hours, " + 
        minutes +" minutes and " + 
        seconds + " seconds";
}

function refreshProgressBar() {
    let now = new Date()
    let percentComplete = (now - workStartDate) / (workEndDate - workStartDate) * 100;
    
    if (percentComplete > 100)
        percentComplete = 100;
    
    percentComplete = percentComplete.toFixed(7);

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