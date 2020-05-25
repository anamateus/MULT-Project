import {Player} from "./Player.js";
import {Place} from "./Place.js";
import {Task} from "./Task.js";
import {Timing} from "./Timing.js";

let config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 600,
    autoCenter: true,
    physics: {
        default: 'arcade',
        debug: true
    }
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
        let title = this.add.text(config.width / 2 - 70, 80, "Instructions\n", titleConfigs);

        let textConfigs = {
            font: "10pt",
            fontFamily: "Comic Sans",
            color: "black"
        };
        let text = "- You are going to have a given amount of\n" +
            "time to complete all of your tasks.\n" +
            "- Each level will be a different day\n" +
            "of the week that goes from 8am to 8pm.\n" +
            "- Each day you will get a new list of\n" +
            "tasks to do.\n" +
            "\t\t\t(Hope your memory is well-trained!)\n\n\n" +
            "Now pay attention:\n" +
            "You can only enter each place once.\n\n\n" +
            "Once you press the next button\n" +
            "the time starts counting,\n" +
            "so hurry up! Let's tick some tasks!\n\n\n\n";

        switch (this.character) {
            case ("father") : {
                text += "Love,\n\nYour wife";
                break;
            }
            case ("student") : {
                text += "(Don't worry, you'll study\n for that test later)";
                break;
            }
            case ("tourist") : {
                text += "Enjoy exploring Coimbra!";
                break;
            }
        }

        let instructions = this.add.text(config.width / 2 - 165, 130,
            text, textConfigs);

        content.push(title);
        content.push(instructions);
        return content;
    }

    preloadObjects() {
        this.json = this.cache.json.get("info");
        this.placesList = []
        let places = this.json["places"];
        for (let place of Object.keys(places)) {
            let p = new Place(place, -1, -1, this.json);
            this.game.scene.add(place, p);
            this.placesList.push(p);
        }
    }

    createTasksList(backButton) {
        this.preloadObjects();

        /* Handling back button */
        backButton.setVisible(false);
        backButton.setInteractive(false);

        /* Timer */
        this.timer = new Timing({}, 0, this, 0);

        /* Title */
        let content = [];
        let titleConfigs = {
            font: "16pt",
            fontFamily: "Comic Sans",
            color: "black"
        };
        let title = this.add.text(config.width / 2 - 70, 80, "Your Tasks\n\t\tLevel " + this.level + "\n\n", titleConfigs);

        content.push(title);

        /* Tasks generation */
        let numTasks = 3 + 2 * this.level;
        let tasks = [];
        let previousObjects = [];
        let places = this.json["characters"][this.character]["places"];
        let i = 0;
        while(i !== numTasks && previousObjects.length !== numTasks) {
            let p = places[Math.floor(Math.random() * places.length)];
            let objects = this.json["places"][p]["objects"];
            let o = objects[Math.floor(Math.random() * objects.length)];

            if (!previousObjects.includes(o)) {
                tasks.push(new Task(p, o));
                previousObjects.push(o);
             }
            i++;
        }

        /* Save tasks in local storage */
        let aux = [];
        for (let object of tasks) {
            aux.push({"place": object.place, "object": object.thing});
        }
        localStorage.setItem("tasks", JSON.stringify(aux));

        /* Listing tasks on screen */
        let textConfigs = {
            font: "9pt",
            fontFamily: "Comic Sans",
            color: "black"
        };

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            let ts = task.thing.replace("-", " ");
            let pl = task.place.replace("-", " ");
            if (this.level < 4) {
                this.add.text(config.width / 2 - 165, 130 + 20 * i, "- Get " + ts + " from the " + pl, textConfigs);
            } else {
                this.add.text(config.width / 2 - 165, 130 + 20 * i, "- Get " + ts, textConfigs);
            }
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
            } else if (title.text === ("Your Tasks\n\t\tLevel " + this.level + "\n\n")) {              // go to Map to start each level
                this.timer.endTimer();
                this.scene.start("map", {character: this.character, placesList: this.placesList, level: this.level, time: 0});
            }
        }, this);
    }
    
    update(time, delta){
        if (this.timer !== undefined && this.timer.count === -1){
            console.log("entrou");
            this.scene.start("map", {character: this.character, placesList: this.placesList, level: this.level, time: 0});
        }
    }
}

class MapScreen extends Phaser.Scene {
    constructor() {
        super({key: "map"});
        this.currentStreet = 1;
    }

    init(data) {
        this.character = data.character;
        this.placesList = data.placesList;
        this.level = data.level;
        this.count = data.time;
    }

    preload() {
        this.load.json("info", "../../resources/info.json");
        this.load.image("street1", "../../resources/scenarios/map/street-1.png");
        this.load.image("street2", "../../resources/scenarios/map/street-2.png");
        this.load.image("street3", "../../resources/scenarios/map/street-3.png");
        this.load.spritesheet(this.character + "Sprite", "../../resources/characters/" + this.character + "Sprite.png", {frameWidth: 322, frameHeight: 322});
        this.load.image("helpButton", "../../resources/others/help-button.png");
        this.load.json("info", "../../resources/info.json");
    }

