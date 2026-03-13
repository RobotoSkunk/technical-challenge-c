
const pageLabel = $('#page');
const maxPagesLabel = $('#max-pages');
const charactersContainer = $('#characters-list');

let page = 1;
let maxPage = 1;

function getNewRow()
{
	let row = $('<div></div>', { class: 'row' });
	charactersContainer.append(row);

	return row;
};

async function loadCharacters()
{
	let apiResponse;

	try {
		apiResponse = await API.fetchAll(page);
	} catch (error) {
		console.error(error);
		return;
	}

	charactersContainer.empty();

	maxPage = apiResponse.info.pages;

	pageLabel.text(page);
	maxPagesLabel.text(maxPage);

	for (const character of apiResponse.results) {
		const card = new Card(character);
		charactersContainer.append(card.element);
	}
}

loadCharacters();


$('#page-next').on('click', async () =>
{
	if (++page > maxPage) {
		page--;
	}

	await loadCharacters();
});

$('#page-prev').on('click', async () =>
{
	if (--page <= 0) {
		page++;
	}

	await loadCharacters();
});
