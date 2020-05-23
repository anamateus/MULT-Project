"use strict";

import {Thing} from "./Thing.js";

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
        this.background = this.add.image(540, 300, this.texture + this.currentScreen);
        for (let object of this.objects) {
            let thing = new Thing(this, -1, -1, object).setScale(0.25, 0.25);
            let coords = this.placeObject(thing);
            thing.setPos(coords[0], coords[1]);
            this.add.existing(thing);
        }
    }

    placeObject(object) { // update
        let shelves = this.json["places"][this.texture]["shelves"];
        let objectWidth = object.width * 0.25;
        let objectHeight = object.height * 0.25;

        this.update();
        let xMin = objectWidth;
        let xMax = this.game.config.width - objectWidth;

        if (this.currentScreen === 1) {
            xMin += 450;
        } else if (this.currentScreen === 3) {
            xMax -= 450;
        }

        let x = Math.round(xMin + Math.random() * (xMax - xMin));
        let y = shelves[Math.round(Math.random() * shelves.length)] - objectHeight/10;
        return [x,y];
    }


    update(time, delta) {
        console.log([this.game.input.mousePointer.x,this.game.input.mousePointer.y]);
    }


}
