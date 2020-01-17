function addDivU({ id, dParent, w, h, unit, fg, bg, position, x, y, html, className, styleStr, border, rounding, gap, margin, padding, float, textAlign, fz }) {
	let d1 = document.createElement('div');
	if (isdef(dParent)) dParent.appendChild(d1); else dParent = null;
	if (isdef(id)) d1.id = id;
	if (isdef(fg)) d1.style.setProperty('color', fg);
	if (isdef(bg)) d1.style.setProperty('background-color', bg);
	if (isdef(html)) d1.innerHTML = html;

	//size and position
	//positioning with gap: x,y,w,h MUST be numbers for this to work!
	if (gap > 0 && (unit == '%' || dParent && isdef(dParent.offsetWidth) && isdef(dParent.offsetHeight))) {
		//check if this div touches right border of parent
		let wCont = unit == '%' ? 100 : dParent.offsetWidth;
		let isRight = x + w >= wCont;
		let hCont = unit == '%' ? 100 : dParent.offsetHeight;
		let isBottom = y + h >= hCont;
		//console.log(wCont, 'isRight', isRight);
		//console.log(hCont, 'isBottom', isBottom);
		x += gap;
		y += gap;
		w -= (isRight ? 2 : 1) * gap;
		h -= (isBottom ? 2 : 1) * gap;
	}

	if (nundef(unit)) unit = '%';
	if (isdef(w)) d1.style.setProperty('width', makeUnitString(w, unit));
	if (isdef(h)) d1.style.setProperty('height', makeUnitString(h, unit));
	if (isdef(x) || isdef(y)) {
		if (nundef(position)) position = 'absolute';
		//console.log(position)
		if (dParent && !dParent.style.position) dParent.style.setProperty('position', 'relative');
		d1.style.setProperty('position', position);
		if (isdef(x)) d1.style.setProperty('left', makeUnitString(x, unit));
		if (isdef(y)) d1.style.setProperty('top', makeUnitString(y, unit));
	}
	if (isdef(className)) d1.classList.add(className);
	if (isdef(styleStr)) d1.style.cssText += styleStr;
	if (isdef(border)) {
		d1.style.border = border;
		if (isdef(rounding)) d1.style.borderRadius = rounding;
	}
	if (isdef(margin)) d1.style.setProperty('margin', makeUnitString(margin, 'px'));
	if (isdef(padding)) d1.style.setProperty('padding', makeUnitString(padding, 'px'));
	if (float) d1.style.float = float;
	if (textAlign) d1.style.textAlign = textAlign;
	if (isdef(fz)) d1.style.setProperty('fontSize', makeUnitString(fz, 'px'));

	return d1;
}

//#region DOM: creating divs
function addDivToBody(w = 100, h = 100, unit = '%', bg = 'blue') { return addDivU({ dParent: document.body, w: w, h: h, unit: unit, bg: bg }); }
// 	//per default makes a div that completely fills body
// 	let d1 = document.createElement('div');
// 	document.body.appendChild(d1);
// 	d1.style.setProperty('width', makeUnitString(w, unit));
// 	d1.style.setProperty('height', makeUnitString(h, unit));
// 	d1.style.setProperty('background-color', bg);
// 	return d1;
// }
function addDivTo(dParent, w = 100, h = 100, unit = '%', bg = 'blue') { return addDivU({ dParent: dParent, w: w, h: h, unit: unit, bg: bg }); }
// 	//per default makes a div that completely fills body
// 	let d1 = document.createElement('div');
// 	dParent.appendChild(d1);
// 	d1.style.setProperty('width', makeUnitString(w, unit));
// 	d1.style.setProperty('height', makeUnitString(h, unit));
// 	d1.style.setProperty('background-color', bg);
// 	return d1;
// }
function addDivPosTo(dParent, x = 0, y = 0, w = 100, h = 100, unit = '%', bg = 'blue', position = 'absolute') { 
	return addDivU({ dParent: dParent, x: x, y: y, w: w, h: h, unit: unit, position: position, bg: bg }); 
}
// 	//per default makes a div that completely fills body
// 	let d1 = document.createElement('div');
// 	dParent.appendChild(d1);
// 	d1.style.setProperty('width', makeUnitString(w, unit));
// 	d1.style.setProperty('height', makeUnitString(h, unit));
// 	d1.style.setProperty('background-color', bg);

