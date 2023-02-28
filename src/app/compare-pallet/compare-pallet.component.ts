import { Component, OnInit } from '@angular/core';
import { MStockCompare } from '../models/MStockCompare';
import { networkService } from '../network.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
interface MWCNO {
  value: string;
  viewValue: string;
}

interface MModel {
  value: string;
  viewValue: string;
}
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Component({
  selector: 'app-compare-pallet',
  templateUrl: './compare-pallet.component.html',
  styleUrls: ['./compare-pallet.component.scss']
})



export class ComparePalletComponent implements OnInit {
  dataPalletCompare: MStockCompare[] = [];
  dataPalletCompareNew: MStockCompare[] = [];
  oldModel: string = '';
  listModel: MModel[] = [
    { value: '1YC', viewValue: '1YC' },
    { value: '2YC', viewValue: '2YC' },
    { value: 'SCR', viewValue: 'SCR' },
    { value: 'STATOR', viewValue: 'ODM STATOR' },
    { value: 'ROTOR', viewValue: 'ODM ROTOR' },
    { value: 'OUTDOOR', viewValue: 'ODM OUTDOOR' },
    { value: 'BMC', viewValue: 'ODM BMC' },
  ];

  listWcno: MWCNO[] = [
    { value: 'DCI', viewValue: 'DCI' },
    { value: 'PDT', viewValue: 'PDT' },
    { value: 'UNW', viewValue: 'UNW' },
    { value: 'RWQ', viewValue: 'RWQ' },
    { value: 'HWH', viewValue: 'HWH' },
    { value: 'RPK', viewValue: 'RPK' },
    { value: 'DEL', viewValue: 'DEL' },
    { value: 'SKO', viewValue: 'SKO' }
  ];
  displayedColumns = ['omodel', 'opltype', 'owmsqty', 'oScanQTY', 'oDiffQTY'];
  model: string = this.listModel[0].value;
  wcno: string = this.listWcno[0].value;
  filter: string = 'ALL';
  dataForExcel = [];
  chips = [
    { name: 'ทั้งหมด', class: 'primary', value: 'ALL', selected: true },
    { name: 'ข้อมูลตรงกัน', class: 'accent', value: 'NODIFF', selected: false },
    { name: 'ข้อมูลไม่ตรงกัน', class: 'warn', value: 'DIFF', selected: false }
  ]
  fileName = "Samplesheet.xlsx";
  constructor(private network: networkService) { };
  ngOnInit() {
    this.getDataAll();
  }

  
  ExportToExcel(){
    this.network.getListForExcel().subscribe({
      next:(res)=>{
        const workBook = XLSX.utils.book_new(); // create a new blank book
        const workSheet = XLSX.utils.json_to_sheet(res);
        XLSX.utils.book_append_sheet(workBook, workSheet, 'WhProductCheck'); // add the worksheet to the book
        var date  = new Date().toLocaleDateString();
        XLSX.writeFile(workBook, 'WhProductCheck_'  + moment(date).format('YYYY-MM-DD') + '.xlsx')
      }
    })
  }
  getDataAll() {
    this.network.getStockCompare(this.model, this.wcno, this.filter).subscribe({
      next: (data) => {
        /*if (this.filter != '') {
          let dataPalletCompareKey: { [index: string]: MStockCompare[] } = {};
          data.forEach(res => {
            var diff = parseFloat(res.oScanQTY) - parseFloat(res.owmsqty);
            if(res.omodel == '1YC25AXD#EA'){
              console.log(this.filter,diff)
            }
            if (typeof dataPalletCompareKey[res.omodel] == 'undefined') {
              dataPalletCompareKey[res.omodel] = [];
            }
            if (this.filter == 'full' && diff >= 0) {
              this.dataPalletCompareNew.push(res);
            } else if (this.filter == 'not' && diff < 0) {
              this.dataPalletCompareNew.push(res);
              dataPalletCompareKey[res.omodel].push(res);
            }
          });
          let palletKey: { [index: string]: number } = {};
          let index: number = 0;
          this.dataPalletCompareNew.forEach(element => {
            if (typeof palletKey[element.omodel] == 'undefined') {
              palletKey[element.omodel] = this.filter == 'full' ? 0 : element.oRowSpan;
            }
            palletKey[element.omodel] = palletKey[element.omodel] + 1;

            // if (this.filter == 'not') {
            //   if (typeof dataPalletCompareKey[element.omodel] == 'undefined') {
            //     dataPalletCompareKey[element.omodel] = [];
            //   }
            //   dataPalletCompareKey[element.omodel].push(element);
            // }
            this.dataPalletCompareNew[index].oRowSpan = this.filter == 'full' ? palletKey[element.omodel] : dataPalletCompareKey[element.omodel].length;
            // if (element.omodel == '1YC25AXD#EA') {
            //   console.log(dataPalletCompareKey[element.omodel].length, dataPalletCompareKey[element.omodel].length, palletKey[element.omodel])
            // }
            index++;
          });

          this.dataPalletCompare = this.dataPalletCompareNew;
          this.dataPalletCompareNew = [];
        } else {
          
        }
        */

        this.dataPalletCompare = data;
      }
    })
  }

  selectedChip(filter: string) {
    this.filter = filter;
    this.getDataAll();
  }

  getRowSpan(loopModel: string) {
    let res = true;
    if (this.oldModel != loopModel || this.dataPalletCompare.length == 1) {
      this.oldModel = loopModel
      res = true;
    } else {
      res = false;
    }
    return res;
  }



}


