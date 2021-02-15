import _ from 'lodash'
const myDiv = document.getElementById("div1");


/**
 * 
 * @param {number} xPos its the x position of the bar 
 * @param {string} color its the color of the bar
 */
const divs = [];
const addABar = (xPos, color) => {
    const newDiv = document.createElement('div');
    newDiv.style.position = 'absolute';
    newDiv.style.height = 200;
    newDiv.style.width = 20;
    newDiv.style.left = xPos;
    newDiv.style.backgroundColor = color
    myDiv.appendChild(newDiv);
    divs.push(newDiv);

}

const no_of_bars = 10;
const colors = ['#ffdead', '#ff0000', 'green', 'yellow', 'cyan', 'blue', "pink", "grey", "violet", "orange"]
for (let counter = 0; counter < no_of_bars; counter++) {
    addABar(counter * 20, colors[counter]);
}

const changeHeight = (div) => {
    div.style.height = _.random(50, 100);

}

const myAnim = () => {

    divs.forEach(a => changeHeight(a))
};

const kick=()=>{
    setInterval(myAnim, 1000 / 10);
}

const button=document.getElementById('b1');
button.addEventListener('click',kick);

//<button id="b1" type="button">Go</button> \
//<div id="div1"></div>

