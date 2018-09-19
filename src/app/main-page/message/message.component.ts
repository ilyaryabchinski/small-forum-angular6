import {Component, Input, OnInit} from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {MessageModel} from '../../shared/models/message.model';
@Component({
  selector: 'forum-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: MessageModel;

  faUserCircle = faUserCircle;

  constructor() { }

  ngOnInit() {
  }

}
