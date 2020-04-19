let config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 600,
    autoCenter: true
};

class mainMenu extends Phaser.Scene {
    constructor() {
        super({key: "mainMenu"});
    }
    preload() {
        this.load.image("logo", "../../resources/others/logo.png");
    }
    create() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#57cfdb");
        this.logo = this.add.image(config.width/2,config.width * 0.1, "logo");
        this.logo.setScale(0.15);
    }
}

/* Start game right after the browser loads*/
(function () {
    window.addEventListener("load", main);
}());

class Main extends Phaser.Game {
    constructor() {
        super(config);

        /* Game scenes */
        this.scene.add("mainMenu", mainMenu);
        //this.scene.add("credits", credits);
        // add the rest
    }
    
    preload() {
        
    }
    
    launch() {
        this.scene.getScene("mainMenu");
        this.scene.start("mainMenu");
    }
    
    close() {
        
    }
}

function main() {
    let game = new Main();
    game.launch();
}