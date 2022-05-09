/** @format */

export class Marker {
	id: string;
	name: string;
	lng: number;
	lat: number;
	color: string;
	constructor(
		id: string,
		name: string,
		lng: number,
		lat: number,
		color: string
	) {
		this.id = id;
		this.name = name;
		this.lng = lng;
		this.lat = lat;
		this.color = color;
	}
}
