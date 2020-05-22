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
        for (let background of backgrounds) {
            this.load.image(this.texture, "../../resources/scenarios/" + background + ".png");
        }

        // load place objects
        let objects = this.json["places"][this.texture]["objects"];
        for (let object of objects) {
            this.load.image(object, "../../resources/objects/" + this.texture + "/" + object + ".png");
            let thing = new Thing(this.texture, 0, 0, object); //FIXME!!!!!!!
            objects.push(thing);
            this.addExisting(thing);
        }
    }
}