    create() {
        console.log("created map");

        this.anims.create({
            key: 'stand',
            frames: [{key:this.character + 'Sprite', frame:0}],
            frameRate: 5
        })

        this.anims.create({
            key:'rightstop',
            frames:[{key:this.character + 'Sprite',frame:4}],
            frameRate:5
        });

        this.anims.create({
            key:'rightwalk',
            frames:this.anims.generateFrameNumbers(this.character + 'Sprite',{start:5,end:6, zeroPad:4}),
            frameRate:5,
            repeat:-1
        });

        this.anims.create({
            key:'leftstop',
            frames:[{key:this.character + 'Sprite',frame:1}],
            frameRate:5
        });

        this.anims.create({
            key:'leftwalk',
            frames: this.anims.generateFrameNumbers(this.character + 'Sprite',{start:2, end:3, zeroPad:4}),
            frameRate:5,
            repeat:-1
        });

        /* Settings for level 1 */
        if (this.level === 1 || (this.player === undefined)) {
            this.player = new Player(this, 60, 490, this.character, 0, 1);
            let playerInfo = {"texture": this.player.texture, "points": this.player.points, "level": this.player.level};
            localStorage.setItem("player", JSON.stringify(playerInfo));

            this.timer = new Timing({}, this.level, this, 0);
        /* Settings for other levels */
        } else {
            this.playerInfo = JSON.parse(localStorage.getItem("player"));
            this.player = new Player(this, 60, 490, this.character, this.playerInfo["points"], this.playerInfo["level"]);

            this.timeInfo = JSON.parse(localStorage.getItem("time"));
            this.timer = new Timing({}, this.playerInfo["level"], this, this.timeInfo["count"]);
        }

        this.background = this.add.image(config.width / 2, config.height / 2, "street" + this.currentStreet);
        this.background.setDepth(0);
        //this.helpButton = this.add.image( config.width -50,  50, "helpButton").setScale(0.30).setInteractive({useHandCursor: true, pixelPerfect: true});

        this.add.existing(this.player.setScale(0.75,0.75));
        this.physics.world.enable(this.player);

        /*
        this.helpButton.on('pointerdown', function (event) {
            this.scene.start("howToPlay");
        }, this);
         */
    }

    updateScreen() {
        if ((this.player.x < 35 && this.player.direction === 'left' && this.currentStreet === 1 )|| (this.player.x > 1045 && this.player.direction === 'right' && this.currentStreet === 3)) {
            this.player.setVelocityX(0);
        } else if(this.player.x >= 1060 && 1 <= this.currentStreet < 3){
            this.currentStreet++;
            this.background.setTexture("street" + this.currentStreet);
            this.player.x = 20;
        } else if (this.player.x <= 20 && 1 < this.currentStreet <= 3) {
            this.currentStreet--;
            this.background.setTexture("street" + this.currentStreet);
            this.player.x = 1060;
        }
    }

    placeEntrance() {
        this.json = this.cache.json.get("info");
        for (let place of this.placesList) {
            let screen = this.json["places"][place.texture]["screen"];
            let coords = this.json["places"][place.texture]["coords"];
            let x1 = coords[0];
            let x2 = coords[1];
            this.player.keys = this.input.keyboard.createCursorKeys(); // resetting keys
            if (this.currentStreet === screen && this.player.keys.up.isDown && (x1 < this.player.x && this.player.x < x2) && place.wasEntered === false) {
                console.log("entering place");
                localStorage.setItem("time", JSON.stringify({"count": this.timer.count}));
                this.timer.endTimer();
                this.player.enterPlace(place);
                place.loadPlayer();
                this.scene.start(place.texture);
            }
        }
    }

    update(time, delta) {
        this.player.update(time);
        this.updateScreen();
        this.placeEntrance();
        if (this.timer !== undefined && this.timer.count === -1){
            this.level++;
            this.scene.start("phoneScreen", {phone: this.character, level: this.level});
        }
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
        let titleConfigs = {
            font: "16pt",
            fontFamily: "Comic Sans",
            color: "black"
        };
        this.add.text(config.width / 2 - 65, 80, "How to play\n", titleConfigs);
        
        let textConfigs = {
            font: "12pt",
            fontFamily: "Comic Sans",
            color: "black"
        };
        this.add.text(config.width / 2 - 160, 180,
            "- Press the left and right arrows\n" +
            "in your keyboard to walk in\n" + "the map.\n\n" +
            "- Use the up arrow to enter a place\n" +
            "and the down arrow to leave and\n"
            + "return to the map.", textConfigs);
    }
    
    create() {
        this.background = this.add.image(config.width / 2, config.height / 2, "phoneBackground");
        this.backButton = this.add.sprite(100, config.height / 10, "backButton").setScale(0.50).setInteractive({useHandCursor: true, pixelPerfect: true});
        this.instructions();

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