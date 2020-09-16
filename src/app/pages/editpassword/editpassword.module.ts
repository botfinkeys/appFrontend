import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { EditpasswordPageRoutingModule } from './editpassword-routing.module';

import { EditpasswordPage } from './editpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    EditpasswordPageRoutingModule
  ],
  declarations: [EditpasswordPage]
})
export class EditpasswordPageModule {}
