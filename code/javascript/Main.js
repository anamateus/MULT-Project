var config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 600,
    autoCenter: true,
    scene: [mainMenu] // add rest of scene names here
};

/* Start game right after the browser loads*/
(function () {
    window.addEventListener("load", main);
}());

class Main extends Phaser.Game {
    constructor() {
        super(config);

        /* Game scenes */
        this.scene.add("mainMenu", mainMenu);
        this.scene.add("credits", credits);
        // add the rest
    }
    
    preload() {
        
    }
    
    launch() {

    }
    
    close() {
        
    }
}

class mainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "mainMenu"});
    }
    preload() {
        this.load.image('logo', 'resources/others/logo');
        this.load.image('background', 'resources/scenarios/dummy-background.png');
    }
    create() {
        this.image = this.add.image(500,500, 'logo');
        this.image = this.add.image(500,500, 'background');
    }
}


function main() {
    let game = new Main();
    game.launch();
}