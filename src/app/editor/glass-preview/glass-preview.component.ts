import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Glass } from '../../core/models/visualisation';

@Component( {
	selector: 'app-glass-preview',
	templateUrl: './glass-preview.component.html',
	styleUrls: [ './glass-preview.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
} )
export class GlassPreviewComponent {
	@Input() public glass: Glass | undefined;

	constructor() { }

}
