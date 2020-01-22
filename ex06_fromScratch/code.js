//test07(); test08(); test09(); test10(); test11();
//({ deckType, fPrepFace, fUpdateFace, fPrepBack, fUpdateBack, sz = { w: 78, h: 110 }, rep = 1, or = 'portrait', nJokers = 0, nCards } = {})
function makeDeck({ kind, N, nJokers, fPrep, fDraw, bDraw, x, y, w, h } = {}) {
	if (nundef(kind)) kind = 'deck52';
	let params = {
		kind: kind,
		fPrepFace: isdef(fPrep) ? fPrep : window[kind + 'Prep'],
		fUpdateFace: isdef(fDraw) ? fDraw : window[kind + 'Update'],
		fPrepBack: isdef(bDraw) ? bDraw : window[kind + 'Back'],
		fUpdateBack: isdef(bDraw) ? bDraw : window[kind + 'Back'],
		size: { w: 78, h: 110 },
		orientation: 'portrait',
		repeat: 1,
		numJokers: isdef(nJokers) ? nJokers : 0,
	};
	//calc total number of deck cards if possible or 100
	console.log(params)
	let defStyle = { deck52: { n: 52 }, catan: { n: 20 }, free: {}, deckEmpty: { n: 0 } };
	N = isdef(N) ? N : defStyle[params.kind].n;
	params.N = N;
	params.NTotal = N + (isdef(nJokers) ? nJokers : 0);
	//console.log('___________',params)
	return DeckB.fDeck(params);
}

function createPicto({ key, w = 100, h = 100, unit = 'px', fg = 'blue', bg, padding=10, cat, parent, border,rounding }) {
	if (nundef(key)) key = getRandomKey(iconChars);
	let ch = iconChars[key];
	let family = (ch[0] == 'f' || ch[0] == 'F') ? 'pictoFa' : 'pictoGame';
	let text = String.fromCharCode('0x' + ch);
	cat = isdef(parent) ? getTypeOf(parent) == 'div' ? 'd' : 'g' : isdef(cat) ? cat : 'd';
	let domel;
	if (cat == 'd') {
		let d = document.createElement('div');
		d.style.textAlign = 'center';
		d.style.fontFamily = family;
		d.style.fontWeight = 900;
		d.style.fontSize = h + unit;
		if (isdef(bg)) d.style.backgroundColor = bg;
		if (isdef(fg)) d.style.color = fg;
		d.innerHTML = text;
		domel = d;
		if (isdef(padding)) d.style.padding = padding+unit;
		d.style.display = 'inline-block';
		d.style.height = h+2*padding+unit;
		d.style.width = d.style.height;
		//d.style.textAlign = 'center';
		console.log('padding',padding,'unit',unit,'w',d.style.width,'h',d.style.height);
		if (isdef(border)) d.style.border = border;
		if (isdef(rounding)) d.style.borderRadius = rounding+unit;
	}else{
		//create a g element
		//add a rectangle element w/ or wo/ stroke and rounding
		//add a text element
		
	}
	domel.key = key;
	if (parent) parent.appendChild(domel);
	return domel;
}
//TODO: integrate __picto
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

function getRandomPicto() {	let key = getRandomKey(iconChars);}

function test13_simpleDDMultiple() {
	let dParent = addDivToBody();
	dParent.id = 'dParent';
	let purpleTarget = addDivPosTo(dParent, 250, 50, 300, 200, unit = 'px', bg = 'purple');
	let greenTarget = addDivPosTo(purpleTarget, 50, 50, 200, 120, unit = 'px', bg = 'green');
	let d = addDivPosTo(dParent, 20, 50, 200, 200, unit = 'px', bg = 'red');

	for (let i = 0; i < 7; i++) {
		let k = getRandomKey(iconChars);
		let pic = createPicto({key:k,parent:d,bg:'yellow',border:'1px solid green',rounding:12});

		//let w = actualWidth
		// createPicto is addPicto,_addPicto,picto,and __picto all in one!
		// let pic = addPicto(d, k); //returns div with centered pictogram
		pic.type = 'pic';
		posOverlap(pic, d, 120, 0, 'type');
		makeDraggable(pic);
	}
	makeDroppable(purpleTarget);
	//dropPosition = 'centerCentered'; 
	dropPosition = (ev, elem, target) => { posOverlap(elem, target, 10, 5, 'type'); };

}


