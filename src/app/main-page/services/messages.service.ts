import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageModel} from '../../shared/models/message.model';
import {PostMessageResponseModel} from '../../shared/models/post-message-response.model';

@Injectable()
export class MessagesService {
  private PATH = environment.routes.base + environment.routes.message.base;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<MessageModel[]> {
    return this.httpClient.get<MessageModel[]>(this.PATH);
  }

  public save(message: MessageModel): Observable<PostMessageResponseModel> {
    return this.httpClient.post<Object>(this.PATH, message);
  }

}
