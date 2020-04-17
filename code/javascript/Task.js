class Task {

    constructor(place, object) {
        this.place = place;
        this.object = object;
        this.status = 0;

    }

    constructor(place) {
        this.place = place;
        this.status = 0;
    }

    concludeTask() {
        this.status = 1;
    }

}