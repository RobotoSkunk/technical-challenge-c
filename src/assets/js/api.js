
class API
{
	static #baseUrl = 'https://rickandmortyapi.com/api';


	///// PRIVATE METHODS /////

	/**
	 * Executes a GET query to the given endpoint.
	 * @param {string} endpoint The endpoint to fetch from, excluding the "/" from the start.
	 * @param {object} data The data to send to.
	 */
	static async #get(endpoint, data)
	{
		return new Promise((resolve, reject) =>
		{
			$.ajax({
				type: 'GET',
				url: `${API.#baseUrl}/${endpoint}`,
				data: data ?? {},
				dataType: 'json',
				success: (response) => {
					resolve(response);
				},
				error: (error) => {
					reject(error);
				},
			});
		});
	}


	///// PUBLIC METHODS /////

	/**
	 * 
	 * @param {number} page 
	 */
	static async fetchAll(page)
	{
		const apiResponse = await API.#get('character', { page });

		return apiResponse;
	}
}
