import _ from "lodash" //importing lodash fot use of random 
const SIZE = 100;//this is for position of buttons
const WINCONDITIONS = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];//all the winconditions

class Board {//creating a board class
    places = [];//stores all the Place objects i.e buttons.
    value = "X";//initial value .
    lock = false;//the user clicks only work when lock is false.
    empty_place = [];//creates array of empty places left.
    end_count = 0;//random variable used to indicate alert("Game end")
    init() {//initialization func
        let pos = 0;//this is position of every button
        let state = "";//state of every button
        for (let row = 0; row < 3; row++) {//creating 3 rows
            for (let col = 0; col < 3; col++) {//creating 3 cols and hence 3x3 
                let temp = new Place();//temp is an object of Place class.
                this.places.push(temp);//adding all button object in  one array named places
                temp.create(row, col, pos, state, (e) => this.onplaceclick(e));//create function(row,column,position,clickfunction)
                pos++;//for specifying  position property of every button
            }
        }
    }
    changeturn() {//func to change value, lock, and reset empty_place and also checkswinner.
        this.value = this.value == "X" ? "O" : "X";//change x to o and viceversa
        this.lock = this.lock == true ? false : true;//change lock true to false and vicecersa
        this.empty_place = this.places.filter(e => e.state == "");//extracting all elements in places array (i.e containing button objects ) that is empty.
        setTimeout(() => { this.checkWinner() }, 100);//waits 1 sec for execution
    }
    onplaceclick(e) {//when button is clicked
        let currentplace = e.target.holder;//to specify which button is clicked
        if (currentplace.state == "") {//if clicked button  is empty then:
            this.thesound();
            currentplace.draw(this.places, this.value, currentplace, this.lock, this.empty_place);// draw(places, value, currentplace, lock, empty_place) 
            this.changeturn();//changing turn
        }
        if (this.lock == true) {//for O
            this.thesound();
            currentplace.draw(this.places, this.value, currentplace, this.lock, this.empty_place);// draw(places, value, currentplace, lock, empty_place) 
            this.changeturn();//changing turn
        }
    }
    checkWinner() {//checks winner
        for (let counter = 0; counter < WINCONDITIONS.length; counter++) {
            const SINGLECONDITION = WINCONDITIONS[counter];// extracts subarrays of WINCONDITIONS
            const PLACE1 = this.places[SINGLECONDITION[0]];//identifying the winconditions buttons
            const PLACE2 = this.places[SINGLECONDITION[1]];//identifying the winconditions buttons
            const PLACE3 = this.places[SINGLECONDITION[2]];//identifying the winconditions buttons
            if (PLACE1.state != "" && PLACE1.state == PLACE2.state && PLACE2.state == PLACE3.state && PLACE3.state == PLACE1.state) {
                alert(PLACE1.state + " Wins!!");//alerts
                this.reset();//resets board
            }
        }
        if (this.empty_place.length == 0 && this.end_count == 0) {    //at last when no place is left the empty_place array will have no length
            alert("GAME OVER");//alerts game over
            this.end_count++;//to make it execute only once
            this.reset();//reset board
        }
    }
    reset() {//resets everything in board
        this.places.forEach((e) => e.state = "");//changes state of all buttons  to ""
        this.places.forEach((e) => e.htmlelement.textContent = "");//changes text for all buttons to ""
        this.lock = false;//resets lock
    }
    thesound(){     
        this.sound=document.getElementById("MyAudio");
        this.sound.play();
    }
}
class Place {
    state = "";//initial state of buttons
    htmlelement = null;//to create button
    create(row, column, position, state, clickfunction) {//creates button
        this.state = state;//specifying state of every unique temp object i.button
        this.position = position;//specifying position of every unique temp object i.button
        this.htmlelement = document.createElement("button");//create button
        document.getElementById("div1").appendChild(this.htmlelement);//add button in div with id= div1
        //all styling of button:
        this.htmlelement.style.top = SIZE * row + 200;
        this.htmlelement.style.left = SIZE * column + 500;
        this.htmlelement.style.height = SIZE;
        this.htmlelement.style.width = SIZE;
        this.htmlelement.style.position = "absolute";
        this.htmlelement.style.fontSize = 40 + "px";
        this.htmlelement.addEventListener("click", clickfunction);//what happens when button is clicked
        this.htmlelement.holder = this;//=so that we can identify which button pressed
    }
    draw(places, value, currentplace, lock, empty_place) {//draw X and O.
        if (value == "X") {
            currentplace.playerx(value);//calls playerx(value) that draws X.
        }
        else if (value == "O") {
            currentplace.playero(places, value, empty_place);//calls playero(places, value, empty_place that draws O.
        }
    }
    playerx(value) {//draws X
        this.htmlelement.textContent = value;
        this.state = value;
    }
    think(think_pos, empty_place, value, count) {//takes best position to draw O and draws O.
        for (let counter = 0; counter < empty_place.length; counter++) {
            if (empty_place[counter].position == think_pos && count == 0) {//checks if the position of element in the empty_place matches the best position to draw O
                let think_pos_o = empty_place[counter];//stores best position that is empty to draw
                if (think_pos_o == undefined) {//codn for undefined
                    alert("GAME OVER");
                    MYBOARD.reset();//resets board
                }
                else {
                    think_pos_o.htmlelement.textContent = value;//draws O in best position
                    think_pos_o.state = value;
                    break;
                }
            }
        }
    }
    playero(places, value, empty_place) {//draws O
        let count = 0;
        for (let counter = 0; counter < WINCONDITIONS.length; counter++) {
            const SINGLECONDITION = WINCONDITIONS[counter];// extracts subarrays of WINCONDITIONS
            const PLACE1 = places[SINGLECONDITION[0]];//identifying the winconditions buttons
            const PLACE2 = places[SINGLECONDITION[1]];//identifying the winconditions buttons
            const PLACE3 = places[SINGLECONDITION[2]];//identifying the winconditions buttons
            const PLACE_ARRAY = [PLACE1, PLACE2, PLACE3];//array extracted from singlecondition of winning places
            const PLACE_ARRAY_PATTERN = [[0, 1, 2], [1, 2, 0], [2, 0, 1]]//pattern in which we want if else statement to work .... it is for automation.
            for (let loop = 0; loop < PLACE_ARRAY.length; loop++) {

                let index = PLACE_ARRAY_PATTERN[loop];//extracts subarray of place_array_pattern
                if (PLACE_ARRAY[index[0]].state == "O" && PLACE_ARRAY[index[0]].state == PLACE_ARRAY[index[1]].state && PLACE_ARRAY[index[2]].state == "") {
                    this.think(PLACE_ARRAY[index[2]].position, empty_place, value, count);//think (think_pos, empty_place, value, count)
                    count++;//so that it executes only once
                    break;
                }

            }
        }
        for (let counter = 0; counter < WINCONDITIONS.length; counter++) {
            const SINGLECONDITION = WINCONDITIONS[counter];// extracts subarrays of WINCONDITIONS
            const PLACE1 = places[SINGLECONDITION[0]];//identifying the winconditions buttons
            const PLACE2 = places[SINGLECONDITION[1]];//identifying the winconditions buttons
            const PLACE3 = places[SINGLECONDITION[2]];//identifying the winconditions buttons
            const PLACE_ARRAY = [PLACE1, PLACE2, PLACE3];//array extracted from singlecondition of winning places
            const PLACE_ARRAY_PATTERN = [[0, 1, 2], [1, 2, 0], [2, 0, 1]];//pattern in which we want if else statement to work .... it is for automation.

            for (let loop = 0; loop < PLACE_ARRAY.length; loop++) {
                let index = PLACE_ARRAY_PATTERN[loop];//extracts subarray of place_array_pattern
                if (PLACE_ARRAY[index[0]].state == "X" && PLACE_ARRAY[index[0]].state == PLACE_ARRAY[index[1]].state && PLACE_ARRAY[index[2]].state == "") {
                    this.think(PLACE_ARRAY[index[2]].position, empty_place, value, count);
                    count++;//so that it executes only once
                    break;
                }
            }

        }
        if (count == 0) {//only for start of game when O is yet to be placed
            let random_o=0;
            let pos_o=0;
            if (pos_o == undefined) {
                alert("GAME OVER");
                MYBOARD.reset();//resets board
            }
            else if(places[4].state=="X"){// (places[4] is the center) and  if player1 draws in the center the computer will draw in one of the corners.
                let corner_array=[places[0],places[2],places[6],places[8]];
                random_o=_.random(0,corner_array.length-1);
                pos_o= corner_array[random_o];
                pos_o.htmlelement.textContent = value;
                pos_o.state = value;
            }
            else if(places[4].state==""){// if player1 doesnt draw in the center the computer will draw in the center for higher chance of winning.
                pos_o= places[4];//places[4] is the center
                pos_o.htmlelement.textContent = value;
                pos_o.state = value;
            }
        }
    }
}

const MYBOARD = new Board();//MYBOARD is object of board class
MYBOARD.init();//calling initialization func to start game