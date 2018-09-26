import {fakeAsync,  tick} from '@angular/core/testing';
import {MessagesWebsocketService} from './messages-websocket.service';
import * as io from 'socket.io-client';


describe('MessagesWebsocketService', () => {
  let service: MessagesWebsocketService;
  let ioSpy;

  beforeEach(() => {
    (window as any).global = window;

    // ioSpy = jasmine.createSpy('io', io).and.callFake(() => {});
    ioSpy = spyOn(io, 'connect');
    // ioSpy = jasmine.createSpyObj('io', ['connect']);
    // ioSpy.connect.and.callFake(() => {});


    service = new MessagesWebsocketService();
  });

  it('should exist', () => {
    expect(service).toBeDefined();
  });


  it('should create socket',  () => {
    service.connect();
    expect(ioSpy).toHaveBeenCalled();
  });



});
