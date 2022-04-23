import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  { path: "login", component: LoginComponent },
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent,canActivate: [AuthGuard] },
  { path: "product-add", component: ProductAddComponent,canActivate: [AuthGuard] },
  { path: "product-detail", loadChildren: () =>
  import("./product-detail/product-detail.module").then(
    (m) => m.ProductDetailModule
  )},
  { path: "**", redirectTo: "", pathMatch: "full" },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
