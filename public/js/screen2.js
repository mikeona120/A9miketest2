$(document).ready(centerIcons);

function centerIcons() {
  $('.icons i').addClass('d-flex justify-content-center align-items-center');
  $('.icons p').addClass('d-flex justify-content-center align-items-center mt-1');
}

var tempDowntimePassed = 0;
var tempDowntimePassedSec = 0;
var alertPeriod = sessionStorage.getItem("alerttimeVal");
if(alertPeriod == null){
	alertPeriod = 3;
}

function startTimer() { // Jackie's countdown
var presentTime = document.getElementById('timer').innerHTML;
var timeArray = presentTime.split(/[:]+/);
var m = parseInt(timeArray[0]);
var s = parseInt(timeArray[1]);

// Reduce the downtime left by 1 second
if(s == 0 && m > 0) { 
  m = m - 1;
  s = 59;
} 
else if(s > 0){
  s -= 1;
}

// Count up on the downtime passed for this "off-task" session
if(tempDowntimePassedSec == 59){
	tempDowntimePassed++;
	tempDowntimePassedSec = 0;
}
else{
	tempDowntimePassedSec++;
}

// Play the alarm if the alert period has passed for this "off-task" session
if(tempDowntimePassed == alertPeriod && tempDowntimePassedSec == 0){
	tempDowntimePassed = 0;
	playSavedAlarm();
}
// Play the alarm if the downtime left hits 0
if (m == 0 && s == 0) {
  printTime(m, s, 'timer');
  playSavedAlarm();
  clearTimeout(timerCountdown);
} 
// Update the timer otherwise
else {
  printTime(m, s, 'timer'); 
  timerCountdown = setTimeout(startTimer, 1000);
}
sessionStorage.setItem("downtimeVal", m);
sessionStorage.setItem("downtimeValSecs", s);
}

var pTime = document.getElementById('productiveTime');
if(pTime != null){
	startPTimer();
}

//resets productive time to 0
// Used when user starts or ends a work session
function resetPTimer() {
  sessionStorage.setItem("pTimeVal", 0);
  sessionStorage.setItem("pTimeValSecs", 0);
}

// should we track total productivity? total downtime?
function startPTimer() {
  var presentTime = document.getElementById('productiveTime').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = parseInt(timeArray[0]); // change string minute to integer
  var s = parseInt(timeArray[1]) + 1;
  //hit 59 m =+1
  if(s == 60) { 
    m += 1;
    s = 0;
  }
  
  // Saves the productive time
  // TODO: fix so value is gotten from storage before the first time it is saved 
  if(s > 1){
   sessionStorage.setItem("pTimeVal", m);
   sessionStorage.setItem("pTimeValSecs", s);
 }
 printTime(m, s, 'productiveTime'); 
 pTimerCountdown = setTimeout(startPTimer, 1000);
}

// countdown timer
var timer = document.getElementById('timer');

// links downtime slider to downtime timer
function updateTimeRange(val) {
  document.getElementById("downtime").innerHTML = val;
  sessionStorage.setItem("downtimeVal", val);
  sessionStorage.setItem("downtimeValSecs", "00");
}

// alert time slider
function updateAlertTime(val) {
  document.getElementById("alerttime").innerHTML = val;
  sessionStorage.setItem("alerttimeVal", val);
  sessionStorage.setItem("alerttimeValSecs", "00");
}

if(timer != null){
  timer.innerHTML = sessionStorage.getItem("downtimeVal") + ":" + sessionStorage.getItem("downtimeValSecs");
}
if(pTime != null){
  var storedPTimeVal = sessionStorage.getItem("pTimeVal");
  var storedPTimeValSecs = sessionStorage.getItem("pTimeValSecs");
  if(storedPTimeVal != null && storedPTimeValSecs != null){
   printTime(storedPTimeVal, storedPTimeValSecs, 'productiveTime');
 }
 else{
   pTime.innerHTML = "00:00"
 }
}

function printTime(m, s, element) {
  document.getElementById(element).innerHTML = checkTimeDigit(m) + ":" + checkTimeDigit(s);
}		

