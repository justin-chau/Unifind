import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user';
import { School, SchoolId } from './school';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  user: User;
  schools: Observable<SchoolId[]>;
  userRef: AngularFirestoreDocument<User>;
  private schoolCollection: AngularFirestoreCollection<School>;
  
  constructor(private afStore: AngularFirestore, private router: Router, private auth: AuthService) {
    this.auth.user.subscribe(data => {
      if(data){
        this.user = data;
        this.userRef = this.afStore.doc(`users/${this.user.uid}`);
      }
      else {
        this.user = {
          uid: null,
          email: null,
          schools: null,
          photoURL: null,
          displayName: null,
          faculty: null
        }
      }
    }) 
    this.schoolCollection = afStore.collection<School>('schools');
    this.schools = this.schoolCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as School;
          const id = a.payload.doc.id;
          return { id, ...data };
      }))
    );
  }
  
  updateUserSchools(schoolId) {
    if (this.user){
      if (this.user.schools) {
        this.user.schools.push(schoolId)
      }
      else {
        this.user.schools = [schoolId];
      }
      return this.userRef.set(this.user, {merge: true});
    }
    else {
      this.router.navigate(['/account']);
    }
  }

  removeUserSchools(schoolId) {
    var index = this.user.schools.indexOf(schoolId);
    this.user.schools.splice(index);
    return this.userRef.update(this.user);
  }
}
