import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WHProductCheck } from './models/WHProductCheck.model';
import { MStockCompare } from './models/MStockCompare';


@Injectable({ providedIn: 'root' })

export class networkService {
  // baseApiUrl :string = 'https://localhost:7177/WhProductCheck/';
  // baseApiUrl: string = 'http://localhost:7288/';
  baseApiUrl: string = 'http://dciweb2.dci.daikin.co.jp/whserviceapi/';
  constructor(private http: HttpClient) { }

  getStockCompare(prdType: string, wcno: string, showType: string): Observable<MStockCompare[]> {
    return this.http.get<MStockCompare[]>(this.baseApiUrl + 'WHProductCheck/pallet/compare/' + prdType + '/' + wcno + '/' + showType);
  }

  getListForExcel():Observable<WHProductCheck[]>{
    return this.http.get<WHProductCheck[]>(this.baseApiUrl + 'WHProductCheck/pallet/getlist');
  }

  // updateScaned(plno: string): Observable<any> {
  //   return this.http.get<any>(this.baseApiUrl + 'WHProductCheck/pallet/scaned/' + plno);
  // }

  getAllPallet(): Observable<WHProductCheck[]> {
    return this.http.get<WHProductCheck[]>(this.baseApiUrl + 'WHProductCheck/pallet/getall');
  }

  getAllFg(): Observable<WHProductCheck[]> {
    return this.http.get<WHProductCheck[]>(this.baseApiUrl + 'WHProductCheck/fg/getall');
  }

  fgCheck(fgNo: string): Observable<WHProductCheck[]> {
    return this.http.get<WHProductCheck[]>(this.baseApiUrl + 'WHProductCheck/fg/view/' + fgNo);
  }

  // addNew(plno: string): Observable<any> {
  //   return this.http.get<any>(this.baseApiUrl + 'WHProductCheck/pallet/add/' + plno);
  // }

  getListPlno(plno: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + 'WHProductCheck/pallet/list/' + plno);
  }


  scanPallet(plno: string, plnoLocation: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + 'WHProductCheck/pallet/scaned/' + plno + '/' + plnoLocation);
  }

  // scanFG(fg: string): Observable<any> {
  //   console.log(this.baseApiUrl + 'WHProductCheck/fg/scaned/' + fg)
  //   return this.http.get<any>(this.baseApiUrl + 'WHProductCheck/fg/scaned/' + fg);
  // }

  // removePlno(plno: string): Observable<any> {
  //   return this.http.get<any>(this.baseApiUrl + 'WHProductCheck/pallet/remove/' + plno);
  // }

  getPlnoDetail(plno: string): Observable<WHProductCheck> {
    return this.http.get<WHProductCheck>(this.baseApiUrl + 'WHProductCheck/pallet/view/' + plno);
  }

  login(emcode: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + 'Employees/emp/' + emcode);
  }


}