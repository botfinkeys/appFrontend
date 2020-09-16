import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpasswordPage } from './editpassword.page';

const routes: Routes = [
  {
    path: '',
    component: EditpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpasswordPageRoutingModule {}
