/*
	DETAILS TO SETTLE
        -> make switch to change time between different levels
        -> relation between virtual and real time
*/

"use strict";


class Time extends Phaser.Time.TimerEvent{    //not sure this is the phaser class that is extended?
    
    constructor(){
        this.initialTime = 60; //one minute in seconds
        text = this.add.text(32, 32, "Time: " + formatTime(this.initialTime));
        timer = this.time.addEvent({
            delay: 1,    //every 1 ms calls the func onEvent()
            callback: onEvent,
            callbackScope: this,
            loop:true
        });
    }

    formatTime(seconds){
        var minutes = Math.floor(seconds/60);
        var realSeconds = (seconds%60).toString().padStart(2, '0'); //padStart helps formating the text
        return minutes + ":" + realSeconds;
    }

    onEvent(){
        this.initialTime--;
        if (this.initialTime >= 0){
            text.setText("Time: " + formatTime(this.initialTime));
        }
        
    }

    endLevel(){
        //when the time runs out end game
    }
}
