import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
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
    message: ['', [
      Validators.required,
      Validators.maxLength(100)
      ]
    ],
  });

  @Output() newMessage$ = new EventEmitter<MessageModel>();

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) { }

  public onSaveMessage() {
    console.log(this.messageForm.value as MessageModel);
  }

}
