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
function test12() {
	// let deck = Deck.DeckB('deck52');//,deck52DrawFace,deck52DrawFace,deck52DrawBack,deck52DrawBack);
	let deck = makeDeck({ kind: 'deckEmpty', nJokers: 5 });
	addDeckTo(deck, document.body, 'deck1', true, true);
}
function addPicto(dParent,key,addLabel=true,sz=20){
	let dInner = _addPicto(dParent,'whistle');
	dInner.style.display='inline-block';
	dInner.appendChild(document.createElement('br'))
	dInner.appendChild(document.createTextNode('whistle'))
	//position?	
	dInner.style.padding = '10px';
	return dInner;
}
function allowDrop(ev) {
  ev.preventDefault();
}
var dragStartOffset;
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	dragStartOffset = getRelCoords(ev,$(this));
	//console.log(dragStartOffset);
}
function getRelCoords(ev,elem){
	let x = ev.pageX - elem.offset().left; 
	let y = ev.pageY - elem.offset().top; 
	//console.log('coords rel to',elm,':',x,y);
	return {x:x,y:y};
}
//dragged element needs id, but target does NOT!!!
function drop(ev) { 
	if (ev.cancel) return;
  ev.preventDefault();
	//console.log(ev);
	var data = ev.dataTransfer.getData("text");
	let dElem=document.getElementById(data);
	//let dTarget = $(this);
	let dTarget1 = ev.target;
	//console.log(dElem,dTarget,dTarget1);
	let targetElem = dTarget1;
	while(!targetElem.ondragover) targetElem = targetElem.parentNode;
	targetElem.appendChild(dElem);
	console.log('dropping',dElem.id,'onto',targetElem.id);
	var elm = $(targetElem); 
	x = ev.pageX - elm.offset().left - dragStartOffset.x; 
	y = ev.pageY - elm.offset().top - dragStartOffset.y; 
	posXY(dElem,targetElem,x,y);
	ev.cancel=true;
}
function test13_doubleDD(){
	let dParent = addDivToBody();
	dParent.id='dParent';
	let d = addDivPosTo(dParent,20,50,200,200, unit = 'px', bg = 'red');
	let dTarget1 = addDivPosTo(dParent,250,50,300,200, unit = 'px', bg = 'purple');
	dTarget1.id='dTarget1';
	let dTarget2 = addDivPosTo(dTarget1,50,50,200,120, unit = 'px', bg = 'green');
	dTarget2.id='dTarget2';
	let pic = addPicto(d,'whistle'); //returns div with centered pictogram
	pic.id = 'dPic';
	posXY(pic, dParent, 10, 20);

	//pic can be dragged to purple div
	pic.draggable = true;
	pic.ondragstart = drag;
	pic.isPic = true;
	dTarget1.ondragover = allowDrop;
	dTarget1.ondrop=drop;

	//green div can be dragged to blue div
	dTarget2.draggable = true;
	dTarget2.ondragstart = drag;
	dTarget2.isPic = false;
	dParent.ondragover = allowDrop;
	dParent.ondrop=drop;

}
function test13(){
	let dParent = addDivToBody();
	dParent.id = 'dParent';
	let d = addDivPosTo(dParent,20,50,200,200, unit = 'px', bg = 'red');
	let dTarget1 = addDivPosTo(dParent,250,50,300,200, unit = 'px', bg = 'purple');
	let dTarget2 = addDivPosTo(dTarget1,50,50,200,120, unit = 'px', bg = 'green');
	let pic = addPicto(d,'whistle'); //returns div with centered pictogram
	pic.id = 'dPic';
	posXY(pic, dParent, 10, 20);
	pic.draggable = true;
	pic.ondragstart = drag;
	dTarget1.ondragover = allowDrop;
	dTarget1.ondrop=drop;
	//d.style.textAlign='center'; //soll nicht sein!!!
}

function setDivBg(d1,bg){
	d1.style.setProperty('background-color', bg);

}
function setDivSize(d1,w,h,unit='px'){
	d1.style.setProperty('width', makeUnitString(w, unit));
	d1.style.setProperty('height', makeUnitString(h, unit));

}
function test14_divPosTest(){
	let dParent = addDivToBody();
	dParent.style.setProperty('float','right');
	dParent.style.setProperty('margin','10px');
	setDivBg(dParent,'green');
	setDivSize(dParent,300,200);
	let d = addDivPosTo(dParent,20,50,100,100, unit = 'px', bg = 'red');
}
function test15_addDivU(){
	let dParent = addDivU({dParent:document.body,bg:'yellow',margin:10,w:300,h:200,unit:'px',float:'right'});
	let d=addDivU({dParent:dParent,x:20,y:50,w:100,h:100,unit:'px',position:'absolute',bg:'red'});
	//console.log(d)
}

loadIcons(test13_doubleDD); // test14_divPosTest | test15_addDivU | test13 | test13_doubleDD






