import _ from "lodash"
const SIZE = 100;
const winCondtions = [[0, 1, 2],[0, 4, 8],[0, 3, 6],[1, 4, 7],[2, 4, 6],[2, 5, 8],[3, 4, 5], [6, 7, 8]];


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
                this.places.push(temp);
                temp.create(row, col, pos, state, (e) => this.onplaceclick(e));
                pos++;
            }
        }
    } //returns objects of places
    changeturn() {
        this.value = this.value == "X" ? "O" : "X";
        this.lock = this.lock == true ? false : true;
        this.empty_place = this.places.filter(e => e.state == "");
        setTimeout(() => { this.checkWinner() }, 100);
    }
    onplaceclick(e) {
        let currentplace = e.target.holder;
        if (currentplace.state == "") {
            currentplace.draw(this.places,this.value, currentplace, this.lock, this.empty_place);
            this.changeturn();
        }
        if (this.lock == true) {
            currentplace.draw(this.places,this.value, currentplace, this.lock, this.empty_place);
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
                alert(place1.state + " Wins!!");
                this.reset();
            }
        }
        if (this.empty_place.length == 0 && this.end_count == 0) {    //at last when no place is left the empty_place array will have no length
            alert("GAME OVER");
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
    draw(places,value, currentplace, lock, empty_place) {
        if (value == "X") {
            currentplace.playerx(value);
        }
        else if (value == "O") {
            currentplace.playero(places,value,empty_place);
        }
       
    }
    playerx(value) {
        this.htmlelement.textContent = value;
        this.state = value;
    }
    think(think_pos,empty_place,value,count){
        for(let counter=0;counter<empty_place.length;counter++){
            if (empty_place[counter].position==think_pos && count==0){
                let think_pos_o = empty_place[counter];
                if (think_pos_o == undefined) {
                    alert("GAME OVER");
                    myboard.reset();
            }
                else {
                    think_pos_o.htmlelement.textContent = value;
                    think_pos_o.state = value;
                    break;
                }
            }
        }

        }
    playero(places,value,empty_place) {
        let count=0;
        for (let counter = 0; counter < winCondtions.length; counter++) {
            const singleCondtion = winCondtions[counter];
            const place1 = places[singleCondtion[0]];
            const place2 = places[singleCondtion[1]];
            const place3 = places[singleCondtion[2]];
            const place_array=[place1,place2,place3];//6,7,8
            const place_array_pattern=[[0,1,2],[1,2,0],[2,0,1]]
            for(let loop=0;loop<place_array.length;loop++){
        
                let index=place_array_pattern[loop];//0,1,2 ; place1.state - p1.s!=p2.s
                if(place_array[index[0]].state=="O" && place_array[index[0]].state==place_array[index[1]].state && place_array[index[2]].state=="")
                {
                    this.think(place_array[index[2]].position,empty_place,value,count);
                    count++;
                    break;
                }
                
            }
        }
        for (let counter = 0; counter < winCondtions.length; counter++) {
            const singleCondtion = winCondtions[counter];
            const place1 = places[singleCondtion[0]];
            const place2 = places[singleCondtion[1]];
            const place3 = places[singleCondtion[2]];
            const place_array=[place1,place2,place3];//6,7,8
            const place_array_pattern=[[0,1,2],[1,2,0],[2,0,1]];

            for(let loop=0;loop<place_array.length;loop++){
                let index=place_array_pattern[loop];
                if(place_array[index[0]].state=="X" && place_array[index[0]].state==place_array[index[1]].state && place_array[index[2]].state==""){
                    this.think(place_array[index[2]].position,empty_place,value,count);
                    count++;
                    break;
                }
            }
            
        } 
        if(count==0){
            let random_o = _.random(0, empty_place.length - 1);
            let pos_o = empty_place[random_o];
            if (pos_o == undefined) {
               return;
            }
            else {
                pos_o.htmlelement.textContent = value;
                pos_o.state = value;
            }
        }
    }
}

const myboard = new Board();
myboard.init();