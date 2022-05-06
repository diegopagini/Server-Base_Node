/** @format */

export class User {
	id: string;
	name: string;
	room: string;

	constructor(id: string) {
		this.id = id;
		this.name = 'no-name';
		this.room = 'no-room';
	}
}
