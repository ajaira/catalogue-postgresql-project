import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private route:Router) {
  }

  ngOnInit(): void {
  }

  onSignUp(data) {
    this.authService.login(data)
      .subscribe(response => {
        let token = response.headers.get('Authorization');
        this.authService.storageToken(token);
        this.route.navigateByUrl("/");
      }, error => {
        console.log((error));
      });
  }

}
