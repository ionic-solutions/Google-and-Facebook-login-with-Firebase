import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FacebookLogin, FacebookLoginPlugin } from '@capacitor-community/facebook-login';
import { isPlatform } from '@ionic/angular';
import { Router } from '@angular/router';
import {FirebaseAuthentication} from '@capacitor-firebase/authentication';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment'; 



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fbLogin: FacebookLoginPlugin;
  token: any;
  user: any;

  constructor(
     // google login code
     public auth:AuthService,
    //  fb login code
    public http:HttpClient,
    public router:Router
  ) {
    this.setupFbLogin();
  }

// initializeApp environment
  ngOnInit() {
    initializeApp(environment.config);
  }

  async setupFbLogin() {
    if (isPlatform('desktop')) {
      this.fbLogin = FacebookLogin;
    } else {
      // Use the native implementation inside a real app!
      // const { FacebookLogin } = Plugins;
      this.fbLogin = FacebookLogin;
    } 
  }

  async login() {
    const FACEBOOK_PERMISSIONS = ['email', 'user_birthday'];
    const result = await this.fbLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    this.router.navigate(['login']);
    console.log('result:', result)

    if (result.accessToken && result.accessToken.userId) {
      this.token = result.accessToken;
      this.loadUserData();
      this.router.navigate(['login']);
    } else if (result.accessToken && !result.accessToken.userId) {
      // Web only gets the token but not the user ID
      // Directly call get token to retrieve it now
      this.getCurrentToken();
      this.router.navigate(['login']);
    } else {
      // 
    }
  }


  async getCurrentToken() {    
    const result = await this.fbLogin.getCurrentAccessToken();
 
    console.log('current token:' , result)

    if (result.accessToken) {
      this.token = result.accessToken;
      this.loadUserData();
    } else {
      // Not logged in.
    }
  }
  async loadUserData() {
    const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`;
    this.http.get(url).subscribe(res => {
      this.user = res;
     console.log('user:',res)
    });
  }

  async logout() {
    await this.fbLogin.logout();
    this.user = null;
    this.token = null;
  }


  // goolge
  async googleLogin(){
    console.log('Google login programm');
    
      const result = await FirebaseAuthentication.signInWithGoogle();
      console.log(result);
      this.router.navigate(['login'])
      return result.user;
     
    };

}


