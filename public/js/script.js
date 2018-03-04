
function resetSlider() {
  var slider = document.getElementById('downtimeRange');
  if (slider != null) {
    sessionStorage.setItem("downtimeVal", 20);
    sessionStorage.setItem("downtimeValSecs", "00");
  }
}

function startTimer() { // Jackie's countdown
var presentTime = document.getElementById('timer').innerHTML;
var timeArray = presentTime.split(/[:]+/);
var m = parseInt(timeArray[0]);
var s = parseInt(timeArray[1]);

if(s == 0 && m > 0) { 
  m = m - 1;
  s = 59;
} 
else if(s > 0){
  s -= 1;
}

if (m == 0 && s == 0) {
  printTime(m, s, 'timer');
  playSavedAlarm();
  clearTimeout(timerCountdown);

} else {
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
    function helpStart() {
      alert("Every time you go off-task, SoundTrack will alert you at decreasing" +
        " intervals to help you stay productive and focused. To get started, simply" +
        " choose your favorite soundscape and customize the alert for your current task!");
    }

    function helpListen() {
      alert("In this screen, you can see how productive you are and how much time" +
        " you have left for your breaks. Change your current soundscape by swiping or" +
        " clicking the slider. You can customize alerts in Settings at the top right.");
    }

    function helpSettings() {
      alert("You can change your alert sound, how much break time you want to give " +
        "yourself, and the volume of the alerts. Be as productive " +
        "as you want!");
    }

    function helpProfile() {
      alert("Profile Help Here");
    }

// enable tooltips later for index
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

    //------- SOUNDS -----------//

    //first page sound javascript
    //soundscape
    var fallingRain = new Audio();
    var forestMorning = new Audio();
    var burningLogs = new Audio();
    var whiteNoise = new Audio();
    var CatMeowing = new Audio();
    var BeautifulChillMix = new Audio();
    var Ambulance = new Audio();
    var FrogCroak = new Audio();
    var OceanWave = new Audio();
    var AirPlane = new Audio();
    var Bee = new Audio();
    var PublicSwimmingPool = new Audio();
    var Fan = new Audio();
    var LaughingAndGigglingKids = new Audio();
    var PunchesAndSlaps = new Audio();
    var ScaryFootsteps = new Audio();
    var DogBarking = new Audio();
    var JungleBattleAmbience = new Audio();
    fallingRain.src = "../sounds/fallingRain.mp3";
    forestMorning.src = "../sounds/forestMorning.mp3";
    burningLogs.src = "../sounds/burningLogs.mp3";
    whiteNoise.src = "../sounds/whiteNoise.mp3" ;
    CatMeowing.src = "../sounds/CatMeowing.mp3" ;
    BeautifulChillMix.src = "../sounds/BeautifulChillMix.mp3" ;
    Ambulance.src = "../sounds/Ambulance.mp3" ;
    FrogCroak.src = "../sounds/FrogCroak.mp3" ;
    OceanWave.src = "../sounds/OceanWave.mp3" ;
    AirPlane.src = "../sounds/AirPlane.mp3" ;
    Bee.src = "../sounds/Bee.mp3" ;
    PublicSwimmingPool.src = "../sounds/PublicSwimmingPool.mp3" ;
    Fan.src = "../sounds/Fan.mp3" ;
    LaughingAndGigglingKids.src = "../sounds/LaughingAndGigglingKids.mp3" ;
    PunchesAndSlaps.src = "../sounds/PunchesAndSlaps.mp3" ;
    ScaryFootsteps.src = "../sounds/ScaryFootsteps.mp3" ;
    DogBarking.src = "../sounds/DogBarking.mp3" ;
    JungleBattleAmbience.src = "../sounds/JungleBattleAmbience.mp3" ;

    //alert sound
    var foghorn = new Audio();
    var beeping = new Audio();
    var siren = new Audio();
    var bells = new Audio();
    var Fart = new Audio();
    var No = new Audio();
    var EvilLaugh = new Audio();
    var InceptionButton = new Audio();
    var FinishHim = new Audio();
    var Dolphin = new Audio();
    var SadTrombone = new Audio();
    var ItTimeToStop = new Audio();
    var Hallelujah = new Audio();
    var Haha = new Audio();
    var Yes = new Audio();
    var IBelieveICanFly = new Audio();
    var Crickets = new Audio();
    var YouShallNotPass = new Audio();
    foghorn.src = "../sounds/foghorn.mp3";
    beeping.src = "../sounds/beeping.mp3";
    siren.src = "../sounds/siren.mp3";
    bells.src = "../sounds/bells.mp3";
    Fart.src = "../sounds/foghorn.mp3";
    No.src = "../sounds/foghorn.mp3";
    EvilLaugh.src = "../sounds/foghorn.mp3";
    InceptionButton.src = "../sounds/foghorn.mp3";
    FinishHim.src = "../sounds/foghorn.mp3";
    Dolphin.src = "../sounds/foghorn.mp3";
    SadTrombone.src = "../sounds/foghorn.mp3";
    ItTimeToStop.src = "../sounds/foghorn.mp3";
    Hallelujah.src = "../sounds/foghorn.mp3";
    Haha.src = "../sounds/foghorn.mp3";
    Yes.src = "../sounds/foghorn.mp3";
    IBelieveICanFly.src = "../sounds/foghorn.mp3";
    Crickets.src = "../sounds/foghorn.mp3";
    YouShallNotPass.src = "../sounds/foghorn.mp3";
    
    function playSavedSoundscape(){
      var soundscape = localStorage.getItem("soundscape");
      console.log (soundscape);
      soundEffect(soundscape);
    }
    function playSavedAlarm(){
      var alarmSound = localStorage.getItem("alarm");
      console.log (alarmSound);
      soundEffect(alarmSound);
    }
    function soundEffect(num)
    {
      // if audio is playing, pause it first
      if (!fallingRain.paused || !forestMorning.paused || !burningLogs.paused || !whiteNoise.paused || !CatMeowing.paused || !BeautifulChillMix.paused || !Ambulance.paused || !FrogCroak.paused || !OceanWave.paused || !AirPlane.paused || !Bee.paused || !PublicSwimmingPool.paused || !Fan.paused || !LaughingAndGigglingKids.paused || !PunchesAndSlaps.paused || !ScaryFootsteps.paused || !DogBarking.paused || !JungleBattleAmbience.paused || !foghorn.paused || !beeping.paused || !siren.paused || !bells.paused || !Fart.paused || !No.paused || !EvilLaugh.paused || !InceptionButton.paused || !FinishHim.paused || !Dolphin.paused || !SadTrombone.paused || !ItTimeToStop.paused || !Hallelujah.paused || !Haha.paused || !Yes.paused || !IBelieveICanFly.paused || !Crickets.paused || !YouShallNotPass.paused) {
        fallingRain.pause();
        forestMorning.pause();
        burningLogs.pause();
        whiteNoise.pause();
        CatMeowing.pause();
        BeautifulChillMix.pause();
        Ambulance.pause();
        FrogCroak.pause();
        OceanWave.pause();
        AirPlane.pause();
        Bee.pause();
        PublicSwimmingPool.pause();
        Fan.pause();
        LaughingAndGigglingKids.pause();
        PunchesAndSlaps.pause();
        ScaryFootsteps.pause();
        DogBarking.pause();
        JungleBattleAmbience.pause();
        foghorn.pause();
        beeping.pause();
        siren.pause();
        bells.pause();
        Fart.pause();
        No.pause();
        EvilLaugh.pause();
        InceptionButton.pause();
        FinishHim.pause();
        Dolphin.pause();
        SadTrombone.pause();
        ItTimeToStop.pause();
        Hallelujah.pause();
        Haha.pause();
        Yes.pause();
        IBelieveICanFly.pause();
        Crickets.pause();
        YouShallNotPass.pause();
        console.log ("paused");
      }
	  // Save the soundscape or alarm selection
	  if(num >= 1 && num <= 18){
      localStorage.setItem("soundscape", num);
    }
    else{
      localStorage.setItem("alarm", num);
    }
      //play the song is clicked
      if (num == 1) {
        console.log("hi");
        fallingRain.play();
      }
      else if (num == 2) {
        console.log("hi2");
        forestMorning.play();
      }
      else if (num == 3){
        console.log("hi3");
        burningLogs.play();
      }
      else if(num == 4){
        console.log("hi4");
        whiteNoise.play();
      }
      else if(num == 5){
        console.log("hi4");
        CatMeowing.play();
      }
      else if(num == 6){
        console.log("hi4");
        BeautifulChillMix.play();
      }
      else if(num == 7){
        console.log("hi4");
        Ambulance.play();
      }
      else if(num == 8){
        console.log("hi4");
        FrogCroak.play();
      }
      else if(num == 9){
        console.log("hi4");
        OceanWave.play();
      }
      else if(num == 10){
        console.log("hi4");
        AirPlane.play();
      }
      else if(num == 11){
        console.log("hi4");
        Bee.play();
      }
      else if(num == 12){
        console.log("hi4");
        PublicSwimmingPool.play();
      }
      else if(num == 13){
        console.log("hi4");
        Fan.play();
      }
      else if(num == 14){
        console.log("hi4");
        LaughingAndGigglingKids.play();
      }
      else if(num == 15){
        console.log("hi4");
        PunchesAndSlaps.play();
      }
      else if(num == 16){
        console.log("hi4");
        ScaryFootsteps.play();
      }
      else if(num == 17){
        console.log("hi4");
        DogBarking.play();
      }
      else if(num == 18){
        console.log("hi4");
        JungleBattleAmbience.play();
      }
      else if(num == 19){
        console.log("hi4");
        foghorn.play();
      }
      else if(num == 20){
        console.log("hi4");
        beeping.play();
      }
      else if(num == 21){
        console.log("hi4");
        siren.play();
      }
      else if(num == 22){
        console.log("hi4");
        bells.play();
      }
      else if(num == 23){
        console.log("hi4");
        Fart.play();
      }
      else if(num == 24){
        console.log("hi4");
        No.play();
      }
      else if(num == 25){
        console.log("hi4");
        EvilLaugh.play();
      }
      else if(num == 26){
        console.log("hi4");
        InceptionButton.play();
      }
      else if(num == 27){
        console.log("hi4");
        FinishHim.play();
      }
      else if(num == 28){
        console.log("hi4");
        Dolphin.play();
      }
      else if(num == 29){
        console.log("hi4");
        SadTrombone.play();
      }
      else if(num == 30){
        console.log("hi4");
        ItTimeToStop.play();
      }
      else if(num == 31){
        console.log("hi4");
        Hallelujah.play();
      }
      else if(num == 32){
        console.log("hi4");
        Haha.play();
      }
      else if(num == 33){
        console.log("hi4");
        Yes.play();
      }
      else if(num == 34){
        console.log("hi4");
        IBelieveICanFly.play();
      }
      else if(num == 35){
        console.log("hi4");
        Crickets.play();
      }
      else if(num == 36){
        console.log("hi4");
        YouShallNotPass.play();
      }


      
      //show which song is selected
      var div1 = document.getElementById("div1");
      if(div1 != null){
        div1.innerHTML = "You selected "+num;
      }
    }

function mute() { 
  var scape = document.getElementByClassName("scape");
    scape.volume = 0.0;
}

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

//Scrolling for Alert sound
$(function(){
  var isDown = false, currentX = 0, currentY = 0;
  $('#scroll2').mousemove(function(event){
    if(isDown === true){
     //$('#scroll2').scrollTop($('#scroll2').scrollTop() + (currentY - event.pageY)); 
     $('#scroll2').scrollLeft($('#scroll2').scrollLeft() + (currentX - event.pageX));
     currentY = event.pageY;
     currentX = event.pageX;
   }
 });
  
  $('#scroll2').mousedown(function(event){
    isDown = true;
    currentY = event.pageY;
    currentX = event.pageX;
  });
  
  $('#scroll2').mouseup(function(){
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

$('.alarm').click( function() {
  $('.alarm').removeClass( "active" );
  $( this ).addClass( "active" );
  if (($('.scape').hasClass('active')) && ($('.alarm').hasClass('active'))) {
    $('.float').removeClass('disabled');
  }
});

