function test0() {
	deck.cards.forEach(function (card, i) { card.enableDragging(); card.enableFlipping(); });

	console.log(typeof (deck.cards), typeof (deck), deck.cards)
	console.log(deck.cards[0])
	let c = deck.cards[0]
	c.text = 'hallo'
	c.elem.innerHTML = 'Knight'
	console.log(c)

	console.log('___________________')
	let d = document.getElementById('container')
	deck.mount(d)
	//draw 1 card
	//how can I scale a card?
	c.elem.style[transform] = 'scale(4)';

	//on mouseover card, scale card and bring to front
	let maxZIndex = 0;


}
