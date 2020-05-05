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
        this.load.image("backgroundMainMenu", "../../resources/scenarios/main-menu.png");
        this.load.image("logo", "../../resources/others/logo.png");
        this.load.image("tickbox", "../../resources/others/tickbox.png");
        this.load.image("tick", "../../resources/others/tick.png");
    }

    create() {
        let textConfigs = {
            font: "18pt Comic Sans",
            color: "black"
        };
        this.background = this.add.image(config.width / 2, config.height / 2, "backgroundMainMenu");
        this.logo = this.add.image(config.width / 2, config.width * 0.12, "logo").setScale(0.12);
        let tickboxes = [];
        let ticks = [];
        this.options = ["Play Game", "How to Play", "Credits", "Exit"];
        for (let i = 0; i < 4; i++) {
            let tickbox = this.add.sprite(config.width / 2 * 0.83, config.height / 2 * (1.05 + 0.2 * i), "tickbox").setScale(0.3);
            tickboxes.push(tickbox.setInteractive({useHandCursor: true}));
            ticks.push(this.add.sprite(config.width / 2 * 0.84, config.height / 2 * (1.04 + 0.2 * i), "tick").setScale(0.5).setVisible(false));
            this.add.text(config.width / 2 * 0.93, config.height / 2 * (1 + 0.2 * i), this.options[i], textConfigs)
        }

        /* Tickbox interaction */
        for (let i = 0; i < tickboxes.length; i++) {
            let button = tickboxes[i];
            button.on('pointerover', function (pointer) {
                ticks[i].setVisible(true);
            });

            button.on('pointerout', function (pointer) {
                ticks[i].setVisible(false);
            });

            /* Screen selection */
            button.on('pointerdown', function (event) {
                switch (i) {
                    case 0:
                        this.scene.start("chooseCharacter");
                        break;
                    case 1:
                        this.scene.start("howToPlay");
                        break;
                    case 2:
                        this.scene.start("credits");
                        break;
                    case 3:
                        this.game.close();
                }
            }, this);
        }
    }
}

class chooseCharacterScreen extends Phaser.Scene {
    constructor() {
        super({key: "chooseCharacter"});
    }

    preload() {
        this.load.image("backgroundChooseCharacter", "../../resources/scenarios/street.png");
        this.load.image("father", "../../resources/characters/father-front.png");
        this.load.image("student", "../../resources/characters/student-front.png");
        this.load.image("tourist", "../../resources/characters/tourist-front.png");
        this.load.image("backButton", "../../resources/others/back_button.png");
    }

    create() {
        let textConfigs = {
            font: "18pt Comic Sans",
            color: "black"
        };

        this.background = this.add.image(config.width / 2, config.height / 2, "backgroundChooseCharacter");
        this.add.text(config.width / 2 - 100, config.height / 5, "Choose your character", textConfigs);
        this.backButton = this.add.sprite(config.width - 100, config.height / 10, "backButton").setScale(0.50).setInteractive({useHandCursor: true, pixelPerfect: true});
        let characters = ["father", "student", "tourist"];
        let images = [];

        for (let i = 0; i < 3; i++) {
            let character = this.add.sprite(config.width / 2 + 250 * (i - 1), config.height / 2 + 150, characters[i]).setScale(0.35);
            images.push(character.setInteractive({useHandCursor: true, pixelPerfect: true}));
        }

        /* Character selection */
        for (let i = 0; i < images.length; i++) {
            let chosenCharacter = images[i];
            let type = characters[i]; // corresponding string/tag

            chosenCharacter.on('pointerdown', function (event) {
                //let player = new Player(type, 0, 1, 0, 0); // character, points, level, x, y
                //this.scene.start("phoneScreen", {phone: type});
                this.scene.start("phoneScreenAux", {phone: type});
            }, this);
        }

        /* Back button interaction */
        this.backButton.on('pointerdown', function (event) {
            this.scene.start("mainMenu");
        }, this);
    }
}

class phoneScreenAux extends Phaser.Scene {
   /* constructor() {
        super({key: "phoneScreenAux"});
    }

    preload() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#ff8c00");
    }

    create() {
        let textConfigs = {
            font: "18pt Comic Sans",
            color: "black"
        };
        this.add.text(config.width / 2 - 100, config.height / 5, "How you doing?", textConfigs);
        this.background = this.add.image(config.width / 2, config.height / 2, "backgroundPhone");
    }*/
    constructor() {
        super({key: "phoneScreenAux"});
    }

    init(data) {
        this.character = data.phone;
    }

