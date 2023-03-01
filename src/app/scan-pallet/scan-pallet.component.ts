import { Component, ViewChild, ElementRef, OnInit, Inject, AfterViewInit, HostListener } from '@angular/core';
import { networkService } from '../network.service';
import { ActivatedRoute } from '@angular/router';
import { WHProductCheck } from '../models/WHProductCheck.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../data.service';

export interface Person {
  name: string;
  age: number;
}
@Component({
  selector: 'app-scan-pallet',
  templateUrl: './scan-pallet.component.html',
  styleUrls: ['./scan-pallet.component.scss']
})




export class ScanPalletComponent implements OnInit {

  emcode: string = "";
  thName: string = "";
  isLoadingResult = true;
  displayedColumns: string[] = ['plno', 'nwc', 'tool'];
  // users:MUser[] = [];
  dataSource = [];
  @ViewChild('inputPallet', { static: false }) inputPallet!: ElementRef;
  getWHProductCheck: WHProductCheck[] = [];
  setWHProductCheck: WHProductCheck = {}
  showMessage: string = "";
  scaned: boolean = false;
  numberLocation: number = 1;
  textLocaltion: string = "A";
  showAlert = false;
  constructor(private network: networkService, private cookie: CookieService, private dataService: DataService) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.emcode = params['emcode'];
    //   this.thName = params["tname"] + " ";
    this.emcode = this.cookie.get('code');
    if (this.emcode === undefined || this.emcode.length == 0) {
      this.emcode = 'คุณยังไม่ได้ login';
    }
    // });
    this.getProdCheckAll();
  }
  addData(newData: string) {
    //  console.log(mT)
    // let data = mTest[{
    //   pallet: newData
    // }}];
    this.dataService.emitChange({
      name: newData,
      age: this.numberLocation
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inputPallet.nativeElement.focus();
    }, 250);
  }

  onTextLocaltionChange(textLocaltion: string) {
    this.textLocaltion = textLocaltion;
  }

  updateEmcode(code: string) {
    this.emcode = code;
  }

  getProdCheckAll() {
    this.network.getAllPallet().subscribe({
      next: (data) => {
        for (let key in data) {
          data[key].scanstatus = data[key].scanstatus != "" ? data[key].scanstatus : "-";
        }
        this.getWHProductCheck = data;
        this.isLoadingResult = false;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  // dialogDelete(plno: string): void {
  //   const dialogDelete = this.dialog.open(DialogDeleteComponent, {
  //     data: { delete: false, plno: plno },
  //     width: '250px'
  //   });
  //   dialogDelete.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.network.removePlno(plno).subscribe({
  //         next: (response) => {
  //           this.getProdCheckAll();
  //         },
  //         error: (response) => { }
  //       });
  //     }
  //     this.inputPallet.nativeElement.focus();
  //   });
  // }

  scanPallet(plno: string) {
    if (this.numberLocation == null) {
      alert('กรุณาระบุ เลขพื้นที่');
      return;
    }
    var localtion = this.textLocaltion + this.numberLocation;
    if (this.emcode === undefined || this.emcode.length == 0 || this.emcode == 'คุณยังไม่ได้ login') {
      alert('ยังไม่ได้ login');
      this.inputPallet.nativeElement.value = '';
      return;
    }
    this.setWHProductCheck.oPlno = plno;
    if (plno.length == 13 || plno.length == 14) {
      plno = plno.substring(0, 13);
    }
    if (plno.length == 15 || plno.length == 16) {
      plno = plno.substring(0, 15);
    }


    this.network.scanPallet(plno, localtion).subscribe({
      next: (data) => {
        if (data.mes == true) {
          this.showMessage = plno + " SCAN SUCCESS";
          var audio = new Audio('assets/audio/pass.mp3');
          audio.play();
          this.scaned = true;
        } else {
          var audio = new Audio('assets/audio/no_pass.mp3');
          audio.play();
          this.showMessage = plno + " SCAN ERROR";
          this.scaned = false;
        }
        this.getProdCheckAll();
        this.inputPallet.nativeElement.value = '';
        this.showAlert = true;
      },
      error: (msg) => {
        var audio = new Audio('assets/audio/no_pass.mp3');
        audio.play();
        this.showMessage = plno + " SCAN ERROR !!!";
        this.scaned = false;
        this.inputPallet.nativeElement.value = '';
        this.showAlert = true;
      }
    });
    // this.network.updateScaned(plno).subscribe({
    //   next: (data) => {
    //     if (Object.keys(data).length) {
    //       this.getProdCheckAll();
    //     } else {
    //       alert("บันทึกข้อมูลไม่สำเร็จ !");
    //     }
    //     this.inputPallet.nativeElement.value = '';
    //   }, error: (message) => {
    //     this.inputPallet.nativeElement.value = '';
    //     const dialogNew = this.dialog.open(DialogNewComponent, {
    //       data: { palletName: plno, new: false }
    //     });
    //     dialogNew.afterClosed().subscribe(result => {
    //       if (result == true) {
    //         this.network.addNew(plno).subscribe({
    //           next: (response) => {
    //             console.log(response)
    //           }, error: () => {
    //             alert('Can not Add Pallet !!!')
    //           }
    //         })
    //       }
    //     });
    //   }
    // })
  }
}
@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete/dialog-delete.component.html'
})

export class DialogDeleteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>) { }
  ngOnInit() { }
}


export interface DialogNewData {
  palletName: string;
  new: boolean;
}
@Component({
  selector: 'dialog-confirm-new',
  templateUrl: 'dialog-new/dialog-new.component.html',
  styleUrls: ['dialog-new/dialog-new-component.scss']
})
export class DialogNewComponent implements OnInit {
  palletName: string = "123";
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogNewData) { }
  ngOnInit() { }
}
