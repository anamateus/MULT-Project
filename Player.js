"use strict";

class Player{
	var tasks = [];

	//	~~~CONSTRUCTORS~~
	constructor(points, level, x, y){
		this.points = points;
		this.level = level;
		if (this.level <= 7){
			this.endingFlag = 0;
		} else {
			this.endingFlag = 1;
		}
		this.x = x;
		this.y = y;
	}

	constructor(points, level, x, y, tasks){
		this.points = points;
		this.level = level;
		this.x = x;
		this.y = y;
		this.tasks = tasks;
	}

	//	~~~GETTERS~~~
	getPos(){	//get position: return the current x and y
		return [this.x, this.y];
	}

	getPoints(){	//get player's current points
		return points;
	}

	getLevel(){		//get player's current level
		return level;
	}

	getTasks(){
		return tasks;
	}

	//	~~~SETTERS~~~
	setPos(x, y){
		this.x = x;
		this.y = y;
	}

	setPoints(points){
		this.points = points;
	}

	setLevel(){
		this.level++;
		if (this.level <= 7){
			this.endingFlag = 0;
		} else {
			this.endingFlag = 1;
		}
	}

	setTasks(tasks){
		this.tasks = tasks;
	}

	//	~~~METHODS~~~
	move(x, y){		//move to pos (var) x and (var) y

	}

	enterPlace(place){	//enter a certain (var) place

	}

	leavePlace(){	//return to map

	}

	selectObject(Object){	//select an object

	}
	
}

class Student extends Player{

	constructor(points, level, x, y){
		super(points, level, x, y);
	}

	constructor(points, level, x, y, tasks){
		super(points, level, x, y, tasks);
	}

}

class Father extends Player{

	constructor(points, level, x, y){
		super(points, level, x, y);
	}

	constructor(points, level, x, y, tasks){
		super(points, level, x, y, tasks);
	}
	
}

class Turist extends Player{

	constructor(points, level, x, y){
		super(points, level, x, y);
	}

	constructor(points, level, x, y, tasks){
		super(points, level, x, y, tasks);
	}
	
}