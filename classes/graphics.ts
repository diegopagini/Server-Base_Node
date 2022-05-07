/** @format */

export class GraphicData {
	private months: string[] = ['january', 'february', 'march', 'april'];
	private values: number[] = [0, 0, 0, 0];

	constructor() {}

	/**
	 * Método para obtener los datos de la gráfica.
	 * @returns datasets: [{ data: number[]; label: string }], labels: string[]
	 */

	getGraphicData(): {
		datasets: [{ data: number[]; label: string }];
		labels: string[];
	} {
		return {
			datasets: [{ data: this.values, label: 'sales' }],
			labels: this.months,
		};
	}

	/**
	 * Método para actualizar un valor de la gráfica.
	 * @param {string} month
	 * @param {number} value
	 * @returns datasets: [{ data: number[]; label: string }], labels: string[]
	 */

	changeValue(
		month: string,
		value: number
	): {
		datasets: [{ data: number[]; label: string }];
		labels: string[];
	} {
		month = month.toLowerCase().trim();
		for (let i in this.months) {
			if (this.months[i] === month) {
				this.values[i] += value;
			}
		}

		return this.getGraphicData();
	}
}
