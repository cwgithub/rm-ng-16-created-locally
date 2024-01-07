import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerUtilsService {
  static readonly ServerUrl = 'https://theoryserverts.azurewebsites.net';
  // static readonly ServerUrl = 'http://localhost:8080';

  constructor(private _httpClient: HttpClient) {}

  loadTextFile(fileName: string): Observable<string> {
    return this._httpClient.get(fileName, { responseType: 'text' });
  }

  loadJsonFile(fileName: string): Observable<any> {
    return this._httpClient.get(fileName);
  }

  getServerFileUrl(path: string): string {
    return `${ServerUtilsService.ServerUrl}/${path}`;
  }
}
