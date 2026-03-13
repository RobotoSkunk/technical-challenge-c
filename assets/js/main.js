
const charactersContainer = $('#characters-list');

let page = 1;
let maxPage = 1;
let nameFilter = '';
let inputTimeoutId = 0;


async function loadCharacters()
{
	let apiResponse;
	charactersContainer.empty();

	$('#loader').removeClass('d-none');
	$('#error').addClass('d-none');

	try {
		apiResponse = await API.fetchAll(page, nameFilter);
	} catch (error) {
		console.error(error);

		$('#error')
			.removeClass('d-none')
			.text(`: ${error.responseJSON ? error.responseJSON.error : 'Something went wrong, try reloading the page.'}`)
			.prepend($('<b>Error</b>'))
			.prepend($('<i class="bi bi-exclamation-circle-fill p-1"></i>'));
	} finally {
		$('#loader').addClass('d-none');
	}

	if (apiResponse) {
		maxPage = apiResponse.info.pages;

		$('#page').text(page);
		$('#max-pages').text(maxPage);

		for (const character of apiResponse.results) {
			const card = new Card(character);
			charactersContainer.append(card.element);
		}
	}
}

loadCharacters();


// Events
$('#page-next').on('click', async () =>
{
	if (++page > maxPage) {
		page--;
		return;
	}

	await loadCharacters();
});

$('#page-prev').on('click', async () =>
{
	if (--page <= 0) {
		page++;
		return;
	}

	await loadCharacters();
});

$('#search').on('input', (ev) =>
{
	if (inputTimeoutId) {
		clearTimeout(inputTimeoutId);
	}

	page = 1;
	nameFilter = ev.currentTarget.value;

	inputTimeoutId = setTimeout(async () =>
	{
		await loadCharacters();
	}, 250);
});