function test16_g(){
	let dParent = addDivToBody();
	let g1 = addGFill('g1',dParent); 

	//create another g element within g1
	let g2 = d3.select(g1).append('g').attr('fill','yellow').attr('stroke','black').attr('stroke-width',5); //ok!
	g2.append('rect').attr('width','50px').attr('height','50px'); //yes, works!!!

	let g3 = d3.select(g1).append('g').attr('fill','red').attr('stroke','white').attr('stroke-width',5); //ok!
	let r3=g3.append('rect').attr('width','50%').attr('height','50px'); //yes, works!!!
	g3.node().style.transform='translate(-10px, -200px)';

	let g=g3.node();
	g.classList.add('green');
	g.classList.add('yellowStroke');
	let cl=g.classList;
	console.log(cl,typeof cl,cl.value,typeof cl.value);
	let cl2=g.getAttribute('class')
	console.log(cl2,typeof cl2);
	console.log(g.getAttribute('class'))
	g.classList.remove('yellowStroke');



	let boundsG1 = getBounds(g1);
	let boundsG2 = getBounds(g2.node());
	let boundsG2_rel = getBounds(g2.node(),true);
	let boundsG3=getBounds(g3.node());
	let boundsG3_rel=getBounds(g3.node(),true);
	let boundsDiv=getBounds(dParent);
	console.log('boundsG1',boundsG1)
	console.log('boundsG2',boundsG2)
	console.log('boundsG2_rel',boundsG2_rel)
	console.log('boundsG3',boundsG3)
	console.log('boundsG3_rel',boundsG3_rel)
	console.log('boundsDiv',boundsDiv)

	return;
	
	//wollte testen ob statt dessen transform setzen kann!
	d3.select(g2).style('transform','translate(50%, 50%)')

	//habe ein g element, wie adde ich dazu jetzt ein rect element in d3
	//first import d3.js: <script src="https://d3js.org/d3.v5.min.js"></script>
	//2. try append('rect')
	let r = d3.select(g1).attr('fill','red').append('rect').attr('width','100px').attr('height','100px');
	console.log('g1',d3.select(g1).node());
	console.log('r',r.node());
	let rect = d3.select(g1.children[0]);
	console.log(rect,r); //YES! rect and r are same!
	r.attr('stroke','green').attr('stroke-width',5).attr('rx',20).attr('ry',20); // works!

	//3. 
	

}

//************* new code *************** */
function allowDropKey(ev) {
	ev.stopPropagation();

	let dragged = ev.toElement; //this is target element!!! //getDraggedElem(ev);
	let target = ev.target;
	//console.log('dragged',dragged, '\ntarget',target);
	if (nundef(key) || key == ev.target.dd) {
		ev.preventDefault();
		console.log(ev, '\nkey:', key, dragged.id, dragged.dd, target.dd)
	}
}
function dragKey(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	dragStartOffset = getRelCoords(ev, $(this));
	//console.log(dragStartOffset);
}
function dropKey(ev) {
	//if (ev.cancel) return;
	ev.stopPropagation();
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	let dElem = document.getElementById(data);
	let targetElem = ev.target;
	while (!targetElem.ondragover) targetElem = targetElem.parentNode;
	if (isdef(dElem.dd) && dElem.dd != targetElem.dd) {
		console.log('wrong association dd', dElem.dd, targetElem.dd);
		return;
	}
	targetElem.appendChild(dElem);
	console.log('dropping', dElem.id, 'onto', targetElem.id);
	var elm = $(targetElem);
	x = ev.pageX - elm.offset().left - dragStartOffset.x;
	y = ev.pageY - elm.offset().top - dragStartOffset.y;
	posXY(dElem, targetElem, x, y);
	ev.cancel = true;
}
function makeElemDraggableTo(elem, target, key) {
	if (isdef(key)) {
		if (nundef(target.ddKeys)) target.ddKeys = [];
		if (nundef(elem.ddKeys)) elem.ddKeys = [];
		addIf(target.ddKeys, key);
		addIf(elem.ddKeys, key);
	}
	if (nundef(elem.id)) elem.id = getUID();

	elem.draggable = true;
	elem.ondragstart = isdef(key) ? dragKey : drag;
	target.ondragover = isdef(key) ? allowDropKey : allowDrop;
	target.ondrop = isdef(key) ? dropKey : drop;
}
function test13_makeDraggableTo() {
	let dParent = addDivToBody();
	dParent.id = 'dParent';
	let d = addDivPosTo(dParent, 20, 50, 200, 200, unit = 'px', bg = 'red');
	let dTarget1 = addDivPosTo(dParent, 250, 50, 300, 200, unit = 'px', bg = 'purple');
	dTarget1.id = 'dTarget1';
	let dTarget2 = addDivPosTo(dTarget1, 50, 50, 200, 120, unit = 'px', bg = 'green');
	dTarget2.id = 'dTarget2';
	let pic = addPicto(d, 'whistle'); //returns div with centered pictogram
	pic.id = 'dPic';
	posXY(pic, dParent, 10, 20);

	//pic can be dragged to purple div
	makeElemDraggableTo(pic, dTarget1);

	//green div can be dragged to blue div
	makeElemDraggableTo(dTarget2, dParent);

}
function test13_doubleDD() {
	let dParent = addDivToBody();
	dParent.id = 'dParent';
	let d = addDivPosTo(dParent, 20, 50, 200, 200, unit = 'px', bg = 'red');
	let dTarget1 = addDivPosTo(dParent, 250, 50, 300, 200, unit = 'px', bg = 'purple');
	dTarget1.id = 'dTarget1';
	let dTarget2 = addDivPosTo(dTarget1, 50, 50, 200, 120, unit = 'px', bg = 'green');
	dTarget2.id = 'dTarget2';
	let pic = addPicto(d, 'whistle'); //returns div with centered pictogram
	pic.id = 'dPic';
	posXY(pic, dParent, 10, 20);

	//pic can be dragged to purple div
	pic.draggable = true;
	pic.ondragstart = drag;
	pic.isPic = true;
	dTarget1.ondragover = allowDrop;
	dTarget1.ondrop = drop;

	//green div can be dragged to blue div
	dTarget2.draggable = true;
	dTarget2.ondragstart = drag;
	dTarget2.isPic = false;
	dParent.ondragover = allowDrop;
	dParent.ondrop = drop;

}


