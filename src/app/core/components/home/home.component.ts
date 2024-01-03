import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // https://music-theory-tests-rest-server.azurewebsites.net/api/ping
  constructor(private _httpClient: HttpClient) {

    this._httpClient
      .get('https://theory-server.azurewebsites.net/api/ping')
      .subscribe((resp: any) => {
        console.log(resp);
      });

  }
}
