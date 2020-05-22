"use strict";

export class Place extends Phaser.Scene {
    constructor(texture, openTime, closeTime) {
        super({key: texture});
        this.texture = texture;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.wasEntered = false;     // if entered on map, set to true
    }
}
