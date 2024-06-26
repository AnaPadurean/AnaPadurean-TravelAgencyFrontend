import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CitiesComponent } from './cities.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CitiesComponent}
    ])],
    exports: [RouterModule]
})
export class CitiesRoutingModule { }
