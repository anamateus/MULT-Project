"use strict";

export class Task {
    constructor(place, thing) {
        this.place = place;
        this.thing = thing;
        this.status = 0;
    }

    concludeTask() {
        this.status = 1;
    }
}
