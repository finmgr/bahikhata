import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router/*, private _swPush: SwPush*/) {
    
   }
  ngOnInit(): void {
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
