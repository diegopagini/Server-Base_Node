/** @format */

import { Marker } from './marker';

export class Map {
	private markers: { [key: string]: Marker } = {};

	/**
	 * Método para obtener nuestros marcadores.
	 * @returns '{ [key: string]: Marker }'
	 */

	getMarkers(): { [key: string]: Marker } {
		return this.markers;
	}

	/**
	 * Método para eliminar un marcador de nuestra lista de marcadores.
	 * @param {string} id
	 */

	deleteMarker(id: string): { [key: string]: Marker } {
		/**
		 * delete es la forma en que javascript elimina propiedades de un objeto.
		 */
		delete this.markers[id];
		return this.getMarkers();
	}

	/**
	 * Método para mover un marcador.
	 * @param {Marker} marker
	 */

	moveMarker(marker: Marker): void {
		this.markers[marker.id].lng = marker.lng;
		this.markers[marker.id].lat = marker.lat;
	}

	/**
	 * Método para agregar un marcador.
	 * @param {Marker} marker
	 */

	addMarker(marker: Marker): void {
		this.markers[marker.id] = marker;
	}
}
