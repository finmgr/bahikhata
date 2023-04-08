import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../expense.service';

import { FormControl } from '@angular/forms';
import { House } from '../House';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss']
})
export class LoginHomeComponent {
  
  value: House = {
    houseid : '',
    password : ''
  }
  constructor(
    private router: Router,private service: ExpenseService
  ) { }

  onSubmit() {
    console.log("on submit called")
    this.value.password = btoa(this.value.password)
    this.service.loginUser(this.value).subscribe(
      res=>{
        console.log(res);
        const body : {[session_id: string]:any}  = res
        console.log(body)
        localStorage.setItem('session-id',body['session_id'])
        console.log("completed")
        this.initializePushNotification(this.value.houseid);
        this.router.navigate(['/dashboard'])
      },
      err => console.log('HTTP Error', err),
    )
  }
  initializePushNotification(houseid: string): void{
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
    
    // this.fcm.subscribeTo({ this.topic }).then(() => {
    //   console.log(`Subscribed to topic "${topic}"`);
    // }).catch((err) => {
    //   console.error(`Failed to subscribe to topic "${topic}": ${err}`);
    // });

    PushNotifications.addListener('registration', (token: Token) => {
      this.service.addToken(houseid, token.value).subscribe(res=>{
        localStorage.setItem('d-token', token.value);
        localStorage.setItem('all-d-token',res);
        console.log('Push registration success, token: ' + token.value);
        console.log('Push registration res, : ' + res);
      })
      
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );

    // PushNotifications.requestPermissions().then(result => {
    //   if (result.receive === 'granted') {
    //     // Register with Apple / Google to receive push via APNS/FCM
    //     PushNotifications.register();
    //   } else {
    //     // Show some error
    //   }
    // });

    // // Show us the notification payload if the app is open on our device
    // PushNotifications.addListener('pushNotificationReceived',
    //   (notification: PushNotificationSchema) => {
    //     alert('Push received: ' + JSON.stringify(notification));
    //   }
    // );
    //this.requestSubscription();
  }
  navigateToRegister(){
    this.router.navigate(['/register'])
  }
}
