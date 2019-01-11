import { Component, OnInit , Input, Inject} from '@angular/core';
import { DataService } from '../core/data.service';
import { MatSnackBar, MatSnackBarConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

export interface InfoDialogData {
  animal: string;
  name: string;
}

export interface WriterDialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  @Input() school;

  constructor(public data: DataService, public snackBar: MatSnackBar, public infoDialog: MatDialog, public writerDialog: MatDialog, private router: Router) { }

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
      data: {school: this.school}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      // Use above for admin override
    });
  }

  openWriter(){
    if (this.data.user) {
      const dialogWriterRef = this.writerDialog.open(WriterDialog, {
        width: '850px',
        data: {school: this.school}
      });

      dialogWriterRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
        // Use above for admin override
      });
    }
    else {
      this.router.navigate(['/account'])
    }
  }

  removeSchool() {
    this.data.removeUserSchools(this.school.id);
    this.snackBar.open(`${this.school.name} was removed from your list.`, "Dismiss");
  }
}

@Component({
  selector: 'app-info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.css']
})
export class InfoDialog {

  constructor(
    public dialogRef: MatDialogRef<InfoDialog>, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: InfoDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-writer',
  templateUrl: 'writer.component.html',
  styleUrls: ['writer.component.css']
})
export class WriterDialog {

  constructor(
    public dialogWriterRef: MatDialogRef<WriterDialog>, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: WriterDialogData) {}

  onNoClick(): void {
    this.dialogWriterRef.close();
  }

  send(): void {
    this.snackBar.open('Message sent!', 'Dismiss');
  }

}
