"use strict";

export class Player extends Phaser.Physics.Arcade.Sprite{
	constructor(scene, x, y, texture, points, nLevel){
		super(scene, x, y, texture);
		this.texture = texture;
		this.points = points;
		this.nLevel = nLevel;
		if (this.nLevel <= 7){
			this.endingFlag = 0;
		} else {
			this.endingFlag = 1;
		}
		this.x = x;
		this.y = y;
		this.tasks = [];
		this.keys = this.scene.input.keyboard.createCursorKeys();
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

	enterPlace(scene, place){	//enter a certain (var) place

	}

	leavePlace(){	//return to map

	}

	selectObject(Object){	//select an object

	}
	
	update(time){
		/*Check movement depending on the button being pressed.*/
		if(this.keys.left.isDown){
		    this.setVelocityX(-200);
		    this.anims.play('leftwalk',true);
		    this.direction='left';

		} else if(this.keys.right.isDown){
		    this.setVelocityX(200);
		    this.anims.play('rightwalk',true);
		    this.direction='right';

		}
		else {
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