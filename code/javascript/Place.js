class Place extends Phaser.Scene {
    constructor(openTime, closeTime) {
        super({key: "Place"});
        this.openTime = openTime;
        this.closeTime = closeTime;
    }
}

class Supermarket extends Place {

}