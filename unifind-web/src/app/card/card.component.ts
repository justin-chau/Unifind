import { Component, OnInit , Input} from '@angular/core';
import { AuthService } from '../core/auth.service';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {
  @Input() school;
  constructor(public data: DataService) { }

  ngOnInit() {
  }

  addSchool(school){
    this.data.updateUserSchools(school.id);
  }

  checkSchools(school) {
    try {
      if (this.data.user.schools.includes(school)) {
        return false;
      }
      else {
        return true;
      }
    }
    catch {
      return true;
    }
  }

  removeSchool(school) {
    this.data.removeUserSchools(school.id);
  }
}
