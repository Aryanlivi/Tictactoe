import _, { values } from 'lodash'
const myDiv = document.getElementById("div2");


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
    newDiv.style.width = 5;
    newDiv.style.right = xPos;
    newDiv.style.bottom=20;
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
    div.style.height =_.random(50,100);
}


 
let sound=document.getElementById("MyAudio2");
sound.play();

const myAnim = () => {
    divs.forEach(a => changeHeight(a));
}


setInterval(myAnim, 1000 / 10);


//const button=document.getElementById('b1');
//button.addEventListener('click',kick);
//<button id="b1" type="button">Go</button>



