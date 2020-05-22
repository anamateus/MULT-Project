import {Player} from "./Player.js";
import {Place} from "./Place.js";
import {Thing} from "./Thing.js";
import {Task} from "./Task.js";
import {Timing} from "./Timing.js";

let config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 600,
    autoCenter: true
};

class MainMenu extends Phaser.Scene {
    constructor() {
        super({key: "mainMenu"});
    }

    preload() {
        this.load.image("backgroundMainMenu", "../../resources/scenarios/main-menu.png");
        this.load.image("logo", "../../resources/others/logo.png");
        this.load.image("tickbox", "../../resources/others/tickbox.png");
        this.load.image("tick", "../../resources/others/tick.png");
        this.load.image("helpButton", "../../resources/others/help-button.png");
    }

    create() {
        let textConfigs = {
            font: "16pt",
            fontFamily: "Comic Sans",
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

class ChooseCharacterScreen extends Phaser.Scene {
    constructor() {
        super({key: "chooseCharacter"});
    }

    preload() {
        this.load.image("backgroundChooseCharacter", "../../resources/scenarios/street.png");
        this.load.image("father", "../../resources/characters/father-front.png");
        this.load.image("student", "../../resources/characters/student-front.png");
        this.load.image("tourist", "../../resources/characters/tourist-front.png");
        this.load.image("backButton", "../../resources/others/back-button.png");
        this.load.image("helpButton", "../../resources/others/help-button.png");
    }

    create() {
        localStorage.clear();

        let textConfigs = {
            font: "16pt",
            fontFamily: "Comic Sans",
            color: "black"
        };

        this.background = this.add.image(config.width / 2, config.height / 2, "backgroundChooseCharacter");
        this.add.text(config.width / 2 - 100, config.height / 5, "Choose your character!", textConfigs);
        this.backButton = this.add.sprite(100, config.height / 10, "backButton").setScale(0.50).setInteractive({
            useHandCursor: true,
            pixelPerfect: true
        });
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
                this.scene.start("phoneScreen", {phone: type, level: 1});
            }, this);
        }

        /* Back button interaction */
        this.backButton.on('pointerdown', function (event) {
            this.scene.start("mainMenu");
        }, this);
    }
}

class PhoneScreen extends Phaser.Scene {
    constructor() {
        super({key: "phoneScreen"});
    }

    init(data) {
        this.character = data.phone;
        this.level = data.level;
    }

    preload() {
        this.load.image("backgroundPhone-father", "../../resources/others/phone-screen-father.png");
        this.load.image("backgroundPhone-student", "../../resources/others/phone-screen-student.png");
        this.load.image("backgroundPhone-tourist", "../../resources/others/phone-screen-tourist.png");
        this.load.image("backButton", "../../resources/others/back-button.png");
        this.load.image("nextButton", "../../resources/others/next-button.png");
        this.load.image("helpButton", "../../resources/others/help-button.png");
        this.load.json("info", "../../resources/info.json");
    }

    createInstructions() {
        let content = [];
        let titleConfigs = {
            font: "16pt",
            fontFamily: "Comic Sans",
            color: "black"
        };
        let title = this.add.text(config.width / 2 - 150, 80, "Instructions\n", titleConfigs);

        let textConfigs = {
            font: "10pt",
            fontFamily: "Comic Sans",
            color: "black"
        };
        let instructions = this.add.text(config.width / 2 - 150, 180,
            "-You are going to have 5 minutes\n" +
            "to complete all of the tasks.\n\n" +
            "-You can't check the tasks' list\n" +
            " more than once.\n\n" +
            "-...\n", textConfigs);

        content.push(title);
        content.push(instructions);
        return content;
    }

    preloadObjects() {
        this.json = this.cache.json.get("info");
        let places = this.json["places"];
        for (let place of Object.keys(places)) {
            new Place(place, -1, -1, this.json);
        }
    }

    createTasksList(backButton) {
        this.preloadObjects();

        backButton.setVisible(false);
        backButton.setInteractive(false);
        
        var timer = new Timing({}, this.level, this);
        let content = [];

        let titleConfigs = {
            font: "16pt",
            fontFamily: "Comic Sans",
            color: "black"
        };
        let title = this.add.text(config.width / 2 - 150, 80, "Your Tasks\n", titleConfigs);
        //let aux = timer.txt(0);
        //let counter = this.add.aux();
        
        content.push(title);
        //content.push(counter);

        /* Tasks generation */
        let numTasks = 3 + 2 * this.level;
        let tasks = [];
        let places = this.json["characters"][this.character]["places"];

        for (let i = 0; i < numTasks; i++) {
            let p = places[Math.floor(Math.random() * places.length)];
            let objects = this.json["places"][p]["objects"];
            let o = objects[Math.floor(Math.random() * objects.length)];

            tasks.push(new Task(p, o));
        }

        /* Listing tasks on screen */
        let textConfigs = {
            font: "10pt",
            fontFamily: "Comic Sans",
            color: "black"
        };

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            this.add.text(config.width / 2 - 160, 130 + 20 * i, "- Get " + task.thing + " from the " + task.place, textConfigs);
        }
        return content;
    }

    create() {
        this.background = this.add.image(config.width / 2, config.height / 2, "backgroundPhone-" + this.character);
        this.backButton = this.add.sprite(100, config.height / 10, "backButton").setScale(0.50).setInteractive({useHandCursor: true, pixelPerfect: true});
        this.nextButton = this.add.sprite(config.width - 100, config.height / 10, "nextButton").setScale(0.50).setInteractive({useHandCursor: true, pixelPerfect: true});
        let content;

        if (this.level === 1) {
            content = this.createInstructions().map(elem => elem.setVisible(true));
        } else {
            content = this.createTasksList(this.backButton);
        }

        /* Back button interaction */
        this.backButton.on('pointerdown', function (event) {
            this.scene.start("chooseCharacter");
        }, this);

        /* Next button interaction */
        this.nextButton.on('pointerdown', function (event) {
            let title = content[0];
            if (title.text === "Instructions\n") {
                content.map(elem => elem.setVisible(false));
                content = this.createTasksList(this.backButton);
            } else if (title.text === "Your Tasks\n") {              // go to Map to start each level
                this.scene.start("map", {character: this.character});
            }
        }, this);
    }
}

