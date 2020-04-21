let config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 600,
    autoCenter: true
};

//FIXME
class mainMenu extends Phaser.Scene {
    constructor() {
        super({key: "mainMenu"});
    }
    preload() {
        this.load.image("logo", "../../resources/others/logo.png");
        this.load.image("tickbox", "../../resources/others/tickbox.png");
        this.load.image("tick", "../../resources/others/tick.png");
    }
    create() {
        let textConfigs = {
            font: "18pt Comic Sans",
            color: "black"
        };
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#57cfdb");
        this.logo = this.add.image(config.width/2,config.width * 0.1, "logo").setScale(0.15);
        this.tickboxes = [];
        this.ticks = [];
        this.options = ["Play Game", "How to Play", "Credits", "Exit"];
        for (let i = 0; i < 4; i++) {
            this.tickboxes.push(this.add.sprite(config.width/2 * 0.7, config.height/2 * (1.1 + 0.2*i), "tickbox").setScale(0.3).setInteractive({ useHandCursor: true}));
            this.ticks.push(this.add.sprite(config.width/2 * 0.71, config.height/2 * (1.09 + 0.2*i), "tick").setScale(0.5).setVisible(false));
            this.add.text(config.width/2 * 0.8,config.height/2 * (1.05 + 0.2*i) , this.options[i], textConfigs)
        }

        for (let i = 0; i < this.tickboxes.length; i++) {
            let button = this.tickboxes[i];
            button.on('pointerover',function(pointer){
                this.ticks[i].setVisible(true);
            });
        }


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