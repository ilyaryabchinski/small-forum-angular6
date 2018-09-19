import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesService} from './services/messages.service';
import {MessageModel} from '../shared/models/message.model';


@Component({
  selector: 'forum-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public messages: MessageModel[];

  constructor(private modalService: NgbModal, private messagesService: MessagesService) {}

  ngOnInit() {
    this.messagesService.getAll().subscribe(
      response => this.messages = response
    );
  }

}
