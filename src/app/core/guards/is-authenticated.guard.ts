import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { User } from 'firebase';

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
