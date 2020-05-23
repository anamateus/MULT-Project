"use strict";

var timer;
var text;

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

        text = {
            font: "16pt",
            fontFamily: "Comic Sans",
            color: "black"
        };	    
        if (this.level === 0){    //if level == 0 then the timer to view the tasks is the one initialized
            console.log("Starting timer....");
            this.scene.add.text(32, 32);
            timer = this.scene.time.delayedCall(2000, this.endLevel, [], this.scene);

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
    }

    onEvent(){
        this.initialTime-=0.001; // since it's called every ms it decreases ons ms to the initialTime
        if (this.initialTime >= 0){
            text.setText("Time: " + formatTime());
        }
	else return this.endLevel();
        
    }*/

    endLevel(){
       console.log("Time's up!");
    }
	
    update(){
        /*this.initialTime -= 0.001;
        if (this.initialTime%1 === 0){
        this.scene.add.setText("Time left: " + (this.timer).getProgress().toString().substr(0, 4) + " seconds");*/
        let t = timer;//.getProgress();
        console.log(t);
        this.scene.settext("Time Left: " + t.toString().substr(0, 4) + "seconds");
        console.log("Its updating!!!");
        if (t === 0){
            this.endLevel();
        }
        /*} else if (this.initialTime === 0){
            //avançar para o jogo
        }*/
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