// 	if (position == 'absolute') {
// 		let parentPos = dParent.style.position;
// 		if (!dParent.style.position) dParent.style.setProperty('position', 'relative');
// 		d1.style.setProperty('position', 'absolute');
// 		d1.style.setProperty('left', makeUnitString(x, unit));
// 		d1.style.setProperty('top', makeUnitString(y, unit));
// 	}

// 	return d1;
// }

//code 2019
function addDiv(dParent, { html, w = '100%', h = '100%', bg, fg, border, rounding, margin, padding, float, position, x, y, textAlign, fontSize }) {
	return addDivU({ dParent: dParent, html: html, w: w, h: h, bg: bg, fg: fg, border: border, rounding: rounding, margin: margin, padding: padding, float: float, position: position, x: x, y: y, textAlign: textAlign, fz: fontSize });
}
// 	// bg, fg, border, rounding, margin, padding, float, textAlign}) {
// 	let d = document.createElement('div');
// 	// make big div
// 	if (html) d.innerHTML = html;
// 	if (bg) d.style.backgroundColor = bg;
// 	if (fg) {
// 		d.style.color = fg;
// 	}
// 	if (isNumber(w)) {
// 		w = w + 'px';
// 	}
// 	if (isNumber(h)) {
// 		h = h + 'px';
// 	}

// 	d.style.width = w;
// 	d.style.height = h;
// 	if (border) {
// 		d.style.border = border;
// 		d.style.borderRadius = rounding;
// 	}
// 	if (isNumber(margin)) d.style.margin = margin + 'px';
// 	if (isNumber(padding)) d.style.padding = padding + 'px';
// 	if (float) d.style.float = float;
// 	if (position) d.style.position = position;
// 	if (isNumber(x)) d.style.left = x + 'px';
// 	if (isNumber(y)) d.style.top = y + 'px';
// 	if (textAlign) d.style.textAlign = textAlign;
// 	if (fontSize) d.style.fontSize = fontSize;
// 	dParent.appendChild(d);
// 	return d;
// }
function addDivPosGap(dParent, x, y, w, h, { gap, bg, fg, border, rounding, textAlign, fontSize, position = 'absolute' } = {}) {
	return addDivU({ dParent: dParent, x: x, y: y, w: w, h: h, gap: gap, bg: bg, fg: fg, border: border, textAlign: textAlign, fz: fontSize, position: position });
}
// 	//w and h must be numbers!
// 	if (gap > 0 && isdef(dParent.offsetWidth) && isdef(dParent.offsetHeight)) {
// 		//check if this div touches right border of parent
// 		let wCont = dParent.offsetWidth;
// 		let isRight = x + w >= wCont;
// 		let hCont = dParent.offsetHeight;
// 		let isBottom = y + h >= hCont;
// 		//console.log(wCont, 'isRight', isRight);
// 		//console.log(hCont, 'isBottom', isBottom);
// 		x += gap;
// 		y += gap;
// 		w -= (isRight ? 2 : 1) * gap;
// 		h -= (isBottom ? 2 : 1) * gap;
// 	}
// 	return addDiv(dParent, { position: isdef(position) ? position : 'absolute', x: x, y: y, w: w, h: h, bg, fg, border, rounding, textAlign, fontSize });
// }
function addStyledDiv(dParent, id, html, styleString) { return addDivU({ dParent: dParent, id: id, html: html, styleStr: styleString }); }
// 	let d = document.createElement('div');
// 	dParent.appendChild(d);
// 	d.id = id;
// 	d.style.cssText = styleString;
// 	if (html) d.innerHTML = html;
// 	return d;
// }
function addDivClass(dParent, id, className) { return addDivU({dParent:dParent,id:id,className:className});}
// 	let d = document.createElement('div');
// 	dParent.appendChild(d);
// 	d.id = id;
// 	d.classList.add(className);
// 	return d;
// }
function addDivFill(id, dParent) { return addDivU({dParent:dParent,id:id,w:'100%',h:'100%'});}
function addDivFullClass(dParent, id, className) { return addDivU({dParent:dParent,id:id,w:'100%',h:'100%',className:className});}
function addFlexGridDiv(dParent) { return addDivU({dParent:dParent, className:'flex-grid'}); }






//#endregion