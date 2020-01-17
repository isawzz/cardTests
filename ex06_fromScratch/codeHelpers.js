var elements = {}; //global element collection for resize event
var iconChars;
var timit = new TimeIt('timer init');

function loadIcons(callback) {
	let faChars, gaChars;
	loadYML('/_lib/assets/icons/gameIconCodes.yml', dga => {
		//console.log(dga);
		gaChars = dga;
		loadYML('/_lib/assets/icons/faIconCodes.yml', dfa => {
			//console.log(dfa);
			faChars = dfa;
			iconChars = {};
			for (const k in faChars) {
				iconChars[k] = faChars[k];
			}
			for (const k in gaChars) {
				iconChars[k] = gaChars[k];
			}
			timit.showTime('loaded icons codes');
			callback();
		});
	});
}
function registerElement(ms) {
	//console.log(ms);
	elements[ms.id] = ms;
}
function _addPicto(dParent, key) {
	let pic = picto(key, 0, 0, 50, 50, 'red', 'black');
	dParent.appendChild(pic);
	return pic;
}
function picto(key, x, y, w, h, fg, bg) {
	//key="skiing-nordic";
	let ch = iconChars[key];
	let family = (ch[0] == 'f' || ch[0] == 'F') ? 'pictoFa' : 'pictoGame';
	let text = String.fromCharCode('0x' + ch);
	let d = document.createElement('div');
	d.style.textAlign = 'center';
	d.style.fontFamily = family;
	d.style.fontWeight = 900;
	d.style.fontSize = h;
	d.style.backgroundColor = bg;
	d.style.color = fg;
	d.innerHTML = text;
	return d;
}
function __pictoG(key, x, y, w, h, fg, bg) {
	//zuerst als g
	//key="skiing-nordic";
	let ch = iconChars[key];
	let family = (ch[0] == 'f' || ch[0] == 'F') ? 'pictoFa' : 'pictoGame';
	let text = String.fromCharCode('0x' + ch);
	//code for cat=='g':
	// if (isdef(bg)) this.rect({ w: w, h: h, fill: bg, x: x, y: y });
	// // this.text({txt:'\uf520',family:'picto',x:x,y:y,fz:h,fill:fg});
	// this.text({ txt: text, family: family, weight: 900, x: x, y: y, fz: h, fill: fg });
	// this.orig.fg = fg;
	// //this.text({ className:'overlay', txt: text, family: family, weight: 900, x: x, y: y, fz: h, fill: fg });
	// return this;
}


class DeckMS {
	constructor(oid, o) {
		this.o = o;
		this.oid = this.id = oid;
		this.elem = document.createElement('div');
		this.elem.id = oid;
		o.mount(this.elem);
		registerElement(this);
	}
	detach() {
		if (this.parent) {
			// remove from last parent!
			this.parent.removeChild(this.elem);
			this.parent = null;
		}
	}
	attachTo(div) {
		this.detach();
		this.parent = div;
		div.appendChild(this.elem);
		this.center();
	}
	center() {
		if (this.parent) {
			let d = this.elem;
			let wParent = this.parent.offsetWidth;
			let wElem = this.o.cards[0].elem.offsetWidth; //this.elem.offsetWidth;
			let hParent = this.parent.offsetHeight;
			let hElem = this.o.cards[0].elem.offsetHeight; //this.elem.offsetHeight;
			//console.log(wParent, wElem, hParent, hElem);
			d.style.position = 'relative';
			this.centerX = (wParent - wElem) / 2;
			this.centerY = (hParent - hElem) / 2;
			this.w = wElem;
			this.h = hElem;
			d.style.left = '' + this.centerX + 'px';
			d.style.top = '' + this.centerY + 'px';
		}
	}
	setPos(x, y) {
		this.elem.style.left = '' + (this.centerX + x) + 'px';
		this.elem.style.top = '' + (this.centerY + y) + 'px';
	}
}

