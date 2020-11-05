import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TicTacToeGameoptionsComponent } from './tic-tac-toe-gameoptions/tic-tac-toe-gameoptions.component';

@NgModule({
    declarations: [
        AppComponent,
        SquareComponent,
        TicTacToeComponent,
        TicTacToeGameoptionsComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
