import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeGameoptionsComponent } from './tic-tac-toe-gameoptions.component';

describe('TicTacToeGameoptionsComponent', () => {
    let component: TicTacToeGameoptionsComponent;
    let fixture: ComponentFixture<TicTacToeGameoptionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TicTacToeGameoptionsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TicTacToeGameoptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
