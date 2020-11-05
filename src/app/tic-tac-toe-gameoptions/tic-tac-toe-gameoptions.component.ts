import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-tic-tac-toe-gameoptions',
    template: `
        <div class="btn-group btn-group-toggle">
            <label [ngClass]="{'btn-success' : value == 0, 'btn-danger' : (value == 1 || value == 2)}" ngbButtonLabel>
                <input type="checkbox" ngbButton (click)="chooseGameMode(0)"> New Game (player)
            </label>
            <label [ngClass]="{'btn-success' : value == 1, 'btn-danger' : (value == 0 || value == 2)}" ngbButtonLabel>
                <input type="checkbox" ngbButton (click)="chooseGameMode(1)"> New Game (simple AI)
            </label>
            <label [ngClass]="{'btn-success' : value == 2, 'btn-danger' : (value == 0 || value == 1)}" ngbButtonLabel>
                <input type="checkbox" ngbButton (click)="chooseGameMode(2)"> New game (smart AI)
            </label>
        </div>
    `,
    styles: [`
        .btn-group {
            width: 600px;
        }

        .btn {
            width: 200px;
        }
    `]
})
export class TicTacToeGameoptionsComponent {

    @Input() value: number
    @Output() gameOption: EventEmitter<number> = new EventEmitter();

    constructor() { }

    chooseGameMode(option: number) {
        this.gameOption.emit(option);
    }
}