class MapScreen extends Phaser.Scene {
    constructor() {
        super({key: "map"});
    }

    init(data) {
        this.character = data.character;
    }

    preload() {
        this.load.json("info", "../../resources/info.json");
        this.load.image("street1", "../../resources/scenarios/map/street-1.png");
        this.load.image("street2", "../../resources/scenarios/map/street-2.png");
        this.load.image("street3", "../../resources/scenarios/map/street-3.png");
        this.load.image(this.character + "Sprite", "../../resources/characters/" + this.character + "Sprite.png")
    }
    create() {
        let player = new Player(this, 0,0,this.character + "Sprite.png", 0, 1);
        this.street = this.add.image(config.width / 2, config.height / 2, "street1");
    }
}

class HowToPlayScreen extends Phaser.Scene {
    constructor() {
        super({key: "howToPlay"});
    }

    preload() {
        this.load.image("phoneBackground", "../../resources/others/phone-screen-student.png");
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#82c4cb");
        this.load.image("backButton", "../../resources/others/back-button.png");
    }

    instructions(){
        let content = [];
        let titleConfigs = {
            font: "18pt Comic Sans",
            color: "black"
        };
        let title = this.add.text(config.width / 2 - 150, 80, "How to play\n", titleConfigs);
        
        let textConfigs = {
            font: "12pt Comic Sans",
            color: "black"
        };
        let text = this.add.text(config.width / 2 - 150, 180, "[instructions here]\n", textConfigs);
        
        content.push(title);
        content.push(text);
        return content;
    }
    
    create() {
        this.background = this.add.image(config.width / 2, config.height / 2, "phoneBackground");
        this.backButton = this.add.sprite(100, config.height / 10, "backButton").setScale(0.50).setInteractive({useHandCursor: true, pixelPerfect: true});
        let content = this.instructions();

        /* Back button interaction */
        this.backButton.on('pointerdown', function (event) {
            this.scene.start("mainMenu");
        }, this);
    }
}

class CreditsScreen extends Phaser.Scene {
    constructor() {
        super({key: "credits"});
    }

    preload() {
        this.load.image("backgroundCredits", "../../resources/scenarios/university.png");
        this.load.image("anaCredits", "../../resources/characters/ana-credits.png");
        this.load.image("lauraCredits", "../../resources/characters/laura-credits.png");
        this.load.image("ritaCredits", "../../resources/characters/rita-credits.png");
        this.load.image("backButton", "../../resources/others/back-button.png");
    }

    create() {
        let textConfigs = {
            font: "16pt",
            fontFamily: "Comic Sans",
            color: "black"
        };

        this.background = this.add.image(config.width / 2, config.height / 2, "backgroundCredits");
        this.backButton = this.add.sprite(80, config.height / 12, "backButton").setScale(0.50).setInteractive({useHandCursor: true, pixelPerfect: true});

        this.add.image(config.width / 2 - 150, config.height / 2 + 150, "anaCredits").setScale(0.35);
        this.add.image(config.width / 2, config.height / 2 + 150, "lauraCredits").setScale(0.3);
        this.add.image(config.width / 2 + 150, config.height / 2 + 150, "ritaCredits").setScale(0.33);

        this.add.text(config.width / 2 - 100, config.height / 2 - 200, "This game was developed by:", textConfigs);
        this.add.text(config.width / 2 - 165, config.height / 2 + 265, "Ana", textConfigs);
        this.add.text(config.width / 2 - 20, config.height / 2 + 265, "Laura", textConfigs);
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
        this.scene.add("mainMenu", MainMenu);
        this.scene.add("chooseCharacter", ChooseCharacterScreen);
        this.scene.add("phoneScreen", PhoneScreen);
        this.scene.add("map", MapScreen);
        this.scene.add("howToPlay", HowToPlayScreen);
        this.scene.add("credits", CreditsScreen);
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
    game.preload();
    game.launch();
}
