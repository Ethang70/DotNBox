// Game Variables
const max = 4 // Dimension of the game board Max x Max
let maxTurns = (max * (max + 1)*2); // Max number of turns possible
let turn = 0; // Number of turns taken
let currentPlayer = 0; // Player 1 or 2
let player1Score = 0;
let player2Score = 0;
let boxCompleted = false

function checkBox(row, col) { 
    // Check if all lines of a box is claimed
    var lineV1 = document.getElementById('V' + row + '-' + col);
    var lineV2 = document.getElementById('V' + row + '-' + (+col + 1));
    var lineH1 = document.getElementById('H' + row + '-' + col);
    var lineH2 = document.getElementById('H' + (+row + 1) + '-' + col);
    var count = 0;
    
    if (!(lineV1.className == 'lineV')){
        count++;
    }
    if (!(lineV2.className == 'lineV')){
        count++;
    }
    if (!(lineH1.className == 'lineH')){
        count++;
    }
    if (!(lineH2.className == 'lineH')){
        count++;
    }
    console.log(row + col + "c: " + count);
    if (count == 4){
        var box = document.getElementById('B' + row + '-' + col);
        if (currentPlayer % 2 == 0){
            box.className = 'boxP1';
            player1Score++;
        } else {
            box.className = 'boxP2';
            player2Score++;
        }
        boxCompleted = true;
    }
}

// Function to claim a line
function claim(){
    // Determine if line is Horizontal or Vertical
    row = this.dataset.row
    col = this.dataset.col

    if (this.className == 'lineH'){
        if (currentPlayer % 2 == 0){ // Depending on player, change line colour
            this.className = 'lineHP1';
        } else {
            this.className = 'lineHP2';
        }
        if(row < max){
        checkBox(row, col);
        }
        if(row > 0){
        checkBox(row - 1, col);
        }   
    } else if (this.className == 'lineV'){
        if (currentPlayer % 2 == 0){
            this.className = 'lineVP1';
        } else {
            this.className = 'lineVP2';
        }

        if(col < max){
        checkBox(row, col);
        }
        if(col > 0){
        checkBox(row, col - 1);
        }
    } else { // Return if line is already claimed
        return;
    }   
    turn++;

    if (boxCompleted == false){
        currentPlayer++;
    } else {
        boxCompleted = false;
    }

    if (turn == maxTurns){
        if (player1Score > player2Score){
            alert('Player 1 wins! ' + player1Score + ' - ' + player2Score);
        } else if (player1Score < player2Score){
            alert('Player 2 wins! ' + player1Score + ' - ' + player2Score);
        } else {
            alert('It is a draw!');
        }
    }
}

function drawBoard(max){
    // To generate each row of the game board
    for (let j = 0; j < max; j++) { 
        const row = document.createElement('div'); // Div to contain the row
        row.className = 'flex-container';

            // To generate each tile of the row
            for (let i = 0; i < max; i++) { 
                const tile = document.createElement('div'); // Div for each tile which has 3 sub rows
                tile.className = 'tile';

                // Top Sub Row
                const flexContainer1 = document.createElement('div');
                flexContainer1.className = 'flex-container';

                const dot1 = document.createElement('div');
                dot1.className = 'dot';

                const lineH1 = document.createElement('div');
                lineH1.className = 'lineH';
                lineH1.addEventListener('click', claim)
                lineH1.id = 'H' + j + '-' + i;
                lineH1.dataset.row = j;
                lineH1.dataset.col = i;

                flexContainer1.appendChild(dot1);
                flexContainer1.appendChild(lineH1);
                
                // Middle Sub Row
                const flexContainer2 = document.createElement('div');
                flexContainer2.className = 'flex-container';

                const lineV = document.createElement('div');
                lineV.className = 'lineV';
                lineV.addEventListener('click', claim)
                lineV.id = 'V' + j + '-' + i;
                lineV.dataset.row = j;
                lineV.dataset.col = i;

                const box = document.createElement('div');
                box.className = 'box';
                box.id = 'B' + j + '-' + i;

                flexContainer2.appendChild(lineV);
                flexContainer2.appendChild(box);
                
                // Adds extra dot and line for last tile of each row
                if (i == max - 1){
                    const dot2 = document.createElement('div');
                    dot2.className = 'dot';
                    flexContainer1.appendChild(dot2);

                    const lineV2 = document.createElement('div');
                    lineV2.className = 'lineV';
                    lineV2.addEventListener('click', claim)
                    lineV2.id = 'V' + j + '-' + max;
                    lineV2.dataset.row = j;
                    lineV2.dataset.col = max;
                    flexContainer2.appendChild(lineV2);
                }

                tile.appendChild(flexContainer1);
                tile.appendChild(flexContainer2);

                // Bottom Sub Row ONLY when last row
                if (j == max - 1){
                    const flexContainer3 = document.createElement('div');
                    flexContainer3.className = 'flex-container';
    
                    const dot2 = document.createElement('div');
                    dot2.className = 'dot';
    
                    const lineH2 = document.createElement('div');
                    lineH2.className = 'lineH';
                    lineH2.addEventListener('click', claim)
                    lineH2.id = 'H' + max + '-' + i;
                    lineH2.dataset.row = max;
                    lineH2.dataset.col = i;
    
                    flexContainer3.appendChild(dot2);
                    flexContainer3.appendChild(lineH2);
                    
                    tile.appendChild(flexContainer3);
                    
                    // Adds extra dot for last tile in last row
                    if (i == max - 1){
                        const dot3 = document.createElement('div');
                        dot3.className = 'dot';
                        flexContainer3.appendChild(dot3);
                    }
                }
                row.appendChild(tile);
            }

        gameSpace.appendChild(row);
    }   
}


document.addEventListener("DOMContentLoaded", function() {
    const gameSpace = document.getElementById('gameSpace');
    drawBoard(max);
});