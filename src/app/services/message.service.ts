import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
import { ReturnMessage } from '../models/returnMessage';
import { AuthService } from './auth.service';



const POST_MESSAGE_URL = `${environment.API_MESSAGE_URL}/PostMessage`;
const GET_MESSAGE_URL = `${environment.API_MESSAGE_URL}/GetMessage`;


@Injectable({
  providedIn: 'root'
})
export class MessageService {

constructor(private http:HttpClient,private auth:AuthService) { }

postMessage(message:Message): Observable<Message>{

  let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")

    return this.http.post<Message>(POST_MESSAGE_URL, message, { headers: headers });
}


getMessage(): Observable<ReturnMessage[]>{

    return this.http.get<ReturnMessage[]>(GET_MESSAGE_URL+"?="+this.auth.getCurrentUserId());
}

}
