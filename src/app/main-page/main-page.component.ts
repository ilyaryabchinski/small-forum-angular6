 import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesService} from './services/messages.service';
import {MessageModel} from '../shared/models/message.model';
 import {Subscription, timer} from 'rxjs';
 import {concatMap, mergeMap} from 'rxjs/operators';
 import {UserService} from '../core/user.service';



@Component({
  selector: 'forum-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  public messages: MessageModel[];
  private messagesSubcription: Subscription;

  constructor(private modalService: NgbModal,
              private messagesService: MessagesService,
              private userService: UserService) {}

  ngOnInit() {
    this.messagesSubcription = timer(0, 3000)
      .pipe(
        concatMap(_ => this.messagesService.getAll()),
      ).subscribe(
        response => this.messages = response
      );
  }
  ngOnDestroy() {
    this.messagesSubcription.unsubscribe();
  }

  open(dialog) {
    this.modalService.open(dialog);
  }

  onNewMessageRecieved(message: MessageModel) {
    message.author = this.userService.getLoggedUser().name;

    this.messagesService.save(message).pipe(
      mergeMap(res => {
        return this.messagesService.getAll();
      })
    ).subscribe(res => {
        this.messages = res;
        this.modalService.dismissAll();
    });
  }
}
