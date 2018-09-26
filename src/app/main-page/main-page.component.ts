 import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesService} from './services/messages.service';
import {MessageModel} from '../shared/models/message.model';
 import {Observable, Subscription, timer} from 'rxjs';
 import {concatMap, mergeMap} from 'rxjs/operators';
 import {UserService} from '../core/user.service';
 import {MessagesWebsocketService} from './services/messages-websocket.service';



@Component({
  selector: 'forum-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  public messages: MessageModel[];
  private websocketConnection: Subscription;

  constructor(private modalService: NgbModal,
              private messagesService: MessagesService,
              private messagesWSService: MessagesWebsocketService,
              private userService: UserService) {}

  ngOnInit() {
    this.websocketConnection = this.messagesWSService
      .connect()
      .subscribe(data => {
      this.messages = data;
    });
  }
  ngOnDestroy() {
    this.websocketConnection.unsubscribe();
  }

  open(dialog) {
    this.modalService.open(dialog);
  }

  onNewMessageRecieved(message: MessageModel) {
    message.author = this.userService.getLoggedUser().name;

    this.messagesWSService.sendMessage(message);
    this.modalService.dismissAll();

    // this.messagesService.save(message).pipe(
    //   mergeMap(res => {
    //     return this.messagesService.getAll();
    //   })
    // ).subscribe(res => {
    //     this.messages = res;
    //     this.modalService.dismissAll();
    // });
  }
}
