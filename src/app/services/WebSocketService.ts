import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private notificationSubject = new BehaviorSubject<string>('');
  stompClient!: Client;
  constructor() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8082/ws',
    });
    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/imageUpload', (message) => {
        console.log(message.body);
        this.notificationSubject.next(message.body)
        this.stompClient.deactivate()
      });
    };
    this.stompClient.activate();
  }

  getNotificationMessage(): Observable<string> {
    return this.notificationSubject.asObservable();
  }
}
