//Prospects on scouting board on Offense or Defense in college football

/* 
created class for individual prospects, with properties being name, position, and hometown
returned statement providing that info
*/
class ScoutedPlayer {
    constructor(name, position, home){
        this.name = name;
        this.position = position;
        this.home = home;
    }
    describe(){
        return `${this.name} (${this.position}), from ${this.home}.`;
    }
}
/*
created class where you can create offense, defense, or any other catergory to assign each player to
returned statement stating how many players in each catergory
*/
class SideOfBall {
    constructor(offdef){
        this.offdef = offdef;
        this.players = [];
    }
    addScoutedPlayer(player){
        if (player instanceof ScoutedPlayer){
            this.players.push(player);
        } else {
            throw new Error(`You can only add an instance of a Player.
            Argument is not a player: ${player}`);
        }
    }
    describe(){
        return `       The ${this.offdef} has ${this.players.length} prospects.
        --------------------------------`;
    }
}
/*
create class where you contain the catergories
start method allows you to decide which option and other methods you want to use
showMainMenuOptions is the prompt listing your options (initialized by start)
showSideBallMenuOptions is the prompt listing your options of assing and removing in that catergory, its name and amount of players in it as well (initialized by viewSIde)
displaySide displays any catergories that were created and what their index is
createSide allows you to create a catergory
viewSide allows you to view a specific catergory, its related info, and provides options on what else you want to do with it
deleteSide allows you delete a catergory
createPlayer allows you to create a player (creates instance of class)
deletePlayer allows you to delete that player or object
*/
class Menu {
    constructor(){
        this.sideBall = [];
        this.selectedSideBall = null;
    }
    start(){
        let selection = this.showMainMenuOptions();
        while (selection != 0){
            switch(selection){
                case '1' :
                    this.createSide();  
                    break;
                case '2' :
                    this.viewSide();  
                    break;
                case '3' :
                    this.deleteSide();  
                    break;
                case '4' :
                    this.displaySide();  
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }
    showMainMenuOptions(){
        return prompt(`
        0) Exit
        1) Create offense or defense
        2) View offensive or defensive prospects
        3) Delete offensive or defensive side
        4) Display sides of the football
        `);
    }
    showSideBallMenuOptions(sideBallInfo){
        return prompt(`
        0) Back
        1) Add a new prospect
        2) Take a prospect off the board
        --------------------------------
        ${sideBallInfo}
        `);
    }
    displaySide(){
        let sideString = '';
        for (let i = 0; i < this.sideBall.length; i++){
            sideString += i + ') ' + this.sideBall[i].offdef + '\n';
        }
        alert(sideString);
    }
    createSide(){
        let name = prompt('Enter which side of the ball you would like to create: ');
        this.sideBall.push(new SideOfBall(name));
    }
    viewSide(){
        let index = prompt('Enter the index of the side of the football that you want to view:');
        if (index > -1 && index < this.sideBall.length){
            this.selectedSideBall = this.sideBall[index];
            let description = 'Side of the football: ' + this.selectedSideBall.offdef + '\n';
            description += ' ' + this.selectedSideBall.describe() + '\n';
            for (let i = 0; i < this.selectedSideBall.players.length; i++){
                description += '        ' + i + ') ' + this.selectedSideBall.players[i].describe() + '\n';
            }
            let selection1 = this.showSideBallMenuOptions(description);
            switch (selection1){
                case '1' :
                    this.createPlayer();
                    break;
                case '2' :
                    this.deletePlayer();
            }
        }
    }
    deleteSide(){
        let index = prompt('Enter the index of the side of the football you wish to remove: ');
        if (index > -1 && index < this.sideBall.length){
            this.sideBall.splice(index, 1);
        }
    }
    createPlayer(){
        let name = prompt('Enter the name of the new prospect on your board: ');
        let position = prompt('Enter the position of the prospect: ');
        let home = prompt('Enter the city and state that the prospect is from: ')
        this.selectedSideBall.addScoutedPlayer(new ScoutedPlayer(name, position, home));
    }
    deletePlayer(){
        let index = prompt('Enter the index of the prospect you wish to remove from your board: ');
        if (index > -1 && index < this.selectedSideBall.players.length){
            this.selectedSideBall.players.splice(index, 1);
        }
    }
}
/*
new object that initializes the menu process with start method
*/
let menu = new Menu();
menu.start();