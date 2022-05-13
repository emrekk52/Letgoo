import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Message } from '../models/message';
import { Profile } from '../models/Profile';
import { ReturnMessage } from '../models/returnMessage';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messageService: MessageService, private router: Router, private auth: AuthService, private _sanitizer: DomSanitizer) {
    if (this.router.getCurrentNavigation()?.extras.state != undefined)
      this.isProductId = this.router.getCurrentNavigation()?.extras?.state!['product_id'];
  }

  isProductId: number

  messages: ReturnMessage[]
  chooseMessage: ReturnMessage
  myUser: Profile
  isEmptyWarning: string
  writeMessage: string = ""
  filteredMessages: ReturnMessage[] = []
  filter: string = ""

  ngOnInit() {
    this.getMessage()
    this.getProfile()


  }

  getProfile() {

    let myId = this.auth.getCurrentUserId()
    this.auth.getUserProfile(myId).subscribe(data => {
      this.myUser = data

      if (this.myUser.photo_url == null)
        this.myUser.photo_url = "../../../assets/user.svg"


    }
    )
  }

  goToProductDetail() {
    this.router.navigate(['product-detail'], { state: { id: this.chooseMessage.product.id } });

  }

  goToProfile() {
    this.router.navigate(['profile'], { state: { user: this.chooseMessage.user } });

  }

  getMessage() {

    this.messageService.getMessage().subscribe(data => {
      this.messages = data

      if (this.isProductId == null) {

        if (this.chooseMessage == null)
          this.chooseMessage = data[0]
        else {
         
          data.forEach(k => {

            if (k.product.id == this.chooseMessage.product.id)
             { this.chooseMessage = k; return; }

          })
        }
      }
      else
        data.forEach(m => {

          if (m.product.id == this.isProductId) {
            this.chooseMessage = m;
            return;
          }

        })

      this.filteredMessages = this.messages

    })

  }

  sanitizer(value: string): any {
    if (value != null)
      return this._sanitizer.bypassSecurityTrustResourceUrl(value);
    else
      return "../../../assets/user.svg";
  }

  postMessage() {
    this.isEmptyWarning = ""

    if (this.writeMessage == "") { this.isEmptyWarning = "Öncelikle mesaj yazın"; return; }

    let message = new Message();
    message.message = this.writeMessage;
    message.sender_id = this.myUser.id;
    message.receiver_id = this.chooseMessage.user.id;
    message.product_id = this.chooseMessage.product.id;

    this.writeMessage = ""
    this.messageService.postMessage(message).subscribe(data => {

      if (data == null)
        this.isEmptyWarning = "Mesaj gönderilemedi"
      else
        this.getMessage()

    })

  }



  search() {
    let filtered = this.messages.filter(t => t.user.name.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase().trim()) != -1 || t.messageList[0].message.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase().trim()) != -1)


    if (filtered == null)
      this.filteredMessages = this.messages
    else
      this.filteredMessages = filtered

  }



  concatName(user: Profile): string {

    return user.name + " " + user.surname;
  }

}
