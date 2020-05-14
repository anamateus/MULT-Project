/*
	DETAILS TO SETTLE
		-> if when moving left and right it decresases/increases by 10 or not
		-> sprite velocity (needs to be faster or not)
		-> starting point
		-> first scene with sprite in constructor
*/

"use strict";

var tasks = [];
//var keyLeft = scene.input.keyboard.addKey("LEFT");
//var keyRight = scene.input.keyboard.addKey("RIGHT");

export class Player extends Phaser.GameObjects.Sprite{
	constructor(filename, points, nLevel, x, y, scene){
		super(scene, x, y, filename) //scene has to be Phaser.Scene; [frame] paramater??
		this.filename = filename;
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
		this.load.image("character", "../resources/others/phone-screen-" + filename + ".png");
		this.load.spritesheet("sprite", "../resources/characters/" + filename + "Sprite.png", {
			frameWidth: 241,	//trying to make smaller than before
			frameHeight: 241,	//trying to make smaller than before
			endFrame: 6, //not sure if sprite begins with index 0, if not then change to 7
		});	
	}

	create(){
		const character = this.add.sprite(100, 100, character, 0); //0 to start with the first frame

		//definition of each position of the sprite
		this.anims.create({
		    key: 'stand', 
		    frames: [{key:'studentSprite', frame:0}],
		    frameRate: 5
		})

		this.anims.create({
		    key:'rightstop',
		    frames:[{key:'studentSprite',frame:4}],
		    frameRate:5
		});

		this.anims.create({
		    key:'rightwalk',
		    frames:this.anims.generateFrameNumbers('studentSprite',{start:5,end:6, zeroPad:4}),
		    frameRate:5,
		    repeat:-1
		});

		this.anims.create({
		    key:'leftstop',
		    frames:[{key:'studentSprite',frame:1}],
		    frameRate:5
		});

		this.anims.create({
		    key:'leftwalk',
		    frames:this.anims.generateFrameNumbers('studentSprite',{start:2, end:3, zeroPad:4}),
		    frameRate:5,
		    repeat:-1
		});
		
		this.add.sprite(100, 100, 'sprite').play('front'); //check 100 100 position
	}

	addTask(task){
		this.tasks.push(task);
	}

	removeTask(task){
		for (let i = 0; i < this.tasks.length; i++){
			if (this.tasks[i] === task){
				this.tasks.splice(i, 1);	//splice(i, 1) -> removes 1 element in position i
			}
		}
	}

	getPos(){	
		return [this.x, this.y];
	}

	getPoints(){	
		return points;
	}

	getNLevel(){		
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
	
	update(){
		/*Check movement depending on the button being pressed.*/
		if(cursor.left.isDown){

		    this.setVelocityX(-100);
		    this.anims.play('leftwalk',true);
		    this.direction='left';

		}else if(cursor.right.isDown){

		    this.setVelocityX(100);
		    this.anims.play('rightwalk',true);
		    this.direction='right';

		} else {
		    if (this.direction === 'right'){
			this.setVelocityX(0);
			this.anims.play('rightstop',true);
		    } else if (this.direction === 'left'){
			this.setVelocityX(0);
			this.anims.play('leftstop',true);
		    } else {
			this.setVelocityX(0);
			this.anims.play('stand',true);
		    }
		}
	}
}

class Student extends Player{
	constructor(filename, points, nLevel, x, y, scene){
		super(filename, points, nLevel, x, y, scene);
	}
}

class Father extends Player{
	constructor(filename, points, nLevel, x, y, scene){
		super(filename, points, nLevel, x, y, scene);
	}
	
}

class Turist extends Player{
	constructor(filename, points, nLevel, x, y, scene){
		super(filename, points, nLevel, x, y, scene);
	}
}
