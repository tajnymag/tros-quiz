export function randomInteger(from: number, to: number) {
	const min = Math.ceil(from);
	const max = Math.floor(to);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function serializeMap(map: Map<any, any>): string {
	return JSON.stringify([...map.entries()]);
}

export function deserializeMap(serializedMap: string): Map<any, any> {
	return new Map(JSON.parse(serializedMap));
}

export function saveMap(key: string, map: Map<any, any> | string): void {
	if (typeof map === 'string') {
		localStorage.setItem(key, map);
	} else {
		localStorage.setItem(key, serializeMap(map));
	}
}

export function loadMap(key: string): Map<any, any> | null {
	const serializedMap = localStorage.getItem(key);

	if (serializedMap) {
		return deserializeMap(serializedMap);
	} else {
		return null;
	}
}