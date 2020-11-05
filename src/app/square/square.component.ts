import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-square',
	template: `
		<button type="button" class="btn btn-light" *ngIf="!value">{{ value }}</button>
		<button type="button" class="btn btn-primary" *ngIf="value == 'X'">{{ value }}</button>
		<button type="button" class="btn btn-secondary" *ngIf="value == 'O'">{{ value }}</button>
  	`,
	styles: [`
		button {
			width: 100%;
			height: 100%;
			font-size: 5em;
		}
	`]
})
export class SquareComponent {
	@Input() value: 'X' | 'O'
}