function checkTimeDigit(time) {
  if (time < 10 && time >= 0) {time = "0" + time}; // add zero in front of numbers < 10
  if (time < 0) {time = "59"};
  return time;
}

    //------- CHECK ACTIVE/INACTIVE -------//

    var isActive;
    sessionStorage.setItem("overallDowntimeHour", 0);
    sessionStorage.setItem("overallDowntimeMin", 0);
    sessionStorage.setItem("overallDowntimeSec", 0);
    // set isActive status
    window.onfocus = function () { 
      isActive = true;
      //soundscape resumes playing when user goes back to tab after alarm
      var soundscape = localStorage.getItem("soundscape"); 
      console.log (soundscape);
      soundEffect(soundscape); 

	  tempDowntimePassed = 0;
	  tempDowntimePassedSec = 0;
    }; 
    window.onblur = function () { 
      isActive = false; 
    }; 

  // check if user is off tab
  offPage = function () { 
    console.log(window.isActive ? 'active' : 'inactive'); 
    // implement start of timer when user is inactive
    if ( isActive == false ) {
      start = Date.now();
      clearTimeout(pTimerCountdown);
      startTimer();
      checkEnd = setInterval(onPage, 1000);
      clearInterval(checkPage);
    } 
  }

  // check if user has come back to tab
  onPage = function () { 
    if ( start > 0 && isActive) {
      end = Date.now();
      clearTimeout(timerCountdown);
      startPTimer();
    elapsed = (end - start) / 1000; // number of seconds away from tab
    elapsedMinutes = Math.floor(elapsed / 60);
    elapsedSeconds = Math.floor(elapsed % 60);
    // sessionStorage.setItem("overallDowntimeMin", parseInt(sessionStorage.getItem("overallDowntimeMin")) + elapsedMinutes);
    // sessionStorage.setItem("overallDowntimeSec", parseInt(sessionStorage.getItem("overallDowntimeSec")) + elapsedSeconds);
    // alert(sessionStorage.getItem("overallDowntimeSec"));
    // document.getElementById('totalBreakTime').innerHTML = sessionStorage.getItem("overallDowntimeSec");
    // alert("Welcome back! You spent " + elapsedMinutes + " minutes and " + elapsedSeconds + " seconds off-task!");

    // update timers
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = parseInt(timeArray[0]);
    var s = parseInt(timeArray[1]);
    /**m = m - elapsedMinutes;
    s = s - elapsedSeconds;
    if(s < 0) { 
      m -= 1;
      s += 60;
    }

    printTime(m, s, 'timer');**/
    sessionStorage.setItem("downtimeVal", m);
    sessionStorage.setItem("downtimeValSecs", s);
    
    // restart checking for inactive/active tab
    clearInterval(checkEnd);
    checkPage = setInterval(offPage, 1000); 
  }
}

  // start cycle of checking for inactivity
  if(timer != null){
   checkPage = setInterval(offPage, 1000); 
 }



    //---------------------------- HELP POP-UPS ----------------------------//
    function helpListen() {
      alert("In this screen, you can see how productive you are and how much time" +
        " you have left for your breaks. Change your current soundscape by swiping or" +
        " clicking the slider. You can customize alerts in Settings at the top right.");
    }


// enable tooltips later for index
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


//Scrolling for Soundscape
$(function(){
  var isDown = false, currentX = 0, currentY = 0;

  $('#scroll1').mousemove(function(event){
    if(isDown === true){
     //$('#scroll1').scrollTop($('#scroll1').scrollTop() + (currentY - event.pageY)); 
     $('#scroll1').scrollLeft($('#scroll1').scrollLeft() + (currentX - event.pageX));
     currentY = event.pageY;
     currentX = event.pageX;
   }
 });
  
  $('#scroll1').mousedown(function(event){
    isDown = true;
    currentY = event.pageY;
    currentX = event.pageX;
  });
  
  $('#scroll1').mouseup(function(){
    isDown = false;
  });
})

// show if sound buttons are selected, deselects non-active buttons
$('.scape').click( function() {
  $('.scape').removeClass( "active" );
  $( this ).addClass( "active" );
  if (($('.scape').hasClass('active')) && ($('.alarm').hasClass('active'))) {
    $('.float').removeClass('disabled');
  }
});


