import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {  NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { OtherSanitizerPipe } from "../pipes/other-sanitizer.pipe";
import { ProductDetailComponent } from "./product-detail.component";

@NgModule({
    declarations: [ProductDetailComponent,OtherSanitizerPipe],
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