function test_1(){
	deck.mount(d);

}
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
function testKnight() {
	let c = makeCard(0, 'hallo');
	c.mount(d);
	c.setSide('front');
	blank(c);
	setTitle(c, 'Knight')
	setText(c, 'You can play this card whenever you want to move the robber!')
	moveTo(c, -100, -100);

}
function testDeal2(){
	deck.mount(d);
	bDeal.addEventListener('click', function () {deck.pokerN(1);});
	makeTestButton('deal2',()=>deck.pokerN(2),topbar1);

}
function makeTestButton(caption,func,container){
	let b = document.createElement('button')
	b.textContent = capitalize(caption);
	container.appendChild(b)
	b.addEventListener('click', func);
	return b;
}
function showCards(cards,x,y){
	let i=0;
	for(const c of cards){
		cards.pokerN()
	}
}
function removeCards(deck){
	return removeTopNCards(deck,getNumCards(deck));
}
function removeTopNCards(deck,n){
	n = Math.min(getNumCards(deck),n);
	return deck.cards.splice(iFrom,-n).reverse();
}
function removeTopNCards(deck,n){
	n = Math.min(getNumCards(deck),n);
	return deck.cards.splice(-n);
}
function removeNCardsFrom(deck,iFrom,n){
	n = Math.min(getNumCards(deck),n);
	return deck.cards.splice(iFrom,n);
}
function removeCardsFromTo(deck,iFrom,iTo){
	let n=iTo-iFrom+1;
	return removeNCardsFrom(deck,iFrom,n);
}
function getNumCards(deck){return deck.cards.length;}
function removeAllCards(){return removeNCardsFrom(deck,0);}







