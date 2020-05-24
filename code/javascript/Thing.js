"use strict";
import {Place} from "./Place.js"

export class Thing extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.disableInteractive();
        this.setVisible(false);
        this.wasSelected = false;
    }

    setPos(x,y) {
        this.x = x;
        this.y = y;
    }

    checkSelection(place){
        this.on('pointerdown', function (event) {
            this.wasSelected = true;
        }, this);
    }

    checkTask(place) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            console.log(place.texture);
            console.log(this.texture.key);
            if (task["place"] === place.texture && task["object"] === this.texture.key) {
                tasks.splice(i,1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                break;
            }
        }
    }

    removeFrom(place) {
        let objs = place.objects;
        for (let set of objs) {
            for (let i = 0; i < set.length; i++) {
                if (this === set[i]) {
                    this.setVisible(false);
                    this.removeInteractive();
                    set.splice(i);
                    break;
                }
            }
        }
    }
}