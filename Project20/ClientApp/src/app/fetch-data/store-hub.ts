
import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType, IHttpConnectionOptions, LogLevel } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreHub {
  private connection: HubConnection;

  public onMessage = new Subject<string>();

  public onConnected: Promise<void>;

  constructor(@Inject('BASE_URL') baseUrl: string) {
    this.connection = new HubConnectionBuilder()
      .withUrl('/hub', {
        transport: HttpTransportType.WebSockets,
        logger: LogLevel.Trace
      })
      .build();

    this.onConnected = this.connection.start();

    this.connection.on("SendMessage", (message: string) => {

      alert(message);
      this.onMessage.next(message)
    });
  }
}
