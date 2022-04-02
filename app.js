let currentColoe ="white";
let currentBoardCells=["board40", "board41", "board42", "board43"];
let currentPegCells = ["peg40", "peg41", "peg42", "peg43"]
let currentrow = 11;
let possibleColors = ["blue", "green", "red", "yellow", "orange", "pink"];
let isWon = false;

let cell1color, cell2color, cell3color, cell4color;
//possibole colore
let colors= {
    "#3EB559": "green","FFF56D": "yellow","FF1818": "red","5463FF": "blue","FF7BB0": "pink","FF8A5C": "orange"
}
let c1 , c2 , c3 , c4 
//  create randome colore code by choosing random decimel 
// between 0 and 5 and floor it
 c1 = possibleColors[Math.floor(Math.random() * 6)];
 c2= possibleColors[Math.floor(Math.random() * 6)];
 c3 = possibleColors[Math.floor(Math.random() * 6)];
 c4 = possibleColors[Math.floor(Math.random() * 6)];

code = [c1, c2, c3, c4];
console.log(code);

let board=document.getElementById('board');
let pegs=document.getElementById('pegs');

// create the cells on the board

for(let i=0 ; i<44;i++){
    let cell=document.createElement("div")
    cell.className="boardCell";
    cell.setAttribute("id",`board${i}`);
    board.appendChild(cell);
}

//create the pegs on the board
for(let i=0 ;i<44; i++){
    let cell=document.createElement("div")
    cell.className="pegCell";
cell.setAttribute("id",`peg${i}`)
    pegs.appendChild(cell);
}

$(".color").each(function(){
    //set the color of the cell to its ID
    let color = $(this).attr("id");
    $(this).css("background-color", color);
});

$(".color").click(function(){
    let color = $(this).attr("id");
    currentColor = color;
    $(".currentColor").css("background-color", color);
});

$(".boardCell").click(function(){
    var id = $(this).attr("id");

    if(isValid(id)){
        $(this).css("background-color", currentColor);
    }
});

// submit.onclick=submitFunction ;
function clickFunction(){
    updatePegs();
        checkWin();
        changeCurrentrow();
        console.log("check if the function excute ?");
}
//move to the next row 
function changeCurrentrow(){
    currentrow -= 1;
//multiplier value to account for four rows in four cells in each row ide's
    var multiplier = 4;
// to change the valid row cellsboard
    currentBoardCells = [
// the cells for the player is currently playing it         
        "board" + (currentrow*multiplier-4), 
        "board" + (currentrow*multiplier-3), 
        "board" + (currentrow*multiplier-2), 
        "board" + (currentrow*multiplier-1)];
 // to change the valid row pegscells
    currentPegCells = [

        "peg" + (currentrow*multiplier-4), 
        "peg" + (currentrow*multiplier-3), 
        "peg" + (currentrow*multiplier-2), 
        "peg" + (currentrow*multiplier-1)];
}

function isValid(id){
    if(currentBoardCells.includes(id) && isWon === false){
        return true;
    }
    return false;
}

 //check if the player has won

 function checkWin(){
    if(code[0] === cell1color &&
        code[1] === cell2color &&
        code[2] === cell3color &&
        code[3] === cell4color){
       isWon = true;
        alert("Congratulations, you have won!\nThe code will now be displayed.");



      let secretcolor1=  document.getElementById('secretcolor1');
      secretcolor1.style.backgroundColor=code[0];
      let secretcolor2=  document.getElementById('secretcolor2');
      secretcolor2.style.backgroundColor=code[1];
      let secretcolor3=  document.getElementById('secretcolor3');
      secretcolor3.style.backgroundColor=code[2];
      let secretcolor4=  document.getElementById('secretcolor4');
      secretcolor4.style.backgroundColor=code[3];

    }

    return isWon; 
}

function updatePegs(){
    let cell1= document.getElementById(currentBoardCells[0]);
    let cell2= document.getElementById(currentBoardCells[1]);
    let cell3= document.getElementById(currentBoardCells[2]);
    let cell4= document.getElementById(currentBoardCells[3]);

    cell1Color = colors[cell1.style.backgroundColor];
    cell2Color = colors[cell2.style.backgroundColor];
    cell3Color = colors[cell3.style.backgroundColor];
    cell4Color = colors[cell4.style.backgroundColor];
    


    let peg1 = document.getElementById(currentPegCells[0]);
    let peg2 = document.getElementById(currentPegCells[1]);
    let peg3 = document.getElementById(currentPegCells[2]);
    let peg4 = document.getElementById(currentPegCells[3]);

    let pegs = [peg1, peg2, peg3, peg4];

   
    let filledPegs = [];
    let chosenCells = [];
    let code2 = [...code];

    if(code[0] === cell1Color){
        //choose a random peg that has not yet been filled
        let num = randomNum14(filledPegs);
        filledPegs.push(num);

        //remove the color from code2 because it has
        let index = code2.indexOf(cell1Color);
        if(index > -1){
            code2.splice(index, 1);
        }

        //add number to choseCells to state that this cell
        chosenCells.push(1);

        //fill the according peg
        pegs[num-1].style.backgroundColor="red";
    }
    if(code[1] === cell2Color){
        let num = randomNum14(filledPegs);
        filledPegs.push(num);

        //remove the color from code2 because it has
        let index = code2.indexOf(cell2Color);
        if(index > -1){
            code2.splice(index, 1);
        }

        chosenCells.push(2);

        // pegs[num-1].css("background-color", "red");
        pegs[num-1].style.backgroundColor="red";
    }
    if(code[2] === cell3Color){
        let num = randomNum14(filledPegs);
        filledPegs.push(num);

        //remove the color from code2 because it has
        //  already been accounted for
        let index = code2.indexOf(cell3Color);
        if(index > -1){
            code2.splice(index, 1);
        }

        chosenCells.push(3);

        pegs[num-1].style.backgroundColor="red";
    }
    if(code[3] === cell4Color){
        let num = randomNum14(filledPegs);
        filledPegs.push(num);

        //remove the color from code2 because it has
        let index = code2.indexOf(cell4Color);
        if(index > -1){
            code2.splice(index, 1);
        }

        chosenCells.push(4);

        pegs[num-1].style.backgroundColor="red";
    }


    if(code2.includes(cell1Color) && !chosenCells.includes(1)){
        //choose a random peg that has not yet been filled
        let num = randomNum14(filledPegs);
        filledPegs.push(num);

        //fill the according peg
        pegs[num-1].style.backgroundColor="white";
    }       
    if(code2.includes(cell2Color) && !chosenCells.includes(2)){
        //choose a random peg that has not yet been filled
        let num = randomNum14(filledPegs);
        filledPegs.push(num);

        //fill the according peg
        pegs[num-1].style.backgroundColor="white";
    }    
    if(code2.includes(cell3Color) && !chosenCells.includes(3)){
        //choose a random peg that has not yet been filled
        let num = randomNum14(filledPegs);
        filledPegs.push(num);

        //fill the according peg
        pegs[num-1].style.backgroundColor="white";
    }    
    if(code2.includes(cell4Color) && !chosenCells.includes(4)){
        let num = randomNum14(filledPegs);
        filledPegs.push(num);

        pegs[num-1].style.backgroundColor="white";
    }  
}

let check= document.getElementById('check');
check.addEventListener('click',clickFunction);

function randomNum14(nums){
    let num = Math.floor(Math.random()*4) + 1;
    while(nums.includes(num)){
        num = Math.floor(Math.random()*4) + 1;
    }
    return num;
}