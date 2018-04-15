export function getNextInArray<T>( array: T[], item: T, findBy?: string ): T | undefined {
	const arrayLength = array.length;
	const indexOfItem = findIndexOf<T>(array, item, findBy);
	if ( indexOfItem < 0 ) { return undefined; }
	return array[ (indexOfItem + 1) % arrayLength ];
}

export function getPrevInArray<T>( array: T[], item: T, findBy?: string ): T | undefined {
	const arrayLength = array.length;
	const indexOfItem = findIndexOf<T>(array, item, findBy);
	if ( indexOfItem < 0 ) { return undefined; }
	if ( indexOfItem === 0 ) { return array[ arrayLength - 1 ]; }
	return array[ indexOfItem - 1 ];
}

function findIndexOf<T>( array: T[], item: T, findBy?: string ): number {
	return array.findIndex(( d: T ) => {
		return findBy ? ((<any>d)[ findBy ] === (<any>item)[ findBy ]) : (d === item);
	});
}

export function updateObjectInArray<T>( array: T[], object: T, findBy?: string ): T[] {
	return array.map(( item: T ) => {
		if ( findBy ? (<any>item)[ findBy ] !== (<any>object)[ findBy ] : item !== object ) {
			return item;
		}
		return Object.assign({}, item, object);
	});
}

export function removeObjectFromArray<T>( array: T[], object: T, findBy?: string ): T[] {
	const objectIdx = array.findIndex(( item: T ) => findBy ? (<any>item)[ findBy ] === (<any>object)[ findBy ] : item === object);
	if ( objectIdx === -1 ) {
		return [ ...array ];
	}
	return [
		...array.slice(0, objectIdx),
		...array.slice(objectIdx + 1)
	];
}