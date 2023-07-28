import { Component } from '@angular/core';
import { WebSocketService } from './services/WebSocketService';
import { Stomp } from '@stomp/stompjs';
import * as Stomps from '@stomp/stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  

  constructor() {
   
   
  }

  ngOnInit() {
    // this.webSocketService.getNotificationMessage().subscribe((message) => {
    //   this.notificationMessage = message;
    // });

    // Call the connect method of the WebSocketService to establish a connection
  }
}
