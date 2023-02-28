import { Component, Output, EventEmitter } from '@angular/core';
import { networkService } from '../network.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() _EMCODE = new EventEmitter<string>();
  code: string = "";
  constructor(private network: networkService, private router: Router,private cookie:CookieService) { }
  login() {
    if (this.code == '') {
      alert('กรุณาใส่รหัสพนักงาน !!!')
      return;
    }
    if (this.code != "") {
      this.network.login(this.code).subscribe({
        next: (data) => {
          console.log(data);
          if (data != null) {
            this.cookie.set("login","true");
            this.cookie.set("code",this.code);
            this.cookie.set("tname",data.tname);
            this.cookie.set("tsurn",data.tsurn);
            // this.router.navigate(['/scan/pallet'], {
            //   queryParams: {
            //     emcode: this.code,
            //     name: data.tname,
            //     surn: data.tsurn
            //   }
            // });
            window.location.reload();
          } else {
            alert('ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก : คุณอาจใส่รหัสพนักงานไม่ถูกต้อง');
          }
          this.code = '';
        }, error: (err) => {
          alert('ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก : ' + err.error);
        }
      });
    }else{
      console.log('null')
    }
  }
}
