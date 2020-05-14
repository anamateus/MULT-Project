"use strict";

class Object extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.x = x;
        this.y = y;
        this.setInteractive({useHandCursor: true, pixelPerfect: true});
        this.wasSelected = false;
    }

    getPos(){
        return [this.x, this.y];
    }

    animation(){
        this.on('pointerdown', function (event) {
            this.setVisible(false);                          // change
        }, this);
    }
}