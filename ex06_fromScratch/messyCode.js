// #region new functions that where already here
function createDeck() { return DeckA(); }
function attachTo(div, deck) { deck.mount(div); }

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
function _createDeck({ hasJokers = false } = {}) {
	let deck = null;
	if (hasJokers) { deck = DeckA(true); }
	else { deck = DeckA(); }

	deck.isFaceDown = true;
	return deck;
}
function createStandardDeck() { return _createDeck(); }
function createDeckWithJokers() { return _createDeck({ hasJokers: true }); }
function turnDeckFaceUp(deck) { if (deck.isFaceDown) { deck.flip(); deck.isFaceDown = false; } }
function topCard(deck) { return deck.cards[0]; }
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
//#endregion

//#region globals & buttons

/* global DeckA */
var prefix = DeckA.prefix
var transform = prefix('transform')
var translate = DeckA.translate

var container1 = document.getElementById('container')
var topbar1 = document.getElementById('topbar')

var currentDeck;

//#endregion

//#region buttons
var bSort = document.createElement('button')
var bShuffle = document.createElement('button')
var bBySuit = document.createElement('button')
var bFan = document.createElement('button')
var bPoker = document.createElement('button')
var bFlip = document.createElement('button')

bShuffle.textContent = 'Shuffle'
bSort.textContent = 'Sort'
bBySuit.textContent = 'By suit'
bFan.textContent = 'Fan'
bPoker.textContent = 'Poker'
bFlip.textContent = 'Flip'

topbar1.appendChild(bFlip)
topbar1.appendChild(bShuffle)
topbar1.appendChild(bBySuit)
topbar1.appendChild(bFan)
topbar1.appendChild(bPoker)
topbar1.appendChild(bSort)

bShuffle.addEventListener('click', function () {
	currentDeck.shuffle()
	currentDeck.shuffle()
})
bSort.addEventListener('click', function () {
	deck.sort()
})
bBySuit.addEventListener('click', function () {
	deck.sort(true) // sort reversed
	deck.bysuit()
})
bFan.addEventListener('click', function () {
	deck.fan()
})
bFlip.addEventListener('click', function () {
	deck.flip()
})
bPoker.addEventListener('click', function () {
	deck.queue(function (next) {
		deck.cards.forEach(function (card, i) {
			setTimeout(function () {
				card.setSide('back')
			}, i * 7.5)
		})
		next()
	})
	deck.shuffle()
	deck.shuffle()
	deck.poker()
})


//#endregion

//#region helpers
function addDivToBody(w, h, unit = 'px') {
	let d1 = document.createElement('div');
	document.body.appendChild(d1);
	d1.style.setProperty('width', makeUnitString(w, unit));
	d1.style.setProperty('height', makeUnitString(h, unit));
	return d1;
}
function addGridToBody(rows, cols) {
	let d = addDivToBody();
	d.classList.add('gridContainer'); // see _lib/css/my.css
	makeRows(d, rows, cols);
	return d;
}
function describe(d) {
	console.log('_________________');
	console.log('innerHTML', d.innerHTML);
	console.log('firstChild', d.firstChild);
	console.log('d', d)
}
function makeRows(d, rows, cols, gap = '2px') {
	//need to have defined css vars and grid-item class!!!
	//see my.css
	d.style.setProperty('--grid-rows', rows);
	d.style.setProperty('--grid-cols', cols);
	d.style.setProperty('--grid-gap', gap);
	for (cols = 0; cols < (rows * cols); cols++) {
		let cell = document.createElement("div");
		cell.innerText = (cols + 1);
		d.appendChild(cell).className = "grid-item";
	};
};
function makeCells(d, rows, cols, gap = '2px') {
	//need to have defined css vars and grid-item class!!!
	//see my.css
	d.style.setProperty('--grid-rows', rows);
	d.style.setProperty('--grid-cols', cols);
	d.style.setProperty('--grid-gap', gap);
	let cells = [];
	for (rows = 0; rows < rows; rows++) {
		cells[rows] = [];
		for (cols = 0; cols < cols; cols++) {
			let cell = document.createElement("div");
			cell.innerText = (rows + ',' + cols);
			d.appendChild(cell).className = "grid-item";
			cells[rows].push(cell);

		}
	}
	return cells;
}
function makeUnitString(nOrString, unit = 'px', defaultVal = '100%') {
	if (nundef(nOrString)) return defaultVal;
	if (isNumber(nOrString)) nOrString = '' + nOrString + unit;
	return nOrString;
}
function makeGrid9(d, centerW = '3fr', centerH = '3fr', gap = '2px') {
	//need to have defined css vars and grid-item class!!!
	//see my.css
	d.style.setProperty('--grid_center_w', makeUnitString(centerW, 'fr'));
	d.style.setProperty('--grid_center_h', makeUnitString(centerH, 'fr'));
	d.style.setProperty('--grid-gap', gap);
	d.classList.add('grid9');
	let cells = [];
	for (rows1 = 0; rows1 < 3; rows1++) {
		cells[rows1] = [];
		for (cols1 = 0; cols1 < 3; cols1++) {
			let cell = document.createElement("div");
			cell.innerText = (rows1 + ',' + cols1);
			d.appendChild(cell).className = "grid-item";
			cells[rows1].push(cell);

		}
	}
	return cells;
}
function extractPixel(str) {
	//only deals with unit px here!!!
	if (isNumber(str)) return str;
	else return firstNumber(str);
}
//#endregion

