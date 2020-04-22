/*
	DETAILS TO SETTLE
		-> if when moving left and right it decresases/increases by 10 or not
		-> sprite velocity (needs to be faster or not)
		-> starting point
		-> if sprite frames are correct on each movement (RITAAAAA)
*/

"use strict";

var tasks = [];

class Player{

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
	
	preload(filename){
		this.load.spritesheet("character", filename, {frameWidth: 322, frameHeight: 322});
	}

	create(){
		const character = this.add.sprite(100, 100, character, 0); //0 to start with the first frame

		this.anims.create({
			key: 'front',
			frames: this.anims.generateFrameNames(character, {start:1, end: 1}),
			zeroPad:2
		});

		this.anims.create({
			key: 'moveLeft', 
			frames: this.anims.generateFrameNames(character, {start:3, end: 4}),
			zeroPad:2
		});

		this.anims.create({
			key: 'standLeft', 
			frames: this.anims.generateFrameNames(character, {start:2, end: 2}),
			zeroPad:2
		});

		this.anims.create({
			key: 'moveRight', 
			frames: this.anims.generateFrameNames(character, {start:6, end: 7}),
			zeroPad:2
		});

		this.anims.create({
			key: 'standRight', 
			frames: this.anims.generateFrameNames(character, {start:5, end: 5}),
			zeroPad:2
		});

		this.input.keybord.on('keydown_LEFT', function(event){
			this.character.x -= 10;
			this.character.play('moveLeft'); 
		}, this);

		this.input.keybord.on('keyup_LEFT', function(event){
			this.character.play('standLeft'); 
		}, this);

		this.input.keybord.on('keydown_RIGHT', function(event){
			this.character.x += 10;
			this.character.play('moveRight'); 
		}, this);

		this.input.keybord.on('keyup_RIGHT', function(event){
			this.character.play('standRight'); 
		}, this);
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

	enterPlace(place){	//enter a certain (var) place

	}

	leavePlace(){	//return to map

	}

	selectObject(Object){	//select an object

	}
	
}

class Student extends Player{

	constructor(points, nLevel, x, y, filename){
		super(points, nLevel, x, y);
		super.preload(filename);
	}
}

class Father extends Player{

	constructor(points, nLevel, x, y, filename){
		super(points, nLevel, x, y);
		super.preload(filename);
	}
	
}

class Turist extends Player{

	constructor(points, nLevel, x, y, filename){
		super(points, nLevel, x, y);
		super.preload(filename);
	}
	
}
