import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FCMPlugin } from '@capacitor-community/fcm';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

//import {SwPush} from '@angular/service-worker'

// import {
//   ActionPerformed,
//   PushNotificationSchema,
//   PushNotifications,
//   Token,
// } from '@capacitor/push-notifications';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bahikhata';
  topic: string = 'my-topic'
  constructor(private router: Router/*, private _swPush: SwPush*/) {
    

   }
  ngOnInit(): void {

    console.log('Initializing HomePage');

    
  }
  initializePushNotification(): void{
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
      alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
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
  //  requestSubscription = () => {
  //   if (!this._swPush.isEnabled) {
  //     alert("Notification is not enabled.");
  //     return;
  //   }
  //   this._swPush.notificationClicks.subscribe(x=>{
  //     alert(x)
  //     console.log("utkarsh")
  //   }); 
  //   this._swPush.requestSubscription({
  //     serverPublicKey: 'BMafcqtSh7wn6SkFZ1MGZMzJKXTF080afqHfQpTZBKSQyMdRrVWQ3xO_ri-NrOb-aS5cM-go4FHS2MeA6cXDcBg'
  //   }).then((_) => {
  //     console.log(JSON.stringify(_));
  //     alert(JSON.stringify(_));
  //   }).catch((_) => console.log);
  // };
   navigateToAddItems(){
    this.router.navigate(['/add'] );
   
  }
  navigateToAddCategory(){
    this.router.navigate(['/category'] );
  }
}