//#region API
function addGridTo(d, rows, cols) {
	d.classList.add('gridContainer'); // see _lib/css/my.css
	return makeCells(d, rows, cols);
}
function addGrid9To(d, centerW, centerH, gap = '2px') {
	return makeGrid9(d, centerW, centerH, gap);
}
function addDeckTo(d) {
	//display a deck centered in d and fitting d
	let x = d.offsetWidth / 2;
	let y = d.offsetHeight / 2;
	d.id = 'myContainer';
	let deck = createDeckWithJokers();
	attachTo(d, deck);


}
function addCardTo(d) {

}
function addHandTo(d) {

}
function parseComplexStyleProperty(str) {
	//for str == "translateX(-50%) scale(1.2)"
	//returns {translateX: "-50%", scale: "1.2"}
	var regex = /(\w+)\((.+?)\)/g,
		transform = {},
		match;

	while (match = regex.exec(str))
		transform[match[1]] = match[2];

	return transform;
}
function getTransformInfoDOM(d) {
	let info = parseComplexStyleProperty(d.style.transform);
	//if info contains key 'translate' info should contain translateX and translateY
	if (info.translate) {
		//console.log('info contains translate');
		let s = info.translate.split(',');
		info.translateX = s[0].trim();
		info.translateY = s.length > 1 ? s[1].trim() : s[0].trim(); //info.translate;
	}
	if (!isdef(info.translateX)) info.translateX = '0px';
	if (!isdef(info.translateY)) info.translateY = '0px';
	if (info.scale) {
		//console.log('info contains scale');
		let s = info.scale.split(',');
		info.scaleX = s[0].trim();
		info.scaleY = s.length > 1 ? s[1].trim() : s[0].trim(); //info.scale;
	}
	if (!isdef(info.scaleX)) info.scaleX = '1';
	if (!isdef(info.scaleY)) info.scaleY = '1';
	if (!isdef(info.rotation)) info.rotation = '0';
	for (const k in info) {
		if (!isNumber(info[k])) info[k] = firstNumber(info[k]);
	}
	return info;
}
//////////////////////////////////////////
//usage:
var dummyString = "translateX(-50%) scale(1.2)";
transformObj = parseComplexStyleProperty(dummyString);
//console.log(transformObj);

