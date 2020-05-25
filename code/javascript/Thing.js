"use strict";

export class Thing extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.disableInteractive();
        this.setVisible(false);
        this.checkSelection();
    }

    setPos(x,y) {
        this.x = x;
        this.y = y;
    }

    /* Check if object is being clicked */
    checkSelection(){
        this.on('pointerdown', function (event) {
            this.removeFrom(this.scene);
            this.checkTask(this.scene);
        }, this);
    }

    /* Check if selected object and place correspond to an assigned task,
    /* and if so, remove the task from the list */
    checkTask(place) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            if (task["place"] === place.texture && task["object"] === this.texture.key) {
                tasks.splice(i,1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                break;
            }
        }
    }

    /* disable interaction and visibility of object if it was selected */
    removeFrom(place) {
        let objs = place.objects;
        for (let set of objs) {
            for (let i = 0; i < set.length; i++) {
                if (this === set[i]) {
                    this.setVisible(false);
                    this.removeInteractive();
                    set.splice(i,1);
                    break;
                }
            }
        }
    }
}