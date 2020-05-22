"use strict";

export class Task {
    constructor(place, ...args) {
        this.place = place;
        if (args.length === 1) {
            this.thing = args;
        }
        this.status = 0;
    }

    concludeTask() {
        this.status = 1;
    }
}