///////////////////////////////////Google Analytics NEW
$('#SettingsButtonNEW').click(function(){
  var timeSincePageLoad = Math.round(performance.now());
    console.log(timeSincePageLoad);
    console.log("test");
    gtag('event', 'click', {
      'event_category': 'Settings clicked screen2 NEW' 
});
  // Sends the timing event to Google Analytics.
  gtag('event', 'click', {
    'name': 'load',
    'value': timeSincePageLoad,
    'event_label': timeSincePageLoad,
    'event_category': 'Time to click Settings screen2 NEW'
  });
  });

$('#HelpButtonNEW').click(function(){
  var timeSincePageLoad = Math.round(performance.now());
    console.log(timeSincePageLoad);
    console.log("test");
    gtag('event', 'click', {
      'event_category': 'Help clicked screen2 NEW' 
});
  // Sends the timing event to Google Analytics.
  gtag('event', 'click', {
    'name': 'load',
    'value': timeSincePageLoad,
    'event_label': timeSincePageLoad,
    'event_category': 'Time to click Help screen2 NEW'
  });
  });

$('#ProfileButtonNEW').click(function(){
  var timeSincePageLoad = Math.round(performance.now());
    console.log(timeSincePageLoad);
    console.log("test");
    gtag('event', 'click', {
      'event_category': 'Profile clicked screen2 NEW' 
});
  // Sends the timing event to Google Analytics.
  gtag('event', 'click', {
    'name': 'load',
    'value': timeSincePageLoad,
    'event_label': timeSincePageLoad,
    'event_category': 'Time to click Profile screen2 NEW'
  });
  });

$('#LogoutButtonNEW').click(function(){
  var timeSincePageLoad = Math.round(performance.now());
    console.log(timeSincePageLoad);
    console.log("test");
    gtag('event', 'click', {
      'event_category': 'Logout clicked screen2 NEW' 
});
  // Sends the timing event to Google Analytics.
  gtag('event', 'click', {
    'name': 'load',
    'value': timeSincePageLoad,
    'event_label': timeSincePageLoad,
    'event_category': 'Time to click Logout screen2 NEW'
  });
  });

///////////////////////////////////Google Analytics OLD
$('#SettingsButtonOLD').click(function(){
  var timeSincePageLoad = Math.round(performance.now());
    console.log(timeSincePageLoad);
    console.log("test");
    gtag('event', 'click', {
      'event_category': 'Settings clicked screen2 OLD' 
});
  // Sends the timing event to Google Analytics.
  gtag('event', 'click', {
    'name': 'load',
    'value': timeSincePageLoad,
    'event_label': timeSincePageLoad,
    'event_category': 'Time to click Settings screen2 OLD'
  });
  });

$('#HelpButtonOLD').click(function(){
  var timeSincePageLoad = Math.round(performance.now());
    console.log(timeSincePageLoad);
    console.log("test");
    gtag('event', 'click', {
      'event_category': 'Help clicked screen2 OLD' 
});
  // Sends the timing event to Google Analytics.
  gtag('event', 'click', {
    'name': 'load',
    'value': timeSincePageLoad,
    'event_label': timeSincePageLoad,
    'event_category': 'Time to click Help screen2 OLD'
  });
  });

$('#ProfileButtonOLD').click(function(){
  var timeSincePageLoad = Math.round(performance.now());
    console.log(timeSincePageLoad);
    console.log("test");
    gtag('event', 'click', {
      'event_category': 'Profile clicked screen2 OLD' 
});
  // Sends the timing event to Google Analytics.
  gtag('event', 'click', {
    'name': 'load',
    'value': timeSincePageLoad,
    'event_label': timeSincePageLoad,
    'event_category': 'Time to click Profile screen2 OLD'
  });
  });

$('#LogoutButtonOLD').click(function(){
  var timeSincePageLoad = Math.round(performance.now());
    console.log(timeSincePageLoad);
    console.log("test");
    gtag('event', 'click', {
      'event_category': 'Logout clicked screen2 OLD' 
});
  // Sends the timing event to Google Analytics.
  gtag('event', 'click', {
    'name': 'load',
    'value': timeSincePageLoad,
    'event_label': timeSincePageLoad,
    'event_category': 'Time to click Logout screen2 OLD'
  });
  });