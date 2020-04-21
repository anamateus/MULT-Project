"use strict";

var tasks = [];

class Player{

	//	~~~CONSTRUCTORS~~
	constructor(points, nLevel, x, y){
		this.points = points;
		this.nLevel = nLevel;
		if (this.nLevel <= 7){
			this.endingFlag = 0;
		} else {
			this.endingFlag = 1;
		}
		this.x = x;
		this.y = y;
	}

	addTask(task){
		this.tasks.push(task);
	}

	removeTask(task){
		for (let i = 0; i < this.tasks.length; i++){
			if (this.tasks[i] == task){
				this.tasks.splice(i, 1);	//splice(i, 1) -> removes 1 element in position i
			}
		}
	}

	//	~~~GETTERS~~~
	getPos(){	//get position: return the current x and y
		return [this.x, this.y];
	}

	getPoints(){	//get player's current points
		return points;
	}

	getNLevel(){		//get player's current level
		return nLevel;
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

	setNLevel(){
		this.nLevel++;
		if (this.nLevel <= 7){
			this.endingFlag = 0;
		} else {
			this.endingFlag = 1;
		}
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

	constructor(points, nLevel, x, y){
		super(points, nLevel, x, y);
		this.flag = 1;
	}
	
	preload(){
		this.load.spritesheet("student", "studentSprite.png", {frameWidth: 322, frameHeight: 322});
	}

	create(){
		const student = this.add.sprite(100, 100, 'student', 0); //0 to start with the first frame
		this.anims.create({
				key: 'walkLeft', 
				frames: this.anims.generateFrameNames('student', {start:1, end: 2}),
				zeroPad:2
		});
	}
}

class Father extends Player{

	constructor(points, nLevel, x, y){
		super(points, nLevel, x, y);
		this.flag = 2;
	}
	
}

class Turist extends Player{

	constructor(points, nLevel, x, y){
		super(points, nLevel, x, y);
		this.flag = 3;
	}
	
}
