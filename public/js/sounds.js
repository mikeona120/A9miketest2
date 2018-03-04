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
    Fart.src = "../sounds/Fart.mp3";
    No.src = "../sounds/No.mp3";
    EvilLaugh.src = "../sounds/EvilLaugh.mp3";
    InceptionButton.src = "../sounds/InceptionButton.mp3";
    FinishHim.src = "../sounds/FinishHim.mp3";
    Dolphin.src = "../sounds/Dolphin.mp3";
    SadTrombone.src = "../sounds/SadTrombone.mp3";
    ItTimeToStop.src = "../sounds/ItTimeToStop.mp3";
    Hallelujah.src = "../sounds/Hallelujah.mp3";
    Haha.src = "../sounds/Haha.mp3";
    Yes.src = "../sounds/Yes.mp3";
    IBelieveICanFly.src = "../sounds/IBelieveICanFly.mp3";
    Crickets.src = "../sounds/Crickets.mp3";
    YouShallNotPass.src = "../sounds/YouShallNotPass.mp3";
    

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
	  // Set the volume for alerts
	  var alertVol = sessionStorage.getItem("alertVolume");
	  if(alertVol == null){
		alertVol = 1.0;
	  }
      //play the song is clicked
      if (num == 1) {
        console.log("hi");
        fallingRain.loop = true;
        fallingRain.play();
      }
      else if (num == 2) {
        console.log("hi2");
        forestMorning.loop = true;
        forestMorning.play();
      }
      else if (num == 3){
        console.log("hi3");
        burningLogs.loop = true;
        burningLogs.play();
      }
      else if(num == 4){
        console.log("hi4");
        whiteNoise.loop = true;
        whiteNoise.play();
      }
      else if(num == 5){
        console.log("hi4");
        CatMeowing.loop = true;
        CatMeowing.play();
      }
      else if(num == 6){
        console.log("hi4");
        BeautifulChillMix.loop = true;
        BeautifulChillMix.play();
      }
      else if(num == 7){
        console.log("hi4");
        Ambulance.loop = true;
        Ambulance.play();
      }
      else if(num == 8){
        console.log("hi4");
        FrogCroak.loop = true;
        FrogCroak.play();
      }
      else if(num == 9){
        console.log("hi4");
        OceanWave.loop = true;
        OceanWave.play();
      }
      else if(num == 10){
        console.log("hi4");
        AirPlane.loop = true;
        AirPlane.play();
      }
      else if(num == 11){
        console.log("hi4");
        Bee.loop = true;
        Bee.play();
      }
      else if(num == 12){
        console.log("hi4");
        PublicSwimmingPool.loop = true;
        PublicSwimmingPool.play();
      }
      else if(num == 13){
        console.log("hi4");
        Fan.loop = true;
        Fan.play();
      }
      else if(num == 14){
        console.log("hi4");
        LaughingAndGigglingKids.loop = true;
        LaughingAndGigglingKids.play();
      }
      else if(num == 15){
        console.log("hi4");
        PunchesAndSlaps.loop = true;
        PunchesAndSlaps.play();
      }
      else if(num == 16){
        console.log("hi4");
        ScaryFootsteps.loop = true;
        ScaryFootsteps.play();
      }
      else if(num == 17){
        console.log("hi4");
        DogBarking.loop = true;
        DogBarking.play();
      }
      else if(num == 18){
        console.log("hi4");
        JungleBattleAmbience.loop = true;
        JungleBattleAmbience.play();
      }
      else if(num == 19){
        console.log("hi4");
		foghorn.volume = alertVol;
        foghorn.play();
      }
      else if(num == 20){
        console.log("hi4");
		beeping.volume = alertVol;
        beeping.play();
      }
      else if(num == 21){
        console.log("hi4");
		siren.volume = alertVol;
        siren.play();
      }
      else if(num == 22){
        console.log("hi4");
		bells.volume = alertVol;
        bells.play();
      }
      else if(num == 23){
        console.log("hi4");
		Fart.volume = alertVol;
        Fart.play();
      }
      else if(num == 24){
        console.log("hi4");
		No.volume = alertVol;
        No.play();
      }
      else if(num == 25){
        console.log("hi4");
		EvilLaugh.volume = alertVol;
        EvilLaugh.play();
      }
      else if(num == 26){
        console.log("hi4");
		InceptionButton.volume = alertVol;
        InceptionButton.play();
      }
      else if(num == 27){
        console.log("hi4");
		FinishHim.volume = alertVol;
        FinishHim.play();
      }
      else if(num == 28){
        console.log("hi4");
		Dolphin.volume = alertVol;
        Dolphin.play();
      }
      else if(num == 29){
        console.log("hi4");
		SadTrombone.volume = alertVol;
        SadTrombone.play();
      }
      else if(num == 30){
        console.log("hi4");
		ItTimeToStop.volume = alertVol;
        ItTimeToStop.play();
      }
      else if(num == 31){
        console.log("hi4");
		Hallelujah.volume = alertVol;
        Hallelujah.play();
      }
      else if(num == 32){
        console.log("hi4");
		Haha.volume = alertVol;
        Haha.play();
      }
      else if(num == 33){
        console.log("hi4");
		Yes.volume = alertVol;
        Yes.play();
      }
      else if(num == 34){
        console.log("hi4");
		IBelieveICanFly.volume = alertVol;
        IBelieveICanFly.play();
      }
      else if(num == 35){
        console.log("hi4");
		Crickets.volume = alertVol;
        Crickets.play();
      }
      else if(num == 36){
        console.log("hi4");
		YouShallNotPass.volume = alertVol;
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
