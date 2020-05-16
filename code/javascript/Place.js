"use strict";

class Place extends Phaser.Scene {
    constructor(texture, openTime, closeTime) {
        super({key: "Place"});
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.wasEntered = false;     // if entered on map, set to true
    }


}
