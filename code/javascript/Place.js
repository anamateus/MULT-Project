"use strict";

export class Place extends Phaser.Scene {
    constructor(texture, openTime, closeTime, json) {
        super({key: texture});
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.json = json;
        this.wasEntered = false;     // if entered on map, set to true
    }

    preloadObjects() {
        let objects = this.json["places"][texture]["objects"];
        for (let object of objects) {
            this.load.image(object, "../../resources/objects/" + place + "/" + object + ".png");
        }
    }
}
