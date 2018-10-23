import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  schools: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.schools = db.collection('schools').valueChanges();
  }
  ngOnInit() {
  }

}
