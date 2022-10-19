var reversi = {
    
    father: null,
    score: null,
    buttons:null,
    rows: 8,
    cols: 8,
    grid: [],
    states: {
        'blank': { 'id' : 0, 'color': 'white' },
        'white': { 'id' : 1, 'color': 'white' },
        'black': { 'id' : 2, 'color': 'black' }
    },
    playerColor:null,
    lastMoove:[],
    bestMoove:null,
    turn: null,
    enableHelp:null,
    //twoPlayers:true,
    
    init: function(selector) {
        //player é peça preta de inicio
        this.playerColor=  this.states.black.id
        
        this.father = document.getElementById(selector);
        
        
        if (null === this.father) {
            
            return;
        }
        
        
        this.father.className = (this.father.className ? this.father.className + ' ' : '') + 'reversi';
        
        
        // cria tabela
        this.prepareGrid();
        
        // inicia jogo 
        this.initGame();
    },
    
    initGame: function() {
        this.buttons.changeColor.elem.innerHTML = this.playerColor==this.states.black.id? "Jogar de Brancas":"Jogar de Pretas";
        // Pretas começam
        this.setTurn(this.states.black);

        
        
        // 4 peças iniciais
        this.setItemState(4, 4, this.states.white);
        this.setItemState(4, 5, this.states.black);
        this.setItemState(5, 4, this.states.black);
        this.setItemState(5, 5, this.states.white);
        
        // score inicial
        this.setScore(2, 2);
        //Bot pode começar
        if(this.turn.id!=this.playerColor){
            this.botPlays()
        }
    },
    
    passTurn: function() {
    
        var turn = (this.turn.id === this.states.black.id) ? this.states.white : this.states.black;
        
        this.setTurn(turn);
    },
    
    setTurn: function(state) {
        
        this.turn = state;
        
        var isBlack = (state.id === this.states.black.id);
        
        this.score.black.elem.style.textDecoration = isBlack ? 'underline': '';
        this.score.white.elem.style.textDecoration = isBlack ? '': 'underline';
    },

    botPlays:async function(){
        //Sleep para o bot não jogar rápido demais
        await new Promise(r => setTimeout(r, 2000));
        this.bestMoove= []
        //Find the best moove
        var maxPoints= this.bestMooveMaxMax();
        if (maxPoints>0){
            // this.grid[this.bestMoove[0]][this.bestMoove[1]].elem.style.visibility =   'visible' ;
            // this.grid[this.bestMoove[0]][this.bestMoove[1]].elem.style.backgroundColor = "blue";
            this.move(this.bestMoove[0],this.bestMoove[1])
        }
        
    },
    bestMooveMaxMax:function(){
        var maxPoints=0
        for (var i = 1; i <= this.rows; i++) {

            for (var j = 1; j <= this.cols; j++) {
                
                if (this.isValidMove(i, j)) {
                    var possible = this.getItensToChange(i,j)
                    if(possible.length + 1>maxPoints){
                        this.bestMoove= [i,j]
                        maxPoints= possible.length + 1
                    }
                }
            }
        }
        return maxPoints
    },

    
    
    initItemState: function(elem) {
        
        return {
            'state': this.states.blank,
            'elem': elem
        };
    },
    
    isVisible: function(state) {
        
        return (state.id === this.states.white.id || state.id === this.states.black.id);
    },
    
    isVisibleItem: function(row, col) {
        
        return this.isVisible(this.grid[row][col].state);
    },
    
    isValidPosition: function(row, col) {
        
        return (row >= 1 && row <= this.rows) && (col >= 1 && col <= this.cols);
    },
    
    setItemState: function(row, col, state) {

        if ( ! this.isValidPosition(row, col)) {
            
            return;
        }

        this.grid[row][col].state = state;
        this.grid[row][col].elem.style.visibility =  this.isVisible(state) ? 'visible' : 'hidden';
        this.grid[row][col].elem.style.backgroundColor = state.color;
        
    },
    
    prepareGrid: function() {
        
        // Tabela
        var table = document.createElement('table');
        
        // estilos
        table.setAttribute('border', 0);
        table.setAttribute('cellpadding', 0);
        table.setAttribute('cellspacing', 0);
        
        for (var i = 1; i <= this.rows; i++) {
            
            var tr = document.createElement('tr');
            
            table.appendChild(tr);
            
            this.grid[i] = [];
            
            for (var j = 1; j <= this.cols; j++) {
                
                var td = document.createElement('td');
                
                tr.appendChild(td);
                
                
                this.bindMove(td, i, j);
                
                
                this.grid[i][j] = this.initItemState(td.appendChild(document.createElement('span')));
            }
        }

        // barra de score
        var scoreBar = document.createElement('div'),
            scoreBlack = document.createElement('span'),
            scoreWhite = document.createElement('span');
            
        scoreBlack.className = 'score-node score-black';
        scoreWhite.className = 'score-node score-white';
        
        // score de cada cor
        scoreBar.appendChild(scoreBlack);
        scoreBar.appendChild(scoreWhite);
        
        
        this.father.appendChild(scoreBar);
        
        
        this.score = {
            'black': { 
                'elem': scoreBlack,
                'state': 0
            },
            'white': { 
                'elem': scoreWhite,
                'state': 0
            },
        }
        
        
        this.father.appendChild(table);

        //Botoes para trocar de cor
        var buttons= document.createElement('div'),
            changeColor= document.createElement('span'),
            restart= document.createElement('span');
        
        changeColor.className="score-node change-color"
        restart.className="score-node change-color"
        buttons.className="buttons"
        buttons.appendChild(changeColor)
        buttons.appendChild(restart)

        this.buttons = {
            'changeColor': { 
                'elem': changeColor,
                'state': 0
            },
            'restart': { 
                'elem': restart,
                'state': 0
            },
        }
        this.bindButtons()

        this.father.appendChild(buttons)



    },
    
    recalcuteScore: function()  {
        
        var scoreWhite = 0,
            scoreBlack = 0;
            
        for (var i = 1; i <= this.rows; i++) {

            for (var j = 1; j <= this.cols; j++) {
                
                if (this.isValidPosition(i, j) && this.isVisibleItem(i, j)) {
                    
                    if (this.grid[i][j].state.id === this.states.black.id) {
                        
                        scoreBlack++;
                    } else {
                        
                        scoreWhite++;
                    }
                }
            }
        }

        //Retira recomendação de movimento se não for escolhido
        if (this.bestMoove!=null&&!this.isVisibleItem(this.bestMoove[0], this.bestMoove[1])){
            this.grid[this.bestMoove[0]][this.bestMoove[1]].elem.style.visibility =   'hidden' ;
            this.grid[this.bestMoove[0]][this.bestMoove[1]].elem.style.backgroundColor = "";
        }
        
        this.setScore(scoreBlack, scoreWhite);
    },
    
    setScore: function(scoreBlack, scoreWhite) {
        
        this.score.black.state = scoreBlack;
        this.score.white.state = scoreWhite;
        
        this.score.black.elem.innerHTML = '&nbsp;' + scoreBlack + '&nbsp;';
        this.score.white.elem.innerHTML = '&nbsp;' + scoreWhite + '&nbsp;';
    },
    
    isValidMove: function(row, col) {
        
        var current = this.turn,
            rowCheck,
            colCheck,
            toCheck = (current.id === this.states.black.id) ? this.states.white : this.states.black;
            
        if ( ! this.isValidPosition(row, col) || this.isVisibleItem(row, col)) {
            
            return false;
        }
        
        // check all eight directions
        for (var rowDir = -1; rowDir <= 1; rowDir++) {
            
            for (var colDir = -1; colDir <= 1; colDir++) {
                
                // dont check the actual position
                if (rowDir === 0 && colDir === 0) {
                    
                    continue;
                }
                
                // move to next item
                rowCheck = row + rowDir;
                colCheck = col + colDir;
                
                // were any items found ?
                var itemFound = false;
                
                // look for valid items
                // look for visible items
                // look for items with opposite color
                while (this.isValidPosition(rowCheck, colCheck) && this.isVisibleItem(rowCheck, colCheck) && this.grid[rowCheck][colCheck].state.id === toCheck.id) {
                    
                    // move to next position
                    rowCheck += rowDir;
                    colCheck += colDir;
                    
                    // item found
                    itemFound = true; 
                }
                
                // if some items were found
                if (itemFound) {

                    // now we need to check that the next item is one of ours
                    if (this.isValidPosition(rowCheck, colCheck) && this.isVisibleItem(rowCheck, colCheck) && this.grid[rowCheck][colCheck].state.id === current.id) {
                        
                        // we have a valid move
                        return true;
                    }
                }
            }
        }
        
        return false;
    },
    
    canMove: function() {
        
        for (var i = 1; i <= this.rows; i++) {

            for (var j = 1; j <= this.cols; j++) {
                
                if (this.isValidMove(i, j)) {
                    
                    return true;
                }
            }
        }
        
        return false;
    },
    
    bindMove: function(elem, row, col) {
        
        var self = this;
        
        elem.onclick = function(event) {
            
            if (self.canMove()) {
                
                // if have a valid move
                if (self.isValidMove(row, col)) {

                    // make the move
                    self.move(row, col);
                    
                    // check whether the another player can now move, if not, pass turn back to other player
                    if ( ! self.canMove()) {
                        
                        self.passTurn();
                        
                        // check the end of the game
                        if ( ! self.canMove()) {

                            self.endGame();
                        }
                    }

                    // in case of full grid, end the game
                    if (self.checkEnd()) {

                        self.endGame();
                    }
                }
            }
        };
    },
    bindButtons: function(){
        self=this
        this.buttons.changeColor.elem.onclick= function(event){
            self.changeColor()
            
            self.reset();
        }
        this.buttons.restart.elem.innerHTML = 'Resetar Jogo';
        this.buttons.restart.elem.onclick= function(event){

            self.reset();
        }
    },
    changeColor(){
        this.playerColor =  this.playerColor==this.states.black.id? this.states.white.id: this.states.black.id
    },
    
    endGame: function() {
        
        var result = (this.score.black.state > this.score.white.state) 
            ? 
                1 
            : ( 
                (this.score.white.state > this.score.black.state) ? -1 : 0 
            ), message;
        
        switch (result) {
            
            case 1:  { message = 'Pretas ganharam'; } break;
            case -1: { message = 'Brancas ganharam'; } break;
            case 0:  { message = 'Emmpate'; } break;
        }
        
        alert(message);
        
        // recomeça
        this.reset();
    },
    
    clear: function() {
        
        for (var i = 1; i <= this.rows; i++) {

            for (var j = 1; j <= this.cols; j++) {
                
                this.setItemState(i, j, this.states.blank);
            }
        }
    },
    
    reset: function() {

        // clear items
        this.clear();
        
        // reinit game
        this.initGame();
    },
    
    checkEnd: function(lastMove) {
        
        for (var i = 1; i <= this.rows; i++) {

            for (var j = 1; j <= this.cols; j++) {
                
                if (this.isValidPosition(i, j) && ! this.isVisibleItem(i, j)) {
                    
                    return false;
                }
            }
        }
        
        return true;
    },
    getItensToChange: function(row,col){
        var finalItems = [],
            current = this.turn,
            rowCheck,
            colCheck,
            toCheck = (current.id === this.states.black.id) ? this.states.white : this.states.black;
        // checa em todas as direções
        for (var rowDir = -1; rowDir <= 1; rowDir++) {
            
            for (var colDir = -1; colDir <= 1; colDir++) {
                
                //não olhar a posicao atual
                if (rowDir === 0 && colDir === 0) {
                    
                    continue;
                }
                
                
                rowCheck = row + rowDir;
                colCheck = col + colDir;
                
                
                var possibleItems = [];

                //Posições que podem ser alteradas
                while (this.isValidPosition(rowCheck, colCheck) && this.isVisibleItem(rowCheck, colCheck) && this.grid[rowCheck][colCheck].state.id === toCheck.id) {
                    
                    possibleItems.push([rowCheck, colCheck]);
                    
                    
                    rowCheck += rowDir;
                    colCheck += colDir;
                }
                
                
                if (possibleItems.length) {

                    
                    if (this.isValidPosition(rowCheck, colCheck) && this.isVisibleItem(rowCheck, colCheck) && this.grid[rowCheck][colCheck].state.id === current.id) {
                        
                        
                        finalItems.push([row, col]);
                        for (var item in possibleItems) {
                            
                            finalItems.push(possibleItems[item]);
                        }
                    }
                }
            }
        }
        return finalItems;
    },

    move: function(row, col) {
        var current = this.turn
        var toCheck = (current.id === this.states.black.id) ? this.states.white : this.states.black;
        if(this.lastMoove.length!=0){
            this.grid[this.lastMoove[0]][this.lastMoove[1]].elem.style.borderRadius = "";
        }
        
        var finalItems= this.getItensToChange(row,col)
        
        
        
        
        // altera cores
        if (finalItems.length) {
            
            for (var item in finalItems) {
                
                this.setItemState(finalItems[item][0], finalItems[item][1], current);
            }
        }

        //Peça colocada fica diferente para ajudar na visualização
        this.grid[row][col].elem.style.borderRadius = "10px";
        this.lastMoove=[row,col]
        
        // passa turno para o outro
        this.setTurn(toCheck);
        
        
        this.recalcuteScore();
        //Bot joga depois do jogador

        if(this.turn.id!=this.playerColor){
            this.botPlays()
        }
        
    }
};