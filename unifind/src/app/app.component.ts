import { Component } from '@angular/core';

export interface PeriodicElement {
  regular: string;
  early: string;
  application: string;
  testing: string;
  score: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {regular: 'October 15th, 2018', early: 'Available', testing: 'SAT and ACT (Writing Not Required)', application: 'Common/Coalition', score: 'Self Report'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unifind';
  displayedColumns: string[] = ['regular', 'early', 'testing', 'application', 'score'];
  dataSource = ELEMENT_DATA;
}
