"use strict";

import {Thing} from "./Thing.js";
import {Player} from "./Player.js";
import {Timing} from "./Timing.js";

export class Place extends Phaser.Scene {
    constructor(texture, openTime, closeTime, json) {
        super({key: texture});
        this.texture = texture;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.json = json;
        this.objects = [[],[],[]];
        this.wasEntered = false;
        this.currentScreen = 1;
    }

    preload() {
        // load place screens
        this.backgrounds = this.json["places"][this.texture]["textures"];
        for (let i = 0; i < this.backgrounds.length; i++) {
            this.load.image(this.texture + (i+1) , "../../resources/scenarios/"+ this.texture + "/" + this.backgrounds[i] + ".png");
        }

        // load place objects
        let objects = this.json["places"][this.texture]["objects"];
        for (let object of objects) {
            this.load.image(object, "../../resources/objects/" + this.texture + "/" + object + ".png");
        }

        // load doors
        this.doorTexture = this.json["places"][this.texture]["door"];
        this.load.image(this.doorTexture, "../../resources/scenarios/doors/" +  this.doorTexture + ".png");
    }

    loadPlayer() {
        this.playerInfo = JSON.parse(localStorage.getItem("player"));
        this.player = new Player(this, 60, 410, this.playerInfo["texture"], this.playerInfo["points"], this.playerInfo["level"]).setScale(0.9, 0.9);

        this.anims.create({
            key: 'stand',
            frames: [{key:  this.playerInfo.texture + 'Sprite', frame: 0}],
            frameRate: 5
        })

        this.anims.create({
            key: 'rightstop',
            frames: [{key:  this.playerInfo.texture + 'Sprite', frame: 4}],
            frameRate: 5
        });

        this.anims.create({
            key: 'rightwalk',
            frames: this.anims.generateFrameNumbers( this.playerInfo.texture + 'Sprite', {start: 5, end: 6, zeroPad: 4}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'leftstop',
            frames: [{key:  this.playerInfo.texture + 'Sprite', frame: 1}],
            frameRate: 5
        });

        this.anims.create({
            key: 'leftwalk',
            frames: this.anims.generateFrameNumbers( this.playerInfo.texture + 'Sprite', {start: 2, end: 3, zeroPad: 4}),
            frameRate: 5,
            repeat: -1
        });
    }

    create() {
        /* Place background and objects */
        this.background = this.add.image(540, 300, this.texture + this.currentScreen);
        this.background.setDepth(0);

        this.createObjects();
        this.showObjects();

        this.door = this.add.sprite(210, 298, this.json["places"][this.texture]["door"]);
        this.door.setScale(2).setDepth(2);

        /* Timer */
        let timeInfo = JSON.parse(localStorage.getItem("time"));
        this.timer = new Timing({}, this.player.level, this, timeInfo["count"]);

        if (this.player !== undefined) {
            this.add.existing(this.player);
            this.player.setDepth(3);
            this.physics.world.enable(this.player);
        }
    }

    createObjects() {
        let objects = this.json["places"][this.texture]["objects"];
        let sets = [];
        let setsMin = [0,0,0]; // minimum x-coordinates for each object in each set

        /* Choose screen for each object */
        for (let object of objects) {
            let set = Math.round(1 + Math.random() * (this.objects.length-1));
            sets.push(set);
        }

        /* Create and distribute objects by the screens */
        for (let i = 0; i < objects.length; i++) {
            let thing = new Thing(this, -1, -1, objects[i]).setScale(0.5, 0.5).setDepth(1);
            let set = sets[i];
            let space = setsMin[set-1];
            let coords = this.placeObject(thing, set, space);

            thing.setPos(coords[0], coords[1]);
            (this.objects[set-1]).push(thing);
            this.add.existing(thing);

            setsMin[set-1] += thing.width*0.11; // increasing minimum x-coordinate of each set to avoid object overlapping
        }
    }

    /* Calculate random [x,y] coordinates for each object */
    placeObject(object, set, space) {
        let shelves = this.json["places"][this.texture]["shelves"];
        let objectWidth = object.width * 0.5;
        let objectHeight = object.height * 0.5;

        let xMin = objectWidth ;
        let xMax = this.game.config.width - objectWidth ;
        
        if (set === 1) {
            xMin += 450;
        } else if (set === 3) {
            xMax -= 450;
        }

        let x =  Math.round( xMin + Math.random() * (xMax - xMin)) + space;
        let y = shelves[Math.round(Math.random() * (shelves.length-1))] - objectHeight/10;
        return [x,y];
    }

    /* Show the correct object sprites when changing screens */
    showObjects() {
        for (let i = 0; i < this.objects.length; i++) {
            let set = this.objects[i];
            console.log(this.objects);

            if (i+1 !== this.currentScreen) {
                for (let object of set) {
                    object.setVisible(false);
                    object.disableInteractive();
                }
            } else {
                set.map((object => {object.setVisible(true).setInteractive({"useHandCursor": true, "pixelPerfect": true})}));
            }
        }
    }

    /* Manage door visibility and coordinates when changing screens */
    updateDoor() {
        if (this.currentScreen === 1) {
            this.door.setVisible(true);
            this.door.x = 210;
        } else if (this.currentScreen === 2) {
            this.door.setVisible(false);
        } else if (this.currentScreen === 3) {
            this.door.setVisible(true);
            this.door.x = 870;
        }
    }

    /* Check player coordinates and change screen accordingly */
    updateScreen() {
        if (20 + this.door.x - this.door.width < this.player.x && this.player.x < this.door.x + this.door.width - 20 && this.player.keys.down.isDown) {
            this.player.leavePlace(this);
            this.wasEntered = true;
            localStorage.setItem("time", JSON.stringify({"count": this.timer.count}));
            this.timer.endTimer();
            this.scene.start("map");
        }
        if ((this.player.x < 35 && this.player.direction === 'left' && this.currentScreen === 1 )|| (this.player.x > 1045 && this.player.direction === 'right' && this.currentScreen === 3)) {
            this.player.setVelocityX(0);
            this.showObjects();
            this.updateDoor();

        } else if(this.player.x >= 1060 && 1 <= this.currentScreen < 3){
            this.currentScreen++;
            this.background.setTexture(this.texture + this.currentScreen);
            this.showObjects();
            this.updateDoor();
            this.player.x = 20;

        } else if (this.player.x <= 20 && 1 < this.currentScreen <= 3) {
            this.currentScreen--;
            this.background.setTexture(this.texture + this.currentScreen);
            this.showObjects();
            this.updateDoor();
            this.player.x = 1060;
        }
    }

    update(time, delta) {
        if (this.wasEntered === true) {
            this.player.update(time);
            this.updateScreen();
        }
    }
}
