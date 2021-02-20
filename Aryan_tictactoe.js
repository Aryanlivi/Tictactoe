import _, { curryRight } from "lodash"
const SIZE = 100;
const winCondtions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [2, 5, 8], [1, 4, 7]]

class Board {
    places = [];
    value = "X";
    lock = false;
    empty_place = [];
    end_count = 0;
    init() {
        let pos = 0;
        let state = "";
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                let temp = new Place();
                this.places.push(temp)
                temp.create(row, col, pos, state, (e) => this.onplaceclick(e));
                pos++;

            }
        }
    } //returns objects of places
    changeturn() {
        this.value = this.value == "X" ? "O" : "X";
        this.lock = this.lock == true ? false : true;
        this.empty_place = this.places.filter(e => e.state == "");
        console.log(this.empty_place)
        setTimeout(() => { this.checkWinner() }, 100);
    }
    onplaceclick(e) {
        let currentplace = e.target.holder;
        //console.log(currentplace.position)
        if (currentplace.state == "") {
            currentplace.draw(this.value, currentplace, this.lock, this.empty_place);
            this.changeturn();
        }
        if (this.lock == true) {
            currentplace.draw(this.value, currentplace, this.lock, this.empty_place);
            this.changeturn();
        }
    }
    checkWinner() {
        for (let counter = 0; counter < winCondtions.length; counter++) {
            const singleCondtion = winCondtions[counter];
            const place1 = this.places[singleCondtion[0]];
            const place2 = this.places[singleCondtion[1]];
            const place3 = this.places[singleCondtion[2]];
            //console.log(place1)
            if (place1.state != "" && place1.state == place2.state && place2.state == place3.state && place3.state == place1.state) {
                alert(place1.state + " Wins!!")
                this.reset();

            }
        }
        if (this.empty_place.length == 0 && this.end_count == 0) {    //at last when no place is left the empty_place array will have no length
            alert("Game Over");
            this.end_count++;
            this.reset();
        }
    }
    reset() {
        this.places.forEach((e) => e.state = "");
        this.places.forEach((e) => e.htmlelement.textContent = "");
        this.lock = false;
    }
}
class Place {
    state = "";
    htmlelement = null;
    create(row, column, position, state, clickfunction) {
        this.state = state;
        this.position = position;
        this.htmlelement = document.createElement("button");
        document.getElementById("div1").appendChild(this.htmlelement);
        this.htmlelement.style.top = SIZE * row + 150;
        this.htmlelement.style.left = SIZE * column + 450;
        this.htmlelement.style.height = SIZE;
        this.htmlelement.style.width = SIZE;
        this.htmlelement.style.position = "absolute";
        this.htmlelement.style.fontSize = 40 + "px";

        //this.htmlelement.textContent=pos;
        this.htmlelement.addEventListener("click", clickfunction);
        this.htmlelement.holder = this;
    }
    draw(value, currentplace, lock, empty_place) {
        if (value == "X") {
            currentplace.playerx(value, currentplace);
        }
        else if (value == "O") {
            currentplace.playero(value, currentplace, empty_place);
        }
        else { console.log("error") }
    }
    playerx(value, currentplace) {
        this.htmlelement.textContent = value;
        this.state = value;
    }
    playero(value, currentplace, empty_place) {
        
        let random_o = _.random(0, empty_place.length - 1);
        let pos_o = empty_place[random_o];
        //console.log(empty_place)
        //console.log(pos_o)
        if (pos_o == undefined) { console.log("no more places") }
        else {
            pos_o.htmlelement.textContent = value;
            pos_o.state = value;
        }
    }
}

const myboard = new Board();
myboard.init();