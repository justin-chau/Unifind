import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface School {
  name: string;
  location: string;
}

export interface SchoolId extends School {
  id: string;
}

export interface User {
  uid?: string;
  email?: string;
  schools?: string[];
  photoURL?: string;
  displayName?: string;
  faculty?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  userId: string;
  user: User;
  private schoolCollection: AngularFirestoreCollection<School>;
  schools: Observable<SchoolId[]>;
  userRef: AngularFirestoreDocument<User>;
  constructor(private afStore: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid;
        this.userRef = this.afStore.doc(`users/${this.userId}`);
        this.userRef.valueChanges().subscribe(data => {
          this.user = data
        });
      }
      else {
        this.userId = '';
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
    if (this.userId){
      if (this.user.schools) {
        this.user.schools.push(schoolId)
      }
      else {
        this.user.schools = [schoolId];
      }
      console.log(this.user)
      return this.userRef.set(this.user, {merge: true});
    }
    else {
      this.router.navigate(['/account']);
    }
  }
}
