import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { User } from '../models/user.interaface';
import { RoleValidator } from '../helper/roleValidator';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends RoleValidator {
  loading = false;
  public user$: Observable<User>;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore
  ) {
    super();
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  // RESET PASSWORD
  async resetPassword(email: string): Promise<any> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error =>', error);
    }
  }

  // LOGIN
  async login(email: string, passowrd: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        passowrd
      );
      this.updateUserData(user);
      this.router.navigate(['/news']);
      return user;
    } catch (error) {
      alert(error.message);
    }
  }

  // REGISTER
  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.sendVerificationEmail();
      return user;
    } catch (error) {
      alert(error.message);
    }
  }

  // SEND VERIFICATION EMAIL
  async sendVerificationEmail(): Promise<any> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  // LOGOUT
  async logout(): Promise<any> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      alert(error.message);
    }
  }

  // GET THE ACTUAL USER LOGGED
  async getCurrentUser(): Promise<any> {
    try {
      return await this.afAuth.authState.pipe(first()).toPromise();
    } catch (error) {
      alert(error.message);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      role: 'EDITOR',
    };

    return userRef.set(data, { merge: true });
  }
}
