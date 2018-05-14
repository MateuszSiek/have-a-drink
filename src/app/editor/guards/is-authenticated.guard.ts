import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import { User } from 'firebase/app';
import { FirebaseService } from '../../core/services/firebase.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
	constructor(
		private router: Router,
		private fbService: FirebaseService,
	) {
	}

	public canActivate(): Observable<boolean> {
		return this.fbService.getAuthState().pipe(
			take( 1 ),
			map( (user: User | null) => {
				const loggedIn = !!user;
				if ( !loggedIn ) {
					this.router.navigate( ['/editor/login'] );
				}
				return loggedIn;
			} ),
		);
	}
}
