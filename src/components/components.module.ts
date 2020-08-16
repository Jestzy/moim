import { NgModule,Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form';
import { OnlineUserComponent } from './online-users/online-users.component';
@NgModule({
	declarations: [LoginFormComponent,
	OnlineUserComponent],
	imports: [],
	exports: [LoginFormComponent,
	OnlineUserComponent]
})
export class ComponentsModule {}
