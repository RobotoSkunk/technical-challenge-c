
class Card
{
	#card;
	#character;

	constructor(character)
	{
		this.#character = character;
		this.#card = $('<div></div>', {
			class: 'col card m-2 p-0',
			style: 'min-width: 302px; max-width: 302px',
		});

		const image = $('<img>', {
			class: 'card-img-top',
			src: character.image,
			alt: `Picture of ${character.name}`,
			width: '300',
			height: '300',
		});

		const header = $('<div></div>', {
			class: 'card-header',
		});
		{
			const title = $('<h5></h5>', {
				class: 'card-title',
			}).text(character.name);

			header.append(title);
		}

		const body = $('<div></div>', {
			class: 'card-body',
		});
		{
			const ul = $('<ul></ul>', {
				class: 'list-group list-group-flush',
			});

			const species = $('<li></li>', {
				class: 'list-group-item',
			}).text(`Species: ${character.species}`);

			const status = $('<li></li>', {
				class: 'list-group-item',
			}).text(`Status: ${character.status}`);

			ul.append(species, status);
			body.append(ul);
		}

		this.#card.append(image, header, body);
	}

	get element()
	{
		return this.#card;
	}

	get data()
	{
		return this.#character;
	}
}

