
class Card
{
	#card;

	constructor(character)
	{
		this.#card = $('<button></button>', {
			class: 'col card m-2 p-0 char-card',
			'data-bs-toggle': 'modal',
			'data-bs-target': '#modal',
		});

		// The picture has a fixed size to avoid layout shift when loading
		const image = $('<img>', {
			class: 'card-img-top portrait',
			src: character.image,
			alt: `Picture of ${character.name}`,
			width: '300',
			height: '300',
			draggable: 'false',
		});

		const header = $('<div></div>', {
			class: 'card-header',
		});
		{
			const title = $('<h5></h5>', {
				class: 'card-title fw-bold',
			}).text(character.name);

			header.append(title);
		}

		const body = $('<div></div>', {
			class: 'card-body',
		});
		{
			const ul = $('<ul></ul>', {
				class: 'list-group list-group-flush text-start',
			});

			const species = $('<li></li>', {
				class: 'list-group-item',
			}).text(`: ${character.species}`)
			.prepend($('<b>Species</b>'));

			const status = $('<li></li>', {
				class: 'list-group-item text-capitalize',
			}).text(`: ${character.status}`)
			.prepend($('<b>Status</b>'));

			ul.append(species, status);
			body.append(ul);
		}

		this.#card
			.append(image, header, body)
			.on('click', () =>
			{
				$('#modal-title').text(character.name);
				$('#modal-picture').attr('src', character.image);

				$('#modal-content-species').text(character.species);
				$('#modal-content-status').text(character.status);
				$('#modal-content-gender').text(character.gender);
				$('#modal-content-origin-name').text(character.origin.name);
				$('#modal-content-location-name').text(character.location.name);
			});
	}

	get element()
	{
		return this.#card;
	}
}

// Being sincere, a class was useless in this case.
