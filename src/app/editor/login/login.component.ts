import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FirebaseService } from '../../core/services/firebase.service';

@Component({
	selector   : 'app-login',
	templateUrl: './login.component.html',
	styleUrls  : [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

	public form: FormGroup;

	constructor( private fbService: FirebaseService, private fb: FormBuilder, private router: Router, ) { }

	public ngOnInit(): void {
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
			if ( error.code === 'auth/wrong-password' ) {
				alert('Wrong password.');
			} else {
				alert(error.message);
			}
		});
	}
}
