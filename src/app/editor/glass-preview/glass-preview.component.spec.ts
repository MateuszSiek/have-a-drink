import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassPreviewComponent } from './glass-preview.component';
import { MockedGlasses } from '../../../../testing/fixtures/glasses';

describe( 'GlassPreviewComponent', () => {
	let component: GlassPreviewComponent;
	let fixture: ComponentFixture<GlassPreviewComponent>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			declarations: [ GlassPreviewComponent ]
		} );
		TestBed.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( GlassPreviewComponent );
		component = fixture.componentInstance;
		component.glass = MockedGlasses[ 0 ];
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );

	it( 'should render svg', () => {
		const paths = fixture.nativeElement.querySelectorAll( 'svg path' );
		expect( paths.length ).toEqual( 2 );
	} );
} );
