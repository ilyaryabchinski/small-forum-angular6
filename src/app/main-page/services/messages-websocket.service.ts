import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import Socket = SocketIOClient.Socket;
import {MessageModel} from '../../shared/models/message.model';

enum SocketEvents {
  CONNECT = 'connect',
  MESSAGES = 'messages',
  NEW_MESSAGE = 'newMessage',
  DISCONNECT = 'disconnect',
}

@Injectable()
export class MessagesWebsocketService {

  private socket: Socket;

  constructor() {}

  public connect(): Observable<any> {
    this.socket = io(environment.routes.base);

    return new Observable(observer => {
      this.socket.on(SocketEvents.MESSAGES, data => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
  }

  public sendMessage(message: MessageModel) {
    this.socket.emit(SocketEvents.NEW_MESSAGE, message);
  }
}
