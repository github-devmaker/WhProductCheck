import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparePalletComponent } from './compare-pallet/compare-pallet.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { ScanFgComponent } from './scan-fg/scan-fg.component';
import { ScanPalletComponent } from './scan-pallet/scan-pallet.component';

const routes: Routes = [
  { path: '', redirectTo: '/scan/pallet', pathMatch: 'full' },
  // {path:'',component:LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'scan/pallet', component: ScanPalletComponent },
  { path: 'fg/view', component: ScanFgComponent },
  { path: 'login', component: LoginComponent },
  { path: 'compare', component: ComparePalletComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
