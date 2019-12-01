function _createDeck({hasJokers=false}={}){
	let deck=null;
	if (hasJokers){deck = Deck(true);}
	else{deck=Deck();}

	deck.isFaceDown = true;
	return deck;
}
function createDeck() { return Deck(); }
function createStandardDeck(){return _createDeck();}
function createDeckWithJokers(){return _createDeck({hasJokers:true});}

function attachTo(div,deck) { deck.mount(div); }

function explode(deck, w, h) {
	deck.cards.forEach(function (card, i) {
		card.setSide('front')

		// explode
		card.animateTo({
			delay: 1000 + i * 2, // wait 1 second + i * 2 ms
			duration: 500,
			ease: 'quartOut',

			x: Math.random() * w - w / 2, //totalWidth - half damit zentriert
			y: Math.random() * h - h / 2

			// x: Math.random() * window.innerWidth - window.innerWidth / 2,
			// y: Math.random() * window.innerHeight - window.innerHeight / 2
		})
	});
}

function turnDeckFaceUp(deck){if (deck.isFaceDown){deck.flip();deck.isFaceDown=false;}}

function topCard(deck){return deck.cards[0];}

function deal1(deck, w, h) {
	deck.cards.forEach(function (card, i) {
		card.setSide('front')

		// explode
		card.animateTo({
			delay: 1000 + i * 2, // wait 1 second + i * 2 ms
			duration: 500,
			ease: 'quartOut',

			x: Math.random() * w - w / 2, //totalWidth - half damit zentriert
			y: Math.random() * h - h / 2

			// x: Math.random() * window.innerWidth - window.innerWidth / 2,
			// y: Math.random() * window.innerHeight - window.innerHeight / 2
		})
	});
}


