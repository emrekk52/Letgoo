import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {  NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductDetailComponent } from "./product-detail.component";

@NgModule({
    declarations: [ProductDetailComponent],
    imports: [
      CommonModule,
      FormsModule,
      NgbModule,  
        
      RouterModule.forChild([
        {
          path: "",
          component: ProductDetailComponent,
        },
      ]),
    ],
  })
  export class ProductDetailModule { }