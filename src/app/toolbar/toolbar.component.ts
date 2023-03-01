import { Component,OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../data.service';
export interface mListMenu {
  text:string;
  routeLink:string;
}
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  listMenu:mListMenu[] = [
    {text:'Scan Pallet',routeLink:'/scan/pallet'},
    {text:'Scan FG',routeLink:'/fg/scaned'},
    {text:'ตรวจ FG',routeLink:'/fg/view'},
    {text:'ตรวจสอบสต็อก',routeLink:'/compare'}
  ];
  emcode:string = '';
  pageName:string = '';
  opened: boolean = false;
  imgUrl:string = '';
  @ViewChild('sideNav',{static:false}) sideNav!:MatSidenav;
  constructor(private cookie:CookieService,private dataService:DataService) {
    this.emcode = this.cookie.get("code");
    this.imgUrl = 'http://dcidmc.dci.daikin.co.jp/PICTURE/'  + this.emcode  + '.JPG';
    dataService.changeEmitted$.subscribe(data => {
      console.log(data);
    })
  }
  logout() : void{
    this.cookie.set("login","false");
    setTimeout(() => {
      window.location.href = 'http://dciweb2.dci.daikin.co.jp/whcheck/';
    }, 300);
  }
  goComponent(pName:string){
    this.pageName = pName;
    this.sideNav.toggle()
  }
  ngOnInit(): void {
    this.pageName = this.listMenu[0].text;
  }
}
