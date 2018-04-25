import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
//   signUp(submittedEmail: String,submittedPassword: String) {
//     var ref = this.ref
//     var boundSignerUpper = this.signUp.bind(this)
//     var boundLoggerInner = this._logUserIn.bind(this)
//     var storeUser = function(userData) {
//       ref.child('users').child(userData.uid).set({email:submittedEmail})
//     }
//     var handler = function(error, userData) {
//       if (error) {
//         console.log("Error creating user:", error);
//       } else {
//         console.log("Successfully created user account with uid:", userData.uid);
//         storeUser(userData)
//         boundLoggerInner(submittedEmail,submittedPassword)
//       }
//     }
//     ref.createUser({
//       email    : submittedEmail,
//       password : submittedPassword
//     }, handler);          
// }
}
