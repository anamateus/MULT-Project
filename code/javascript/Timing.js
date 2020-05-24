"use strict";

export class Timing extends Phaser.Time.TimerEvent{    
    
    constructor(configs, level, scene, passing) {
        super(configs);
        this.level = level;
        this.scene = scene;
        this.count = 0;
	this.countdown = passing;   //when we change screens preserves the time left
	this.create();
    }
	
    create(){
        this.textConfigs = {
            font: "16pt",
            fontFamily: "Comic Sans",
            color: "black"
        };	    
	    
        if (this.level === 0){    //if level == 0 then the timer to view the tasks is the one initialized
            this.countdown = 45; //45 seconds to view the tasks list
	    console.log("Starting timer....");
            this.txt = this.scene.add.text(50,20,"Time Left: ", this.textConfigs);
            this.timer = this.scene.time.addEvent({
                delay: 1000,
                callback: this.updateTasks,
                callbackScope: this,
                repeat: this.countdown
            })
        } else {
            if (this.level === 1 && this.countdown === 0){
                this.countdown = 5*60; //5 minutes 

            } else if (this.level === 2 && this.countdown === 0){ 
                    this.countdown = 5*60; //5 minutes
        
            } else if (this.level === 3 && this.countdown === 0){
                this.countdown = 4.5*60; //4.5 minutes

            } else if (this.level === 4 && this.countdown === 0){
                this.countdown = 4.5*60; //4.5 minutes

            } else if (this.level === 5 && this.countdown === 0){
                this.countdown = 4*60; //4 minutes

            } else if (this.level === 6 && this.countdown === 0){
                this.countdown = 4*60; //4 minutes

            } else if (this.level === 7 && this.countdown === 0){
                this.countdown = 3.5*60; //3.5 minutes
            }

            this.txt = this.scene.add.text(50,20,"Time: ", this.textConfigs);
            this.timer = this.scene.time.addEvent({
                delay: 416, //to simulate 25seg/h then every minute will be 416 ms
                callback: this.updateLevel,
                callbackScope: this,
                repeat: this.countdown
            });
        }
	
	console.log("Starting timer....");
    }

    updateTasks(){
        if (this.count <= this.countdown){
            this.txt.setText("Time Left: " + (this.countdown-this.count) +  " seconds");
            this.count++;
        } else {
            this.endLevel();
        }
    }
	
    updateLevel(){
        if (this.count <= this.countdown){
            this.txt.setText("Time: " + this.formatTime());
            this.count++;
        } else {
            this.endLevel();
        }
    }

    endLevel(){
        console.log("Time's up!");
        if (this.level === 0){
            //go to next level
        } else {
            //end level
        }
    }
	
    formatTime(){    //25seg == 1 hour
        var h = Math.floor(this.count/25000); 
        var minutes = Math.floor(this.count%25000);
        return (h+8) + ":" + minutes;	//day starting at 8 am
    }
	
    checkOpeningHours(opens, closes){
    var aux = this.count;
    	if (Math.floor(aux/25000) <= opens || Math.floor(aux/25000) >= closes){
            return false;    //the store is closed
        }
        else return true;
    }

    endTimer(){
        this.count = this.countdown + 1;
        console.log("Terminated");
    }

}
