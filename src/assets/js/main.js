
const pageLabel = $('#page');
const maxPagesLabel = $('#max-pages');
const charactersContainer = $('#characters-list');


function generateCard(character)
{
	const domElement = $('<div></div>', { class: 'col' }).text(character.name);
	const imgElement = $('<img>', { src: character.image });

	domElement.append(imgElement);

	return domElement;
}

function getNewRow()
{
	let row = $('<div></div>', { class: 'row' });
	charactersContainer.append(row);

	return row;
};

/**
 * @param {number} page 
 */
async function loadCharacters(page = 1)
{
	let apiResponse;

	try {
		apiResponse = await API.fetchAll(page);
	} catch (error) {
		console.error(error);
		return;
	}

	let columnCount = 0;
	let currentRow = getNewRow();
	charactersContainer.empty();

	pageLabel.text(page);
	maxPagesLabel.text(apiResponse.info.pages);

	for (const character of apiResponse.results) {
		const card = generateCard(character);
		currentRow.append(card);

		if (++columnCount >= 3) {
			columnCount = 0;
			currentRow = getNewRow();
		}
	}
}


(async () =>
{
	await loadCharacters();
})();
