import {Task} from "./Task.js";
import {Player} from "./Player.js";

export class Level {
    constructor(num, player, json) {
        this.num = num;
        this.numTasks = 3 + 2 * num;
        this.json = json;
        this.player = player;
        this.generateTasks();
    }

    /* one hell of a bug, dont try this
    generateTasks() {
        let places = this.json["characters"][this.player]["places"];
        let tasks = [];
        for (let i = 0; i < this.numTasks; i++) {
            let p = places[Math.floor(Math.random() * places.length)];
            let objects = this.json["places"][p]["objects"];
            let o = objects[Math.floor(Math.random() * objects.length)];

            tasks.push(new Task(p,o));
            //this.player.addTask(new Task(p, o));
        }
        return tasks;
    }

     */
}