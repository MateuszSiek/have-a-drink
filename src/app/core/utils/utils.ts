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
