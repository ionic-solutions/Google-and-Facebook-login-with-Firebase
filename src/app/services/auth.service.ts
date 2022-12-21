import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from
'@angular/fire/compat/firestore';


import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    public http:HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    //  google login code
     this.user$ = this.afAuth.authState.pipe(
       switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
        })
        )
      }
      async googleSignin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        this.router.navigate(['login']);
        return this.updateUserData(credential.user);
        }

        private updateUserData(user) {
          // Sets user data to firestore on login
          const userRef: AngularFirestoreDocument<User> =
          this.afs.doc(`users/${user.uid}`);
          const data = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          }
          console.log(data)
          return userRef.set(data, { merge: true })
          }

          async signOut() {
            await this.afAuth.signOut();
            return this.router.navigate(['login']);
          }
}



