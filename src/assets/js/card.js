
class Card
{
	#card;
	#character;

	constructor(character)
	{
		this.#character = character;
		this.#card = $('<button></button>', {
			class: 'col card m-2 p-0 char-card',
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
			}).text(`: ${character.species}`)
			.prepend($('<b>Species</b>'));

			const status = $('<li></li>', {
				class: 'list-group-item text-capitalize',
			}).text(`: ${character.status}`)
			.prepend($('<b>Status</b>'));

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

