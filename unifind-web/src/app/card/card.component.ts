import { Component, OnInit , Input} from '@angular/core';
import { AuthService } from '../core/auth.service';
import { DataService } from '../core/data.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SnackMessageComponent } from '../snack-message/snack-message.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})


export class CardComponent implements OnInit {
  @Input() school;
  constructor(public data: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  addSchool(school){
    if (this.data.updateUserSchools(school.id)) {
      this.snackBar.open(`${school.name} was added to your list.`, "Dismiss");
    }
  }

  message(school){
    const config = new MatSnackBarConfig();
    config.panelClass=['snack-message']
    this.snackBar.openFromComponent(SnackMessageComponent,config);
  }

  removeSchool(school) {
    this.data.removeUserSchools(school.id);
    this.snackBar.open(`${school.name} was removed from you list.`, "Dismiss");
  }
}
