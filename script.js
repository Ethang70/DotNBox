document.addEventListener("DOMContentLoaded", function() {
    const gameSpace = document.getElementById('gameSpace');
    const max = 3

    // To generate each row of the game board
    for (let j = 0; j < max; j++) { 
        const row = document.createElement('div'); // Div to contain the row
        row.className = 'flex-container';

            // To generate each tile of the row
            for (let i = 0; i < 3; i++) { 
                const tile = document.createElement('div'); // Div for each tile which has 3 sub rows
                tile.className = 'tile';

                // Top Sub Row
                const flexContainer1 = document.createElement('div');
                flexContainer1.className = 'flex-container';

                const dot1 = document.createElement('div');
                dot1.className = 'dot';

                const lineH1 = document.createElement('div');
                lineH1.className = 'lineH';

                flexContainer1.appendChild(dot1);
                flexContainer1.appendChild(lineH1);
                
                // Middle Sub Row
                const flexContainer2 = document.createElement('div');
                flexContainer2.className = 'flex-container';

                const lineV = document.createElement('div');
                lineV.className = 'lineV';

                const box = document.createElement('div');
                box.className = 'box';

                flexContainer2.appendChild(lineV);
                flexContainer2.appendChild(box);
                
                // Adds extra dot and line for last tile of each row
                if (i == max - 1){
                    const dot2 = document.createElement('div');
                    dot2.className = 'dot';
                    flexContainer1.appendChild(dot2);

                    const lineV2 = document.createElement('div');
                    lineV2.className = 'lineV';
                    flexContainer2.appendChild(lineV2);
                }

                tile.appendChild(flexContainer1);
                tile.appendChild(flexContainer2);

                // Bottom Sub Row only when last row
                if (j == max - 1){
                    const flexContainer3 = document.createElement('div');
                    flexContainer3.className = 'flex-container';
    
                    const dot2 = document.createElement('div');
                    dot2.className = 'dot';
    
                    const lineH2 = document.createElement('div');
                    lineH2.className = 'lineH';
    
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
});