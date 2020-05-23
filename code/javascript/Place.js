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
    }

    preload() {
        // load place screens
        let backgrounds = this.json["places"][this.texture]["textures"];
        for (let i = 0; i < backgrounds.length; i++) {
            this.load.image(this.texture + i , "../../resources/scenarios/" + backgrounds[i] + ".png");
        }

        // load place objects
        let objects = this.json["places"][this.texture]["objects"];
        for (let object of objects) {
            this.load.image(object, "../../resources/objects/" + this.texture + "/" + object + ".png");
            let thing = new Thing(this.texture, 0, 0, object);
            objects.push(thing);
            this.addExisting(thing);
        }
    }
    create() {
        this.add.image(540, 300, this.texture + "1");
    }
}
