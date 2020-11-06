import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
    _squares: any[];
    _xIsNext: boolean;
    _winner: string;
    /**
     * _gameMode = 0 for player vs player
     * _gameMode = 1 for player vs simple AI (random move)
     * _gameMode = 2 for player vs smart AI (always wins or draws)
     */
    _gameMode: number;
    _scoreDraw: number;
    _scorePlayerO: number;
    _scorePlayerX: number;

    constructor() { }

    ngOnInit(): void {
        this._scoreDraw = 0;
        this._scorePlayerO = 0;
        this._scorePlayerX = 0;
        this.newGame(0);
    }

    /**
     * Clears and resets the board for new game
     * 
     * idx = 0 for player vs player
     * 
     * idx = 1 for player vs simple AI (random move)
     * 
     * idx = 2 for player vs smart AI (always wins or draws)
     * @param idx sets gamemode
     */
    newGame(idx: number) {
        this._squares = Array(9).fill(null);
        this._winner = null;
        this._xIsNext = true;
        this._gameMode = idx;
    }

    /**
     * GETTER for player
     * 
     * @returns this._xIsNext ? 'X' : 'O'
     */
    get player() {
        return this._xIsNext ? 'X' : 'O';
    }

    /**
     * @param idx board idx (this._squares)
     */
    makeMove(idx: number) {
        if (!this._squares[idx] && !this._winner) {
            this._squares.splice(idx, 1, this.player);
            this._xIsNext = !this._xIsNext;
            this.checkWinner(this.evaluate(this._squares));
            if (!this._winner) {
                switch(this._gameMode) {
                    case 0:
                        break;
                    case 1:
                        this.simpleBotMove();
                        break;
                    case 2:
                        this.smartBotMove();
                        break;
                }
            }
        }
    }

    /**
     * Random move
     */
    simpleBotMove() {
        let emptySquares: any[] = this.getEmptySquares();
        let rando: number = Math.floor(Math.random() * Math.floor(emptySquares.length));
        this._squares.splice(emptySquares[rando], 1, this.player);
        this._xIsNext = !this._xIsNext;
        this.checkWinner(this.evaluate(this._squares));
    }

    /**
     * Makes move based on minimax algorithm
     */
    smartBotMove() {
        let bestMove = this.findBestMove(this._squares);
        if (bestMove != -1) {
            this._squares.splice(bestMove, 1, this.player);
        }
        this._xIsNext = !this._xIsNext;
        this.checkWinner(this.evaluate(this._squares));
    }

    /**
     * Checks all empty squares on the board to find the best possible move
     * 
     * @param board current board state
     * @returns best move out of empty squares
     */
    findBestMove(board: any[]) {
        let bestVal = 1000;
        let bestMove = -1;

        for (let i = 0; i < board.length; i++) {
            if (board[i] == null) {
                board[i] = this.player;
                let moveVal = this.minimax(board, 0, !this._xIsNext);
                board[i] = null;
                if (moveVal < bestVal) {
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }
        return bestMove;
    }

    /**
     * Minimax algorithm implantation
     * 
     * @param board current board state
     * @param depth tree depth
     * @param isMax maximizing player (true) or minimizing player (false)
     */
    minimax(board: any[], depth: number, isMax: boolean) {
        
        let score = this.evaluate(board);

        if (score == 10) return score;
        if (score == -10) return score;
        if (this.getEmptySquares().length == 0) return 0;

        if (isMax) {
            let best = -1000;
            for (let i = 0; i < board.length; i++) {
                if (board[i] == null) {
                    board[i] = 'X';
                    best = Math.max(best, this.minimax(board, depth + 1, !isMax));
                    board[i] = null;
                }
            }
            return best;
        } else {
            let best = 1000;
            for (let i = 0; i < board.length; i++) {
                if (board[i] == null) {
                    board[i] = 'O';
                    best = Math.min(best, this.minimax(board, depth + 1, !isMax));
                    board[i] = null;
                }
            }
            return best;
        }
    }

    /**
     * Checks for empty squres in current board state
     * 
     * @returns arr[]
     */
    getEmptySquares() {
        let temp = [];
        for (let i = 0; i < this._squares.length; i++) {
            if (this._squares[i] == null) {
                temp.push(i);
            }
        }
        return temp;
    }

    /**
     * Check for winner based on score
     * 
     * @param value from evaluate function
     */
    checkWinner(value: number) {
        if (value == 0){
            this._winner = null;
        }
        if (value == 10){
            this._scorePlayerX++;
            this._winner = 'X';
        }
        if (value == -10) { 
            this._scorePlayerO++;
            this._winner = 'O';
        }
        if (value == 0 && this.getEmptySquares().length == 0){
            this._scoreDraw++;
            this._winner = 'Draw';
        }
    }

    /**
     * Evaluates the state of the board
     * @param board current board state
     * @returns 10 if player 'X' won
     * @returns -10 if player 'O' won
     * @returns 0 if no winner
     */
    evaluate(board: any[]) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                if (board[a] == 'X') return 10;
                else if (board[a] == 'O') return -10;
            }
        }
        return 0;
    }

}
