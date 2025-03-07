import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public users :any = {
    admin : {password : '1234' ,roles : ['STUDENT','ADMIN']},
    user1 : {password : '1234' ,roles : ['STUDENT']},

  }


  constructor() { }
  public login(username : string , password : string):boolean{
   if(this.users[username]&& this.users[username]['password']==password)
   {
     return true;

   } else {
     return  false;
   }
  }
}
