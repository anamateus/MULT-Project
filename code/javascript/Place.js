"use strict";

import {Thing} from "./Thing.js";
import {Player} from "./Player.js";

export class Place extends Phaser.Scene {
    constructor(texture, openTime, closeTime, json) {
        super({key: texture});
        this.texture = texture;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.json = json;
        this.objects = [];
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
            this.objects.push(object);
        }
    }

    create() {
        /* Place background and objects */
        this.background = this.add.image(540, 300, this.texture + this.currentScreen);
        this.background.setDepth(0)

        for (let object of this.objects) {
            let thing = new Thing(this, -1, -1, object).setScale(0.25, 0.25);
            let coords = this.placeObject(thing);
            thing.setPos(coords[0], coords[1]);
            thing.setDepth(1);
            this.add.existing(thing);
        }
    }

    loadPlayer() {
        if (this.wasEntered === true) {
            this.playerInfo = JSON.parse(localStorage.getItem("player"));
            this.player = new Player(this, 60, 410, this.playerInfo["texture"], this.playerInfo["points"], this.playerInfo["level"]).setScale(0.9, 0.9);
            console.log(this.player);
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
            this.add.existing(this.player.setDepth(2));
            this.physics.world.enable(this.player);
        }
    }

    placeObject(object) { // update
        let shelves = this.json["places"][this.texture]["shelves"];
        let objectWidth = object.width * 0.25;
        let objectHeight = object.height * 0.25;

        let xMin = objectWidth;
        let xMax = this.game.config.width - objectWidth;

        if (this.currentScreen === 1) {
            xMin += 350;
        } else if (this.currentScreen === 3) {
            xMax -= 350;
        }

        let x = Math.round(xMin + Math.random() * (xMax - xMin));
        let y = shelves[Math.round(Math.random() * shelves.length)] - objectHeight/10;
        return [x,y];
    }

    updateScreen() {
        if ((this.player.x < 35 && this.player.direction === 'left' && this.currentScreen === 1 )|| (this.player.x > 1045 && this.player.direction === 'right' && this.currentScreen === 3)) {
            this.player.setVelocityX(0);
        } else if(this.player.x >= 1060 && 1 <= this.currentScreen < 3){
            this.currentScreen++;
            this.background.setTexture(this.texture + this.currentScreen);
            this.player.x = 20;
        } else if (this.player.x <= 20 && 1 < this.currentScreen <= 3) {
            this.currentScreen--;
            this.background.setTexture(this.texture + this.currentScreen);
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