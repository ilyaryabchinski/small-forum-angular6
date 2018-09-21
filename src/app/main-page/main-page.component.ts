 import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesService} from './services/messages.service';
import {MessageModel} from '../shared/models/message.model';
 import {forkJoin, Observable} from 'rxjs';
 import {concatMap, map, mergeMap} from 'rxjs/operators';
 import {UserService} from '../core/user.service';
 import {empty} from 'rxjs/internal/Observer';



@Component({
  selector: 'forum-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public messages: MessageModel[];

  constructor(private modalService: NgbModal,
              private messagesService: MessagesService,
              private userService: UserService) {}

  ngOnInit() {
    this.messagesService.getAll().subscribe(
      response => this.messages = response
    );
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
