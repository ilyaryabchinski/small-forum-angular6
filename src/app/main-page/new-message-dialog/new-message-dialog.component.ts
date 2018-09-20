import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {MessageModel} from '../../shared/models/message.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'forum-new-message-dialog',
  templateUrl: './new-message-dialog.component.html',
  styleUrls: ['./new-message-dialog.component.css']
})
export class NewMessageDialogComponent {

  public messageForm = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(5),
      ]
    ],
    body: ['', [
      Validators.required,
      Validators.maxLength(100)
      ]
    ],
  });

  @Output() newMessage$ = new EventEmitter<MessageModel>();

  constructor(public modal: NgbModal, private fb: FormBuilder) { }

  public onSaveMessage() {
    this.newMessage$.emit(this.messageForm.value as MessageModel);
  }

  get title() { return this.messageForm.get('title'); }

  get body() { return this.messageForm.get('body'); }

}
