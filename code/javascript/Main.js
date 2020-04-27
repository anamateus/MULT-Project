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
        this.load.image("tickbox", "../../resources/others/tickbox.png");
        this.load.image("tick", "../../resources/others/tick.png");
    }

    create() {
        let textConfigs = {
            font: "18pt Comic Sans",
            color: "black"
        };
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#57cfdb");
        this.logo = this.add.image(config.width / 2, config.width * 0.1, "logo").setScale(0.15);
        let tickboxes = [];
        let ticks = [];
        this.options = ["Play Game", "How to Play", "Credits", "Exit"];
        for (let i = 0; i < 4; i++) {
            let tickbox = this.add.sprite(config.width / 2 * 0.7, config.height / 2 * (1.1 + 0.2 * i), "tickbox").setScale(0.3);
            tickboxes.push(tickbox.setInteractive({useHandCursor: true}));
            ticks.push(this.add.sprite(config.width / 2 * 0.71, config.height / 2 * (1.09 + 0.2 * i), "tick").setScale(0.5).setVisible(false));
            this.add.text(config.width / 2 * 0.8, config.height / 2 * (1.05 + 0.2 * i), this.options[i], textConfigs)
        }

        /* Tickbox interaction */
        for (let i = 0; i < tickboxes.length; i++) {
            let button = tickboxes[i];
            button.on('pointerover', function (pointer) {
                ticks[i].setVisible(true);
            });
            button.on('pointerout', function (pointer) {
                pointer.useHandCursor = false;
                ticks[i].setVisible(false);
            });
            button.on('pointerdown', function (event) {
                switch (i) {
                    case 2:
                        this.scene.start("credits");
                        break;
                }
            }, this);
        }
    }
}

class creditsScreen extends Phaser.Scene {
    constructor() {
        super({key: "credits"});
    }

    preload() {
        this.load.image("background", "../../resources/scenarios/university.png");
        //FIXME: can we make all the characters' images the same size?
        this.load.image("anaCredits", "../../resources/characters/ana-credits.png");
        this.load.image("lauraCredits", "../../resources/characters/laura-credits.png");
        this.load.image("ritaCredits", "../../resources/characters/rita-credits.png");
    }

    create() {
        let textConfigs = {
            font: "14pt Comic Sans",
            color: "black"
        };

        this.background = this.add.image(config.width / 2, config.height / 2, "background");
        this.add.text(config.width / 2, config.height / 4, "This game is amazing!!!!", textConfigs);
        this.add.image(config.width / 2 - 150, config.height / 2 + 175, "anaCredits").setScale(0.35);
        this.add.image(config.width / 2, config.height / 2 + 175, "lauraCredits").setScale(0.3);
        this.add.image(config.width / 2 + 150, config.height / 2 + 175, "ritaCredits").setScale(0.33);

    }
}

class chooseCharacterScreen {

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
        this.scene.add("credits", creditsScreen);
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