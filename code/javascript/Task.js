"use strict";

class Task {
    constructor(place, ...args) {
        this.place = place;
        if (args.length === 1) {
            this.object = object;
        }
        this.status = 0;
    }

    concludeTask() {
        this.status = 1;
    }
}
