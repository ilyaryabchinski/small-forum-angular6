import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {MessagesService} from './messages.service';
import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {environment} from '../../../environments/environment';
import {MessageModel} from '../../shared/models/message.model';



describe('MessagesService', () => {
  let service: MessagesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });


    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    service = new MessagesService(httpClient);
  });

  it('should get all messages', () => {
    const testData = [
      {author: 'admin', title: 'First message', body: 'First message body'},
      {author: 'incognito', title: 'Second message', body: 'Second message body'},
      {author: 'sam', title: 'Third message', body: 'Third message body'},
    ];
    service.getAll().subscribe(res => {
      expect(res.length).toBe(3);
      expect(res).toEqual(testData);
    });

    const request = httpTestingController.expectOne(environment.routes.base + environment.routes.message.base);
    expect(request.request.method).toBe('GET');
    request.flush(testData);
  });

  it('should not get all messages because of network error', () => {

    const errorMessage = 'Network Error';

    service.getAll().subscribe(
      res => {
      },
      error => {
        expect(error.error.message).toBe(errorMessage);
      });

    const request = httpTestingController.expectOne(environment.routes.base + environment.routes.message.base);
    expect(request.request.method).toBe('GET');
    const mockError = new ErrorEvent('Network error', {
      message: errorMessage,
    });
    request.error(mockError);
  });


  it('should not get all messages because of network error', () => {
    const errorMessage = 'Network Error';

    service.getAll().subscribe(
      res => {
      },
      error => {
        expect(error.error.message).toBe(errorMessage);
      });

    const request = httpTestingController.expectOne(environment.routes.base + environment.routes.message.base);
    expect(request.request.method).toBe('GET');
    const mockError = new ErrorEvent('Network error', {
      message: errorMessage,
    });
    request.error(mockError);
  });

  it('should post new message and return status 200', () => {

    const testData: MessageModel = {author: 'admin', title: 'title', body: 'body'};

    service.save(testData).subscribe(res => {
      expect(res.status).toBe(200);
      expect(res.ok).toBeTruthy();
    });

    const request = httpTestingController.expectOne(environment.routes.base + environment.routes.message.base);
    expect(request.request.method).toBe('POST');
    request.flush({status: 200, statusText: 'OK', ok: true});
  });

  it('should not post new message and return status 400', () => {

    const testData: MessageModel = {author: 'admin', title: '', body: 'body'};

    service.save(testData).subscribe(res => {
      expect(res.status).toBe(400);
    });

    const request = httpTestingController.expectOne(environment.routes.base + environment.routes.message.base);
    expect(request.request.method).toBe('POST');
    request.flush({status: 400, statusText: 'Invalid Paramters', ok: false});
  });
});
