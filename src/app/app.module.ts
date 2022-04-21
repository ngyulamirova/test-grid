import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { TitleTemplateRendererComponent } from './render/title-template-renderer/title-template-renderer.component';
import { SpinnerRendererComponent } from './render/spinner-renderer/spinner-renderer.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

@NgModule({
  declarations: [AppComponent, TitleTemplateRendererComponent, SpinnerRendererComponent],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([TitleTemplateRendererComponent, SpinnerRendererComponent]),
    NzSpinModule,
    NzIconModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    NzModalModule,
  ],
  providers   : [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
