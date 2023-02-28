import { Component,ViewChild,ElementRef } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { WHProductCheck } from '../models/WHProductCheck.model';
import { networkService } from '../network.service';

@Component({
  selector: 'app-scan-fg',
  templateUrl: './scan-fg.component.html',
  styleUrls: ['../scan-fg/scan-fg.component.scss']
})
export class ScanFgComponent {
  emcode: string = "";
  thName: string = "";
  isLoadingResult = true;
  displayedColumns: string[] = ['plno', 'nwc', 'tool'];
  dataSource = [];
  getWHProductCheck: WHProductCheck[] = [];
  showMessage:string = "";
  scaned:boolean = false;
  modelShow:string = '-';
  pltypeShow:string = '-';
  plnoShow:string = '-';
  nwcShow:string = '-';
  fwcShow:string = '-';
  dateShow:string = '-';
  timeShow:string = '-';
  @ViewChild('inputFg', { static: false }) inputFg!: ElementRef;
  constructor(private network: networkService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.emcode = params['emcode'];
      this.thName = params["tname"] + " ";
      if (this.emcode === undefined || this.emcode.length == 0) {
        this.emcode = 'คุณยังไม่ได้ login';
      }
    });
    // this.getFgAll();
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.inputFG.nativeElement.focus();
    // }, 250);
  }

  updateEmcode(code: string) {
    this.emcode = code;
  }
  // getFgAll() {
    // this.network.getAllFg().subscribe({
    //   next: (data) => {
    //     for (let key in data) {
    //       data[key].scanstatus = data[key].scanstatus != "" ? data[key].scanstatus : "-";
    //     }
    //     this.getWHProductCheck = data;
    //     this.isLoadingResult = false;
    //   },
    //   error: (response) => {
    //     console.log(response);
    //   }
    // })
  // }

  checkFG(fgNo: string) {
    this.network.fgCheck(fgNo).subscribe({
      next:(res)=>{
        console.log(res[0])
        if(res != null && typeof res != 'undefined' && Object.keys(res).length > 0){
          this.modelShow = res[0].omodel ? res[0].omodel : "-";
          this.pltypeShow = res[0].opltype ? res[0].opltype : "-";
          this.plnoShow = res[0].oplno ? res[0].oplno : "-";
          this.nwcShow = res[0].onwc ? res[0].onwc : '-';
          this.fwcShow = res[0].ofwc ? res[0].ofwc : '-';
          this.dateShow = res[0].owdate ? (res[0].owdate.substring(0,10)) : '-';
          this.timeShow = res[0].owtime ? res[0].owtime : '-';
          this.inputFg.nativeElement.value = '';
        }
      },error:(err)=>{
        console.log(err);
      }
    });
    // if (this.emcode === undefined || this.emcode.length == 0 || this.emcode == 'คุณยังไม่ได้ login') {
    //   alert('ยังไม่ได้ login');
    //   this.inputFG.nativeElement.value = '';
    //   return;
    // }
    // this.setWHProductCheck.oPlno = fgNo;
    // if(fgNo.length >= 13){
    //   fgNo = fgNo.substring(0,13);
    // }
    // this.network.scanFG(fgNo).subscribe({
    //   next: (data) => {
    //     if(data.mes == true){
    //       this.showMessage = fgNo + " SCAN SUCCESS !!!";
    //       var audio = new Audio('assets/audio/pass.mp3');
    //       audio.play();
    //       this.scaned = true;
    //     }else{
    //       var audio = new Audio('assets/audio/no_pass.mp3');
    //       audio.play();
    //       this.showMessage = fgNo + " SCAN ERROR !!!";
    //       this.scaned = false;
    //     }
    //     this.getFgAll();
    //     this.inputFG.nativeElement.value = '';
    //   },
    //   error: (msg) => {
    //     var audio = new Audio('assets/audio/no_pass.mp3');
    //     audio.play();
    //     this.showMessage = fgNo + " SCAN ERROR !!!";
    //       this.scaned = false;
    //     this.inputFG.nativeElement.value = '';
    //   }
    // });
  }
}