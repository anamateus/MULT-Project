var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600
};

/* Start game right after the browser loads*/
(() => {
    window.onload = main;
})();

class Main extends Phaser.Game {
    constructor() {
        super(config);
        
        /*
        this.scene.add("<scene name>", <scene>);
        ...
         */
    }
    
    preload() {
        
    }
    
    launch() {
        
    }
    
    close() {
        
    }
}

function main() {
    let game = new Main();
    game.launch();
}