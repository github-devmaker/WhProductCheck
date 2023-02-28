import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogDeleteComponent, DialogNewComponent, ScanPalletComponent } from './scan-pallet/scan-pallet.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HideKeyboardModule } from 'hide-keyboard';
import { ComparePalletComponent } from './compare-pallet/compare-pallet.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ScanFgComponent } from './scan-fg/scan-fg.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ErrorComponent } from './error/error.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ScanPalletComponent,
    ToolbarComponent,
    DialogDeleteComponent,
    DialogNewComponent,
    ComparePalletComponent,
    ScanFgComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    HideKeyboardModule,
    MatChipsModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatButtonToggleModule

  ],
  providers: [MatButtonModule, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  exports: [MatButtonModule],
})
export class AppModule { }
