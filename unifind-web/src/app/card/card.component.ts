import { Component, OnInit , Input, Inject} from '@angular/core';
import { AuthService } from '../core/auth.service';
import { DataService } from '../core/data.service';
import { MatSnackBar, MatSnackBarConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SnackMessageComponent } from '../snack-message/snack-message.component';
import { AboutComponent } from '../about/about.component';

export interface DialogData {
  animal : string;
  name : string;
}

export interface WriterData {
  animal : string;
  name : string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  @Input() school;

  animal: string;
  name: string;

  constructor(public data: DataService, public snackBar: MatSnackBar, public infoDialog: MatDialog, public writerDialog: MatDialog) { }

  ngOnInit() {
  }

  addSchool(){
    if (this.data.updateUserSchools(this.school.id)) {
      this.snackBar.open(`${this.school.name} was added to your list.`, "Dismiss");
    }
  }

  openInfo(){
    const dialogRef = this.infoDialog.open(InfoDialog, {
      width: '850px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openWriter(){
    const dialogWriterRef = this.writerDialog.open(WriterDialog, {
      width: '850px',
      data: {name: this.name, animal: this.animal}
    });

    dialogWriterRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  message(){
    const config = new MatSnackBarConfig();
    config.panelClass=['snack-message']
    this.snackBar.openFromComponent(SnackMessageComponent,config);
  }

  removeSchool() {
    this.data.removeUserSchools(this.school.id);
    this.snackBar.open(`${this.school.name} was removed from you list.`, "Dismiss");
  }
}

@Component({
  selector: 'app-info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.css']
})
export class InfoDialog {

  constructor(
    public dialogRef: MatDialogRef<InfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-writer',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.css']
})
export class WriterDialog {

  constructor(
    public dialogWriterRef: MatDialogRef<WriterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: WriterData) {}

  onNoClick(): void {
    this.dialogWriterRef.close();
  }

}