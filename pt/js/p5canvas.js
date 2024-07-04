let myName = 'KAUÊ WERNER'
let mainFont = 'Courier Prime'
let fontSize = 25;
let flagButton = true, flagMove = false, flagCreateButton = true, flagCircles = false;
let letters = [];
let numberOfRepetitions = 10;
let t = 0, dt = 0.01;
let letterPositioning = 'grid';
let buttons = [];
let initialPosition = [];
let mainCanvas;
let currentBtnPosition = {x: 0 , y: 0};
let buttonParameters = {
    link: ['#about',
            '#soundbasedportfolio',
            '#researchandwork',
            '#otherstuff',
            // '../index.html'
        ],
    name: ['SOBRE',
            'PORTFOLIO SÔNICO',
            'PERQUISA <---> TRABALHO',
            'OUTRO',
            // 'EN'
        ],
    position: {
        x: [0, 0, 0],
        y: [1,3,5,7,9]
    }
};
let moreLink;
let backgroundColor, lineColor, boxColor;

function setup(){
    mainCanvas = createCanvas(windowWidth, windowHeight);
    mainCanvas.style('width','100%');
    mainCanvas.style('height','auto');
    mainCanvas.parent('p5-canvas');
    textSize(fontSize);
    textFont(mainFont);
    frameRate(24);

    writeColor = color(240, 255); 
    backgroundColor = color(255, 255);
    lineColor = color(25, 255);
    boxColor = color(200, 255);

    init();
}

function init(){
    background(backgroundColor);
    noStroke();
    fill(200);
    let letterColor;
    let pos;
    for(let idx = 0; idx < myName.length; idx++){
        for(let r = 0; r < numberOfRepetitions; r ++)
        {
            if (r == 1)
                letterColor = writeColor;
            else
                letterColor = boxColor;
            switch(letterPositioning){
                case 'random':
                    pos = {
                        x: windowWidth*(Math.random()),
                        y: height*(Math.random())
                    };

                break;
                case 'grid':
                    pos = {
                        x: fontSize + windowWidth*r/(numberOfRepetitions),
                        y: fontSize + height*idx/(myName.length),
                    };
                break;
            }
            initialPosition.push({x: pos.x, y: pos.y});
            let tempName;
            if (r == 1){
                if(myName[idx] != ' '){
                    tempName = myName[idx];
                    letters.push(new LetterElement(tempName,pos,lineColor,letterColor));
                }  
            }
            else
                tempName = ' ';
            // letters.push(new LetterElement(tempName,pos,lineColor,letterColor));
        }
    }
    if(flagCreateButton)
        createAllLinkButtons();
}

function createAllLinkButtons(){

    for(let idx = 0; idx < buttonParameters.link.length; idx++){
        buttons.push(createA(buttonParameters.link[idx],buttonParameters.name[idx]));
        buttons[idx].class("btn btn-default btn-lg page-scroll");
        buttons[idx].elt.id = "button_"+idx.toString();
        buttons[idx].style('color',color(lineColor));
        buttons[idx].style('text-decoration',"none");
        buttons[idx].style('background-color', writeColor);
        buttons[idx].position(0.5*windowWidth - buttons[idx].width/2, buttonParameters.position.y[idx]*windowHeight/(myName.length));
        buttons[idx].mouseOver(activateMovement);
        buttons[idx].mouseOut(resetMovement);       
    }
}

function activateMovement(){
    flagMove = true;
    highlightButton(this);
}

function resetMovement(){
    flagMove = false;
    resetButton(this);
}

function highlightButton(button){
    button.style('background-color',color(lineColor));
    button.style('color',color(writeColor));
    button.position(0.5*windowWidth - button.elt.width/2, button.position.y);
    currentBtnPosition.x = button.position().x;
    currentBtnPosition.y = button.position().y;
    buttons.forEach(element => {
        if(element != button)
            element.style('color', color(boxColor));
    });
    flagCircles = true;
}

function resetButton(button){
    button.style('background-color',writeColor);
    button.style('color',color(lineColor));
    button.position(0.5*windowWidth - button.elt.width/2, button.position.y);
    buttons.forEach(element => {
        if(element != button)
        element.style('color', color(lineColor));
    });
    flagCircles = false;
}

function updateCanvas(){
    background(backgroundColor);
    fill(boxColor);
    stroke(200);
    for(let idx = 0; idx < initialPosition.length; idx++){
        if( idx%10 == 0 ){
            line(initialPosition[idx].x,initialPosition[idx].y,initialPosition[idx].x + windowWidth,initialPosition[idx].y)
            ellipse(initialPosition[idx + 1].x,initialPosition[idx + 1].y,5);
        }
    }
    stroke(lineColor);
    line(fontSize + windowWidth/2 + random(10), windowHeight, fontSize + windowWidth/2 + random(10), 0);
    if(flagCircles)
    {
        noStroke();
        fill(200,200);
        for(let idx = 0; idx < 100; idx++){
            rect(currentBtnPosition.x - fontSize + random(8*fontSize),currentBtnPosition.y - fontSize + random(4*fontSize),random(windowWidth/40));
        }   
    }

    noStroke();
    fill(writeColor);
    letters.forEach(element => {
        element.updateRandomFluctuation(t);
    });
    if(t > 100000){
        t = 0;
    } else {
        t += dt;
    }
    if(flagMove)
        moveLetters();
    else
        resetLetters();
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    letters = [];
    initialPosition = [];
    flagCreateButton = false;
    for(let idx = 0; idx < buttons.length; idx++){
        buttons[idx].position(0.5*windowWidth - buttons[idx].width/2, buttonParameters.position.y[idx]*windowHeight/(myName.length));
    }
        
    init();
}

function draw(){
    updateCanvas();
}

function moveLetters(){
    let newPosition = {
        x: mouseX,
        y: mouseY
    };
    // let tempColor = color(20*random(),200 + 55*random(),20*random(),100);
    letters.forEach(element => {
        element.updateCurrentPosition(newPosition, 50, 50, boxColor);
    });
}

function resetLetters()
{
    let tempColor;
    letters.forEach(element => {
        if(element.letter == ' ')
            tempColor = color(boxColor);
        else 
            tempColor = color(lineColor);
        element.updateCurrentPosition(element.initialPosition, 50, 50, tempColor);
    });
}