function _getTransformInfoDOM(d) {
	let t = d.style.transform;
	console.log(t)
	getTranslateX(d);
}
function getTranslateX(myElement) {
	var style = window.getComputedStyle(myElement);
	var matrix = new WebKitCSSMatrix(style.webkitTransform);
	console.log('translateX: ', matrix.m41);
}
function getTranslateY(myElement) {
	var style = window.getComputedStyle(myElement);
	var matrix = new WebKitCSSMatrix(style.webkitTransform);
	console.log('translateX: ', matrix.m41);
}
function setTransformDOM(el, { x, y, scaleX, scaleY, rotDeg } = {}) {
	//console.log('old transform:',el.getAttribute('transform'));
	let info = getTransformInfoDOM(el);

	console.log('______________\n', info)
	let xNew, yNew, scaleXNew, scaleYNew, rotNew;
	if (isdef(x)) xNew = x; else xNew = info.translateX;
	if (isdef(y)) yNew = y; else yNew = info.translateY;
	if (isdef(scaleX)) scaleXNew = scaleX; else scaleXNew = info.scaleX;
	if (isdef(scaleY)) scaleYNew = scaleY; else scaleYNew = info.scaleY;
	if (isdef(rotDeg)) rotNew = rotDeg; else rotNew = info.rotation;
	let sTrans = ''; let sScale = ''; let sRot = '';
	console.log('xNew', xNew, 'yNew', yNew, 'scaleXNew', scaleXNew, 'scaleYNew', scaleYNew, 'rotNew', rotNew)
	if (xNew != 0 || yNew != 0) sTrans = `translate(${xNew}, ${yNew})`;
	if (scaleXNew != 1 || scaleYNew != 1) sScale = `scale(${scaleXNew} ${scaleYNew})`;
	if (rotNew != 0) sRot = `rotate(${rotNew})`;
	let s = (sTrans + ' ' + sScale + ' ' + sRot).trim();
	//s+=' skewX(60)'
	console.log('new transform:', s)
	el.style.transform = s; //setAttribute("transform", s);


}
//#endregion

//#region tests
function test01_one_deck() {
	let d1 = document.createElement('div');
	d1.id = 'myContainer';
	document.body.appendChild(d1);
	var d = d1; //document.getElementById('myContainer');
	let deck = createDeckWithJokers();
	attachTo(d, deck);
	// turnDeckFaceUp(deck);

	// console.log(deck)

	// explode(deck, 100, 100);
}
function test02_grid_rxc() {
	let d = addGridToBody(8, 8);
	d.style.setProperty('height', '50%')
}
function test03_grid_whrc() {
	let d1 = addDivToBody(100, 50, '%')
	addGridTo(d1, 8, 8);
}
function test04_grid9_whrc() {
	let d1 = addDivToBody(100, 50, '%')
	let cells = addGrid9To(d1, 1, 1);
	console.log(cells)
	let d = cells[1][1];

	describe(d);
	clearElement(d);
	describe(d);
	addGrid9To(d, 1, 1);
	describe(d);
}
function test05_deck_in_grid() {
	let d1 = addDivToBody(100, 50, '%')

	// let cells = addGrid9To(d1, 1, 1);
	// let d = cells[2][1];
	let deck = createDeckWithJokers();
	attachTo(d1, deck);
	// turnDeckFaceUp(deck);

	// console.log(deck)

	// explode(deck, 100, 100);
}
function test06_one_deck() {
	let d1 = document.createElement('div');
	d1.id = 'myContainer';
	document.body.appendChild(d1);
	var d = d1; //document.getElementById('myContainer');
	d.style.width = '100px';
	d.style.height = '100px';
	d.style.backgroundColor = 'blue';
	let deck = createDeckWithJokers();
	let card = deck.cards[54];
	deck.flip()
	attachTo(d, card);

	let domel = card.elem;
	//console.log(card, domel);
	let info = getTransformInfoDOM(domel)

	//domel.style.transform = 'scale(5,5)';
	//deck.translate(10, 10)
	//console.log('info', info)
	//setTransformDOM(domel, { x: 20 });
	//getTranslateX(domel);
	//_setTransform(domel, { x: 100, y: 20 });

	//card = deck.cards[0];
	//attachTo(d, card);
	// turnDeckFaceUp(deck);

	// console.log(deck)

	// explode(deck, 100, 100);
}
//#endregion

// var deck = DeckA();
// deck.mount(container1);
// currentDeck = deck;

//#region test calls
// test01_one_deck();
// test02_grid_rxc();
// test03_grid_whrc();
// test04_grid9_whrc();
// test05_deck_in_grid();
// test06_one_deck();

//#endregion

