function setDivBg(d1, bg) {
	d1.style.setProperty('background-color', bg);

}
function setDivSize(d1, w, h, unit = 'px') {
	d1.style.setProperty('width', makeUnitString(w, unit));
	d1.style.setProperty('height', makeUnitString(h, unit));

}
function test14_divPosTest() {
	let dParent = addDivToBody();
	dParent.style.setProperty('float', 'right');
	dParent.style.setProperty('margin', '10px');
	setDivBg(dParent, 'green');
	setDivSize(dParent, 300, 200);
	let d = addDivPosTo(dParent, 20, 50, 100, 100, unit = 'px', bg = 'red');
}
function test15_addDivU() {
	let dParent = addDivU({ dParent: document.body, bg: 'yellow', margin: 10, w: 300, h: 200, unit: 'px', float: 'right' });
	let d = addDivU({ dParent: dParent, x: 20, y: 50, w: 100, h: 100, unit: 'px', position: 'absolute', bg: 'red' });
	//console.log(d)
}

//loadIcons(test13_simpleDDMultiple); // test14_divPosTest | test15_addDivU | test13_simpleDD | test13_simpleDDMultiple | test13_doubleDD | test13_makeDraggableTo
loadIcons(test16_g); // test16_g





//#region trash

function drop_old(ev) {
	if (ev.cancel) return;
	ev.preventDefault();
	//console.log(ev);
	var data = ev.dataTransfer.getData("text");
	let dElem = document.getElementById(data);
	//let dTarget = $(this);
	let dTarget1 = ev.target;
	let targetElem = dTarget1;
	while (!targetElem.ondragover) targetElem = targetElem.parentNode;
	//console.log(dElem,dTarget,dTarget1);
	targetElem.appendChild(dElem);
	console.log('dropping', dElem.id, 'onto', targetElem.id);
	var elm = $(targetElem);
	x = ev.pageX - elm.offset().left - dragStartOffset.x;
	y = ev.pageY - elm.offset().top - dragStartOffset.y;
	posXY(dElem, targetElem, x, y);
	ev.cancel = true;
}










// function allowDrop(ev) {
// 	ev.stopPropagation();

// 	let dragged = ev.toElement; //this is target element!!! //getDraggedElem(ev);
// 	let target = ev.target;
// 	//console.log('dragged',dragged, '\ntarget',target);
// 	if (nundef(key) || key == ev.target.dd) {
// 		ev.preventDefault();
// 		console.log(ev,'\nkey:',key,dragged.id,dragged.dd,target.dd)
// 	} 
// }
// function drag(ev) {
// 	ev.dataTransfer.setData("text", ev.target.id);
// 	//console.log(dragStartOffset);
// }
//dragged element needs id, but target does NOT!!!

function getDraggedElem(ev) {
	console.log(ev)
	if (isdef(ev.dataTransfer)) return document.getElementById(ev.dataTransfer.getData("text"));
	return null;
}
function dropDD(ev) {
	//if (ev.cancel) return;
	ev.stopPropagation();
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	let dElem = document.getElementById(data);
	let targetElem = ev.target;
	while (!targetElem.ondragover) targetElem = targetElem.parentNode;
	if (isdef(dElem.dd) && dElem.dd != targetElem.dd) {
		console.log('wrong association dd', dElem.dd, targetElem.dd);
		return;
	}
	targetElem.appendChild(dElem);
	console.log('dropping', dElem.id, 'onto', targetElem.id);
	var elm = $(targetElem);
	x = ev.pageX - elm.offset().left - dragStartOffset.x;
	y = ev.pageY - elm.offset().top - dragStartOffset.y;
	posXY(dElem, targetElem, x, y);
	ev.cancel = true;
}

function addPicto(dParent, key, addLabel = false, sz = 160) {
	let dInner = _addPicto(dParent, key);
	dInner.style.display = 'inline-block';
	dInner.appendChild(document.createElement('br'))
	if (addLabel) {
		dInner.appendChild(document.createTextNode(key));
	}
	//position?	
	dInner.style.padding = '10px';
	//dInner.style.fontSize = sz;
	return dInner;
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

//#endregion