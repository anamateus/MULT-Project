"use strict";

export class Thing extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setInteractive({useHandCursor: true, pixelPerfect: true});
        this.wasSelected = false;
        //scene.add.existing(this);
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