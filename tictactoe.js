import _ from 'lodash'
const SIZE = 50;
class Board {
    turn = "X";
    places = [];
    acceptInngInput=true;

    constructor() {
        //this.onplaceclick=this.onplaceclick.bind(this);
    }


    init() {
        let pos = 0;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                let temp = new Place()
                this.places.push(temp);
                temp.draw(row, col, (e) => {
                    this.onplaceclick(e);
                }, pos)
                pos++
            }
        }
        this.acceptInngInput=true;
    }

    reset()
    {
        this.places.forEach(a=>{
            a.state=''
            a.redraw('');
        });

    }

    checkWinner() {

        const winCondtions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [2, 5, 8], [1, 4, 7]]
        for (let counter = 0; counter < winCondtions.length; counter++) {
       
            const singleCondtion = winCondtions[counter];
            const place1 = this.places[singleCondtion[0]];
            const place2 = this.places[singleCondtion[1]];
            const place3 = this.places[singleCondtion[2]];

            if (place1.state == place2.state && place2.state == place3.state && place3.state == this.turn) {
                alert(this.turn + " Wins!!");
                this.reset();
                
            }
        }
        this.turn = this.turn == "X" ? "O" : "X"
        this.think();
    }

    think()
    {

        const empty=this.places.filter(e=>e.state=="")
        let pos=_.random(0,empty.length-1);
        let spot=empty[pos];
        spot.redraw(this.turn)

        
        this.acceptInngInput=true;
    }


    onplaceclick(e) {

        if(this.acceptInngInput==false)
        {
            return ;
        }

        const currentplace = e.target.holder;
        if (currentplace.state == '') {
            currentplace.redraw(this.turn);
            this.acceptInngInput=false;
           setTimeout(()=>{
               this.checkWinner();
           },200);
          
           
        }

    }
}
class Place {

    state = "";
    x = 0;
    y = 0;
    pos = -1;
    htmlelement = null;
    draw(row, col, clickfunction, pos) {
        this.pos = pos;
        this.htmlelement = document.createElement("button");
        document.getElementById("div1").appendChild(this.htmlelement);
        this.htmlelement.style.top = row * SIZE;
        this.htmlelement.style.left = col * SIZE;
        this.htmlelement.style.height = SIZE;
        this.htmlelement.style.width = SIZE;
        this.htmlelement.style.position = "absolute";
        //this.htmlelement.textContent=pos;
        this.htmlelement.addEventListener("click", clickfunction);
        this.htmlelement.holder = this;

    }
    redraw(turn) {

        this.htmlelement.textContent = turn;
        this.state = turn;

    }
}
const myboard = new Board();
myboard.init()