/*
	DETAILS TO SETTLE
        -> make switch to change time between different levels
        -> check the position of the time in the canvas
*/

"use strict";

class Time extends Phaser.Time.TimerEvent{    //not sure this is the phaser class that is extended?
    
    constructor(level){
	    
        /*couldn't find the constructor for this phaser extension... once i do i'll replace it here*/
	    
        this.level = level;
        this.count = 0;

	let txt = {
            font: "18pt Comic Sans",
            color: "black"
        };	    
	    
        if (level == 0){    //if level == 0 then the timer to view the tasks is the one initialized

            this.initialTime = 30;  //30 seconds to see tasks
            this.add.text(32, 32, "Time left: " + this.initialTime + " seconds", txt); //example beginning at 8am
            let timer = this.time.addEvent({
                delay: 1,    //every 1 ms calls the func tasksTimer()
                callback: tasksTimer,
                callbackScope: this,
                loop:true
            });

        } else {

            if (level == 1){    //depending on the level the timer will beggin in a different time
                this.initialTime = 300; //five minutes in seconds
            }
            /*
                other levels
            */
            
            this.add.text(32, 32, "Time: 8:00h", txt); //example beginning at 8am
            let timer = this.time.addEvent({
                delay: 1,    //every 1 ms calls the func onEvent()
                callback: onEvent,
                callbackScope: this,
                loop:true
            });

        }
    }

    /*
        EXAMPLE: first level will be 5 minutes long and will simulate 12 hours of the day -> 25seg/hour
    */
    formatTime(){
        this.count++;
        if (this.level == 1){
            var h = Math.floor(count/25000); 
            var minutes = Math.floor(count%25000);
        }
        /*
            other levels
        */
        return (h+8) + ":" + minutes;	//example of day starting at 8 am
    }

    onEvent(){
        this.initialTime-=0.001; // since it's called every ms it decreases ons ms to the initialTime
        if (this.initialTime >= 0){
            text.setText("Time: " + formatTime());
        }
	else return this.endLevel();
        
    }

    endLevel(){
        //when the time runs out end game
    }
	
    tasksTimer(){
    	this.initialTime -= 0.001;
	if (this.initialTime%1 == 0){
		this.text.setText("Time left: " + this.initialTime + " seconds");
	} else if (this.initialTime == 0){
		/*avançar para o jogo*/
	}
    }
}
