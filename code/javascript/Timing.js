"use strict";

export class Timing extends Phaser.Time.TimerEvent{    //not sure this is the phaser class that is extended?
    
    constructor(configs, level, scene) {
        super(configs);
        /*couldn't find the constructor for this phaser extension... once i do i'll replace it here*/

        this.level = level;
        this.scene = scene;
        this.count = 0;
	this.create();
    }
	
    create(){
        this.textConfigs = {
            font: "16pt",
            fontFamily: "Comic Sans",
            color: "black"
        };	    
        if (this.level === 0){    //if level == 0 then the timer to view the tasks is the one initialized
            this.countdown = 5;
	    console.log("Starting timer....");
            this.txt = this.scene.add.text(50,20,"Time Left: ", this.textConfigs);
            this.timer = this.scene.time.addEvent({
                delay: 1000,
                callback: this.update,
                callbackScope: this,
                repeat: this.countdown
            })
        } else {
            /*
                other levels
            */
        }
    }

    /*
        EXAMPLE: first level will be 5 minutes long and will simulate 12 hours of the day -> 25seg/hour
    *//*
    formatTime(){
        this.count++;
        if (this.level === 1){
            var h = Math.floor(count/25000); 
            var minutes = Math.floor(count%25000);
        }
        
        //    other levels
        
        return (h+8) + ":" + minutes;	//example of day starting at 8 am
    }*/

    endLevel(){
       console.log("Time's up!");
    }
	
    update(){
        if (this.count <= this.countdown){
            //console.log(this.timer.getElapsed())
            this.txt.setText("Time Left: " + (this.countdown-this.count) +  " seconds");
            this.count++;
            console.log("Its updating!!!");
        } else {
            this.endLevel();
        }
    }
	
	/*
    checkOpeningHours(opens, closes){
    	var aux = this.initialTime;
    	if (Math.floor(aux/25000) <= opens || Math.floor(aux/25000) >= closes){
            return false;    //the store is closed
        }
        else return true;
    }*/

}
