import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WHProductionCheck';
  isLogin:boolean = false;
  constructor(private cookie:CookieService){}
  ngOnInit(): void {
    this.isLogin = JSON.parse(this.cookie.get("login"));
  }
}