function addDeckTo(deck, domel, id, flip = false, drag = false) {
	if (nundef(id)) id = getUID();
	clearElement(domel);
	let ms = new DeckMS(id, deck);
	ms.attachTo(domel);
	if (flip) enableFlipForDeck(ms.o);
	if (drag) enableDragForDeck(ms.o);
	return ms;
}
function addGridTo(d, rows, cols, gap = '2px') {
	console.log(d, rows, cols, gap);
	//need to have defined css vars and grid-item class!!!
	//see my.css
	d.classList.add('gridContainer'); // see _lib/css/my.css
	d.style.setProperty('--grid-rows', rows);
	d.style.setProperty('--grid-cols', cols);
	d.style.setProperty('--grid-gap', gap);
	let cells = [];
	for (let r = 0; r < rows; r++) {
		cells[r] = [];
		for (let c = 0; c < cols; c++) {
			let cell = document.createElement("div");
			console.log(cell)
			cell.innerText = (r + ',' + c);
			d.appendChild(cell).className = "grid-item";
			cells[r].push(cell);

		}
	}
	return cells;
}
function enableFlipForDeck(d) {
	d.cards.forEach(function (card, i) {
		card.enableFlipping();
	});
}
function enableDragForDeck(d) {
	d.cards.forEach(function (card, i) {
		card.enableDragging();

	});
}
function makeUnitString(nOrString, unit = 'px', defaultVal = '100%') {
	if (nundef(nOrString)) return defaultVal;
	if (isNumber(nOrString)) nOrString = '' + nOrString + unit;
	return nOrString;
}

//#region window resize
function displayWindowSize() {
	// Get width and height of the window excluding scrollbars
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;

	// Display result inside a div element
	//console.log("Width: " + w + ", " + "Height: " + h);
	for (const msId in elements) {
		elements[msId].center();
	}
}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", displayWindowSize);

// Calling the function for the first time
displayWindowSize();

//#endregion

//#region tests
function test07() {
	let div1 = addDivToBody(100, 50, '%', 'blue');
	let div2 = addDivToBody(100, 50, '%', 'green');

	var deck1 = DeckA();
	let ms1 = new DeckMS('deck1', deck1);
	ms1.attachTo(div1);

	deck1.cards.forEach(function (card, i) {
		card.enableDragging();
		card.enableFlipping();
	});

	var deck2 = DeckA();
	let ms2 = new DeckMS('deck2', deck2);
	ms2.attachTo(div2);

}
function test08() {
	let div1 = addDivToBody(100, 50, '%', 'blue');
	let div2 = addDivToBody(100, 50, '%', 'green');

	var deck1 = DeckA();
	let ms1 = new DeckMS('deck1', deck1);
	ms1.attachTo(div1);

	let cells = addGridTo(div2, 2, 2, '10px');
	let d = cells[0][1];
	clearElement(d);
	var deck2 = DeckA();
	let ms2 = new DeckMS('deck2', deck2);
	ms2.attachTo(d);
	//ms2.center();

	//d.innerHTML = '';

}
function test09() {
	let div1 = addDivToBody(100, 50, '%', 'blue');
	let div2 = addDivToBody(100, 50, '%', 'green');

	let rows1 = 3;
	let cols1 = 3;

	let cells = addGridTo(div2, rows1, cols1, '10px');
	console.log(cells);
	for (let i = 0; i < rows1; i++) {
		for (let j = 0; j < cols1; j++) {
			let cell = cells[i][j];
			clearElement(cell);
			let ms = new DeckMS('d' + rows1 + '_' + cols1, DeckA());
			ms.attachTo(cell);
			enableFlipForDeck(ms.o);
			enableDragForDeck(ms.o);

		}
	}
}
function test10() {
	let rows1 = 3;
	let cols1 = 3;

	let cells = addGridTo(document.body, rows1, cols1, '10px');
	console.log(cells);
	for (let i = 0; i < rows1; i++) {
		for (let j = 0; j < cols1; j++) {
			let cell = cells[i][j];
			clearElement(cell);
			let ms = new DeckMS('d' + rows1 + '_' + cols1, DeckA());
			ms.attachTo(cell);
			enableFlipForDeck(ms.o);
			enableDragForDeck(ms.o);

		}
	}
}
function test11() {
	//add deck to body!
	let ms = addDeckTo(Deck.DeckB(), document.body, 'discardPile', true, true);
	ms.setPos(0, -300);
}

//#endregion

//#region muell
function placeDeck(deck, cont, x, y) {
	deck.unmount();
	deck.mount(cont);
	deck.translate(x, y);
}
//#endregion