    preload() {
        this.load.image("backgroundPhone", "../../resources/others/phone-screen-" + this.character + ".png");
        this.load.image("backButton", "../../resources/others/back_button.png");
    }

    create() {
        this.background = this.add.image(config.width / 2, config.height / 2, "backgroundPhone");
        this.backButton = this.add.sprite(config.width - 100, config.height / 10, "backButton").setScale(0.50).setInteractive({useHandCursor: true, pixelPerfect: true});

        let titleConfigs = {
            font: "18pt Comic Sans",
            color: "black"
        };
        this.add.text(config.width / 2 - 150, 80, "How you doing good looking?\n\n", titleConfigs);
        
        let subTitleConfigs = {
            font: "14pt Comic Sans",
            color: "black"
        };
        this.add.text(config.width / 2 - 150, 120, "These are the instructions\nof the game.\n", subTitleConfigs);

        let textConfigs = {
            font: "12pt Comic Sans",
            color: "black"
        };
        this.add.text(config.width / 2 - 150, 180, "-You are going to have 5 minutes\nto complete all of the tasks.\n\n-You can't check the tasks' list\n more than once.\n\n-...\n", textConfigs);

        /* Back button interaction */
        this.backButton.on('pointerdown', function (event) {
            this.scene.start("chooseCharacter");
        }, this);
    }
}

class phoneScreen extends Phaser.Scene {
    constructor() {
        super({key: "phoneScreen"});
    }

    init(data) {
        this.character = data.phone;
    }

    preload() {
        this.load.image("backgroundPhone", "../../resources/others/phone-screen-" + this.character + ".png");

    }

    create() {
        this.background = this.add.image(config.width / 2, config.height / 2, "backgroundPhone");
    }
}

class howToPlayScreen extends Phaser.Scene {
    constructor() {
        super({key: "howToPlay"});
    }

    preload() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#82c4cb");
        this.load.image("backButton", "../../resources/others/back_button.png");
    }

    create() {
        let textConfigs = {
            font: "18pt Comic Sans",
            color: "black"
        };
        this.add.text(config.width / 2 - 100, config.height / 5, "< insert How to play screen here >", textConfigs);
        this.backButton = this.add.sprite(config.width - 100, config.height / 10, "backButton").setScale(0.50).setInteractive({useHandCursor: true, pixelPerfect: true});

        /* Back button interaction */
        this.backButton.on('pointerdown', function (event) {
            this.scene.start("mainMenu");
        }, this);
    }
}

class creditsScreen extends Phaser.Scene {
    constructor() {
        super({key: "credits"});
    }

    preload() {
        this.load.image("backgroundCredits", "../../resources/scenarios/university.png");
        this.load.image("anaCredits", "../../resources/characters/ana-credits.png");
        this.load.image("lauraCredits", "../../resources/characters/laura-credits.png");
        this.load.image("ritaCredits", "../../resources/characters/rita-credits.png");
        this.load.image("backButton", "../../resources/others/back_button.png");
    }

    create() {
        let textConfigs = {
            font: "14pt Comic Sans",
            color: "black"
        };

        this.background = this.add.image(config.width / 2, config.height / 2, "backgroundCredits");
        this.backButton = this.add.sprite(config.width - 100, config.height / 10, "backButton").setScale(0.50).setInteractive({useHandCursor: true, pixelPerfect: true});

        this.add.image(config.width / 2 - 150, config.height / 2 + 150, "anaCredits").setScale(0.35);
        this.add.image(config.width / 2, config.height / 2 + 150, "lauraCredits").setScale(0.3);
        this.add.image(config.width / 2 + 150, config.height / 2 + 150, "ritaCredits").setScale(0.33);

        this.add.text(config.width / 2 - 100, config.height / 2 - 200, "This game was developed by:", textConfigs);
        this.add.text(config.width / 2 - 165, config.height / 2 + 265, "Ana", textConfigs);
        this.add.text(config.width / 2  - 20, config.height / 2 + 265, "Laura", textConfigs);
        this.add.text(config.width / 2 + 135, config.height / 2 + 265, "Rita", textConfigs);

        /* Back button interaction */
        this.backButton.on('pointerdown', function (event) {
            this.scene.start("mainMenu");
        }, this);
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
        this.scene.add("chooseCharacter", chooseCharacterScreen);
        this.scene.add("phoneScreen", phoneScreen);
        this.scene.add("phoneScreenAux", phoneScreenAux);
        this.scene.add("howToPlay", howToPlayScreen);
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
        window.close();
    }
}

function main() {
    let game = new Main();
    game.launch();
}