import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FirebaseService } from '../../core/services/firebase.service';

@Component({
	selector   : 'app-login',
	templateUrl: './login.component.html',
	styleUrls  : [ './login.component.scss' ],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

	public form: FormGroup;

	constructor( private fbService: FirebaseService, private fb: FormBuilder, private router: Router, ) {
		this.form = this.fb.group({
			email   : new FormControl('', [ Validators.required, Validators.minLength(3), Validators.email ]),
			password: new FormControl('', [ Validators.required, Validators.minLength(5) ]),
		});
	}

	public login(): void {
		this.fbService.login(this.form.value.email, this.form.value.password)
		.then(() => {
			this.router.navigate([ '/editor' ]);
		})
		.catch(( error: any ) => {
			console.log(error);
			if ( error.code === 'auth/wrong-password' ) {
				window.alert('Wrong password.');
			} else {
				window.alert(error.message);
			}
		});
	}
}
