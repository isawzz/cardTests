//test07(); test08(); test09(); test10(); test11();
//({ deckType, fPrepFace, fUpdateFace, fPrepBack, fUpdateBack, sz = { w: 78, h: 110 }, rep = 1, or = 'portrait', nJokers = 0, nCards } = {})
function makeDeck({ kind, N, nJokers, nCards, fPrep, fDraw, bDraw, x, y, w, h } = {}) {
	let params = {
		kind: isdef(kind) ? kind : 'deck52',
		fPrepFace: isdef(fPrep) ? fPrep : deck52DrawFace,
		fUpdateFace: isdef(fDraw) ? fDraw : deck52DrawFace,
		fPrepBack: isdef(bDraw) ? bDraw : deck52DrawBack,
		fUpdateBack: isdef(bDraw) ? bDraw : deck52DrawBack,
		size: {w:78,h:110},
		orientation: 'portrait',
		repeat: 1,
		numCards: isdef(nCards)?nCards:isdef(N)?N:0,
		numJokers: isdef(nJokers)?nJokers:0,
	};
	//calc total number of deck cards if possible or 100
	let defStyle = { deck52: { n: 52 }, catan: { n: 20 }, free: {}, empty: { n: 0 } };
	N = isdef(N)? N : defStyle[params.kind].n;
	if (nundef(N)) N = params.numCards;
	//console.log(N);
	params.N = N;

	//console.log('___________',params)
	return DeckB.fDeck(params);
}

// let deck = Deck.DeckB('deck52');//,deck52DrawFace,deck52DrawFace,deck52DrawBack,deck52DrawBack);
let deck = makeDeck({ kind: 'deck52', nJokers: 5 });
addDeckTo(deck, document.body, 'deck1', true, true);








