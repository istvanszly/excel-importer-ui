import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandsListComponent } from './pages/bands-list/bands-list.component';
import { BandsImportComponent } from './pages/bands-import/bands-import.component';

const routes: Routes = [
    {
        path: 'bands/import',
        component: BandsImportComponent
    },
    {
        path: 'bands/list',
        component: BandsListComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
