import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  schools: Observable<any[]>;
  constructor(public data: DataService) {
    this.schools = data.schools;
  }
  ngOnInit() {
    this.schools = this.data.schools;
  }

}
