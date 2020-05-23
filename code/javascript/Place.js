"use strict";

import {Thing} from "./Thing.js";

export class Place extends Phaser.Scene {
    constructor(texture, openTime, closeTime, json) {
        super({key: texture});
        this.texture = texture;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.jsonDoc = json;
        this.objects = [];
        this.wasEntered = false;
    }

    preload() {
        // load place screens
        this.backgrounds = this.jsonDoc["places"][this.texture]["textures"];
        for (let i = 0; i < this.backgrounds.length; i++) {
            this.load.image(this.texture + (i+1) , "../../resources/scenarios/"+ this.texture + "/" + this.backgrounds[i] + ".png");
        }

        // load place objects
        let objects = this.jsonDoc["places"][this.texture]["objects"];
        for (let object of objects) {
            this.load.image(object, "../../resources/objects/" + this.texture + "/" + object + ".png");
            this.objects.push(object);
        }
    }

    create() {
        this.background = this.add.image(540, 300, this.texture + "1");
        for (let object of this.objects) {
            let coords = this.placeObjects();
            let thing = new Thing(this, coords[0], coords[1], object);
            this.add.existing(thing.setScale(0.25));
        }
    }

    placeObjects() { // update
        let x = Math.random() * this.game.config.width;
        let y = Math.random() * this.game.config.height;

        return [x,y];
    }
}
