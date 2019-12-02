function makeCard({ i: i, text: text }) {
	return DeckA.Card(i, text);
}
function moveTo(card, dx, dy) { card.animateTo({ delay: 1000, duration: 500, ease: 'quartOut', x: dx, y: dy }) }

function blank(card){clearElement(card.elem);}
function setTitle(card,title,fz='12'){
	let el=card.elem;
	let text = el.innerHTML;
	let dTitle=document.createElement('div');
	dTitle.style.textAlign = 'center';
	clearElement(el);
	el.appendChild(dTitle);
	dTitle.style.color = 'red';
	dTitle.innerHTML = title;
	dTitle.style.fontSize = fz+'px';
	if (!empty(text)) setText(card,text)
}
function setText(card,text,fz='8'){
	let el=card.elem;
	if (el.children.length > 1) {
		let elTitle = el.firstChild;
		clearElement(el);
		el.appendChild(elTitle);
	}
	let dText=document.createElement('div');
	el.appendChild(dText);
	dText.style.color = 'black';
	dText.innerHTML = text;
	dText.style.margin = '8px';
	dText.style.fontSize = fz+'px';
}



