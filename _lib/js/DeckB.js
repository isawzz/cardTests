
class CardB {
	constructor(deck, i, text) {
		var transform = prefix('transform');

		// calculate rank/suit, etc..
		var rank = i % 13 + 1;
		var suit = i / 13 | 0;
		var z = (52 - i) / 4;// displacement;

		// create elements
		var elem = createElement('div');
		var faceElem = createElement('div');
		var backElem = createElement('div');

		// states
		this.isDraggable = false;
		this.isFlippable = false;

		// self = card
		//var self = { i: i, rank: rank, suit: suit, pos: i, cardElem: elem, mount: mount, unmount: unmount, setSide: setSide };
		this.text = text;
		this.i = i;
		this.rank = rank;
		this.suit = suit;
		this.pos = i;
		this.elem = elem;
		this.faceElem = faceElem;
		this.backElem = backElem;

		// var modules = this.modules;
		// var module;

		// add classes
		faceElem.classList.add('face');
		backElem.classList.add('back');

		// add default transform
		elem.style[transform] = translate(-z + 'px', -z + 'px');

		// add default values
		this.x = -z;
		this.y = -z;
		this.z = z;
		this.rot = 0;

		// set default side to back
		this.setSide('back');

		// add drag/click listeners
		addListener(elem, 'mousedown', this.onMousedown.bind(this));
		addListener(elem, 'touchstart', this.onMousedown.bind(this));

		// load modules
		// for (module in modules) {
		// 	addModule(modules[module]);
		// }

		this.animateTo = function (params) {
			var delay = params.delay;
			var duration = params.duration;
			var _params$x = params.x;
			var x = _params$x === undefined ? self.x : _params$x;
			var _params$y = params.y;
			var y = _params$y === undefined ? self.y : _params$y;
			var _params$rot = params.rot;
			var rot = _params$rot === undefined ? self.rot : _params$rot;
			var ease$$ = params.ease;
			var onStart = params.onStart;
			var onProgress = params.onProgress;
			var onComplete = params.onComplete;

			var startX, startY, startRot;
			var diffX, diffY, diffRot;

			animationFrames(delay, duration).start(function () {
				startX = self.x || 0;
				startY = self.y || 0;
				startRot = self.rot || 0;
				onStart && onStart();
			}).progress(function (t) {
				var et = ease[ease$$ || 'cubicInOut'](t);

				diffX = x - startX;
				diffY = y - startY;
				diffRot = rot - startRot;

				onProgress && onProgress(t, et);

				self.x = startX + diffX * et;
				self.y = startY + diffY * et;
				self.rot = startRot + diffRot * et;

				elem.style[transform] = translate(self.x + 'px', self.y + 'px') + (diffRot ? 'rotate(' + self.rot + 'deg)' : '');
			}).end(function () {
				onComplete && onComplete();
			});
		};

		// set rank & suit
		this.setRankSuit = function (rank, suit) {
			elem.setAttribute('class', 'card blank')
			faceElem.style.fontSize = '8px';
			faceElem.innerHTML = 'hallo das ist eine wundeschoene catan karte!';

			// var suitName = iToSuit52(suit);
			// elem.setAttribute('class', 'card ' + suitName + ' rank' + rank);
		};
		this.setText = function (text = 'hallo das ist eine wundeschoene catan karte!') {
			elem.setAttribute('class', 'card blank')
			faceElem.innerHTML = text;
			//var suitName = iToSuit52(suit);
			//elem.setAttribute('class', 'card ' + suitName + ' rank' + rank);
		};

		this.setRankSuit(rank, suit);

		this.enableDragging = function () {
			// this activates dragging
			if (this.isDraggable) {
				// already is draggable, do nothing
				return;
			}
			this.isDraggable = true;
			elem.style.cursor = 'move';
		};

		this.enableFlipping = function () {
			if (this.isFlippable) {
				// already is flippable, do nothing
				return;
			}
			this.isFlippable = true;
		};

		this.disableFlipping = function () {
			if (!this.isFlippable) {
				// already disabled flipping, do nothing
				return;
			}
			this.isFlippable = false;
		};

		this.disableDragging = function () {
			if (!this.isDraggable) {
				// already disabled dragging, do nothing
				return;
			}
			this.isDraggable = false;
			elem.style.cursor = '';
		};

	}
	addModule(module) {
		// add card module
		module.card && module.card(self);
	}

	onMousedown(e) {
		this.startPos = {};
		var pos = {};
		var starttime = Date.now();

		e.preventDefault();

		// get start coordinates and start listening window events
		if (e.type === 'mousedown') {
			this.startPos.x = pos.x = e.clientX;
			this.startPos.y = pos.y = e.clientY;
			console.log('startpos', this.startPos)
			addListener(window, 'mousemove', this.onMousemove.bind(this));
			addListener(window, 'mouseup', this.onMousemove.bind(this));
		} else {
			startPos.x = pos.x = e.touches[0].clientX;
			startPos.y = pos.y = e.touches[0].clientY;
			addListener(window, 'touchmove', this.onMousemove.bind(this));
			addListener(window, 'touchend', this.onMousemove.bind(this));
		}

		if (!this.isDraggable) {
			// is not draggable, do nothing
			return;
		}

		// move card
		this.elem.style[transform] = translate(this.x + 'px', this.y + 'px') + (this.rot ? ' rotate(' + this.rot + 'deg)' : '');
		this.elem.style.zIndex = maxZ++;

	}

	onMousemove(e) {
		if (!this.isDraggable) {
			// is not draggable, do nothing
			return;
		}
		if (e.type === 'mousemove') {
			pos.x = e.clientX;
			pos.y = e.clientY;
		} else {
			pos.x = e.touches[0].clientX;
			pos.y = e.touches[0].clientY;
		}

		// move card
		this.elem.style[transform] = translate(Math.round(this.x + pos.x - startPos.x) + 'px', Math.round(this.y + pos.y - startPos.y) + 'px') + (self.rot ? ' rotate(' + self.rot + 'deg)' : '');
	}

	onMouseup(e) {
		if (this.isFlippable && Date.now() - starttime < 200) {
			// flip sides
			this.setSide(this.side === 'front' ? 'back' : 'front');
		}
		if (e.type === 'mouseup') {
			removeListener(window, 'mousemove', onMousemove);
			removeListener(window, 'mouseup', onMouseup);
		} else {
			removeListener(window, 'touchmove', onMousemove);
			removeListener(window, 'touchend', onMouseup);
		}
		if (!this.isDraggable) {
			// is not draggable, do nothing
			return;
		}

		// set current position
		this.x = this.x + pos.x - startPos.x;
		this.y = this.y + pos.y - startPos.y;
	}
	mount(target) {
		// mount card to target (deck)
		target.appendChild(this.elem);

		this.root = target;
	}

	unmount() {
		// unmount from root (deck)
		this.root && this.root.removeChild(this.elem);
		this.root = null;
	}

	setSide(newSide) {
		// flip sides
		if (newSide === 'front') {
			if (this.side === 'back') {
				elem.removeChild(backElem);
			}
			this.side = 'front';
			this.elem.appendChild(this.faceElem);
			this.setRankSuit(this.rank, this.suit);
		} else {
			if (this.side === 'front') {
				this.elem.removeChild(this.faceElem);
			}
			this.side = 'back';
			this.elem.appendChild(this.backElem);
			this.elem.setAttribute('class', 'card');
		}
	}
}


class DeckBC {
	constructor() {
		//#region variables	
		this.animationFrames = animationFrames;
		this.modules = { bysuit: this.bysuit, fan: this.fan, intro: this.intro, poker: this.poker, shuffle: this.shuffle, sort: this.sort, flip: this.flip };
		this.Card = this._card;
		this.prefix = prefix;
		this.translate = translate;
		console.log('hallo!')

		// fallback
		window.requestAnimationFrame || (window.requestAnimationFrame = function (cb) { setTimeout(cb, 0); });
		//#endregion

		//#region modules
		this.ease = {
			linear: function linear(t) {
				return t;
			},
			quadIn: function quadIn(t) {
				return t * t;
			},
			quadOut: function quadOut(t) {
				return t * (2 - t);
			},
			quadInOut: function quadInOut(t) {
				return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
			},
			cubicIn: function cubicIn(t) {
				return t * t * t;
			},
			cubicOut: function cubicOut(t) {
				return --t * t * t + 1;
			},
			cubicInOut: function cubicInOut(t) {
				return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
			},
			quartIn: function quartIn(t) {
				return t * t * t * t;
			},
			quartOut: function quartOut(t) {
				return 1 - --t * t * t * t;
			},
			quartInOut: function quartInOut(t) {
				return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
			},
			quintIn: function quintIn(t) {
				return t * t * t * t * t;
			},
			quintOut: function quintOut(t) {
				return 1 + --t * t * t * t * t;
			},
			quintInOut: function quintInOut(t) {
				return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
			}
		};
		this.flip = {
			deck: function deck(_deck) {
				_deck.flip = _deck.queued(flip);

				function flip(next, side) {
					var flipped = _deck.cards.filter(function (card) {
						return card.side === 'front';
					}).length / _deck.cards.length;

					_deck.cards.forEach(function (card, i) {
						card.setSide(side ? side : flipped > 0.5 ? 'back' : 'front');
					});
					next();
				}
			}
		};
		this.sort = {
			deck: function deck(_deck2) {
				_deck2.sort = _deck2.queued(sort);

				function sort(next, reverse) {
					var cards = _deck2.cards;

					cards.sort(function (a, b) {
						if (reverse) {
							return a.i - b.i;
						} else {
							return b.i - a.i;
						}
					});

					cards.forEach(function (card, i) {
						card.sort(i, cards.length, function (i) {
							if (i === cards.length - 1) {
								next();
							}
						}, reverse);
					});
				}
			},
			card: function card(_card2) {
				var cardElem = _card2.elem;

				_card2.sort = function (i, len, cb, reverse) {
					var z = i / 4;
					var delay = i * 10;

					_card2.animateTo({
						delay: delay,
						duration: 400,

						x: -z,
						y: -150,
						rot: 0,

						onComplete: function onComplete() {
							cardElem.style.zIndex = i;
						}
					});

					_card2.animateTo({
						delay: delay + 500,
						duration: 400,

						x: -z,
						y: -z,
						rot: 0,

						onComplete: function onComplete() {
							cb(i);
						}
					});
				};
			}
		};
		this.shuffle = {
			deck: function deck(_deck3) {
				_deck3.shuffle = _deck3.queued(shuffle);

				function shuffle(next) {
					var cards = _deck3.cards;

					____fontSize = fontSize();

					fisherYates(cards);

					cards.forEach(function (card, i) {
						card.pos = i;

						card.shuffle(function (i) {
							if (i === cards.length - 1) {
								next();
							}
						});
					});
					return;
				}
			},

			card: function card(_card3) {
				var cardElem = _card3.elem;

				_card3.shuffle = function (cb) {
					var i = _card3.pos;
					var z = i / 4;
					var delay = i * 2;

					_card3.animateTo({
						delay: delay,
						duration: 200,

						x: plusminus(Math.random() * 40 + 20) * ____fontSize / 16,
						y: -z,
						rot: 0
					});
					_card3.animateTo({
						delay: 200 + delay,
						duration: 200,

						x: -z,
						y: -z,
						rot: 0,

						onStart: function onStart() {
							cardElem.style.zIndex = i;
						},

						onComplete: function onComplete() {
							cb(i);
						}
					});
				};
			}
		};
		this.poker = {
			deck: function deck(_deck4) {
				_deck4.poker = _deck4.queued(poker);

				function poker(next) {
					var cards = _deck4.cards;
					var len = cards.length;

					__fontSize = fontSize();

					cards.slice(-5).reverse().forEach(function (card, i) {
						card.poker(i, len, function (i) {
							card.setSide('front');
							if (i === 4) {
								next();
							}
						});
					});
				}
			},
			card: function card(_card4) {
				var cardElem = _card4.elem;

				_card4.poker = function (i, len, cb) {
					var delay = i * 250;

					_card4.animateTo({
						delay: delay,
						duration: 250,

						x: Math.round((i - 2.05) * 70 * __fontSize / 16),
						y: Math.round(-110 * __fontSize / 16),
						rot: 0,

						onStart: function onStart() {
							cardElem.style.zIndex = len - 1 + i;
						},
						onComplete: function onComplete() {
							cb(i);
						}
					});
				};
			}
		};
		this.intro = {
			deck: function deck(_deck5) {
				_deck5.intro = _deck5.queued(intro);

				function intro(next) {
					var cards = _deck5.cards;

					cards.forEach(function (card, i) {
						card.setSide('front');
						card.intro(i, function (i) {
							animationFrames(250, 0).start(function () {
								card.setSide('back');
							});
							if (i === cards.length - 1) {
								next();
							}
						});
					});
				}
			},
			card: function card(_card5) {
				var transform = prefix('transform');

				var cardElem = _card5.elem;

				_card5.intro = function (i, cb) {
					var delay = 500 + i * 10;
					var z = i / 4;

					cardElem.style[transform] = translate(-z + 'px', '-250px');
					cardElem.style.opacity = 0;

					_card5.x = -z;
					_card5.y = -250 - z;
					_card5.rot = 0;

					_card5.animateTo({
						delay: delay,
						duration: 1000,

						x: -z,
						y: -z,

						onStart: function onStart() {
							cardElem.style.zIndex = i;
						},
						onProgress: function onProgress(t) {
							cardElem.style.opacity = t;
						},
						onComplete: function onComplete() {
							cardElem.style.opacity = '';
							cb && cb(i);
						}
					});
				};
			}
		};
		this.fan = {
			deck: function deck(_deck6) {
				_deck6.fan = _deck6.queued(fan);

				function fan(next) {
					var cards = _deck6.cards;
					var len = cards.length;

					_fontSize = fontSize();

					cards.forEach(function (card, i) {
						card.fan(i, len, function (i) {
							if (i === cards.length - 1) {
								next();
							}
						});
					});
				}
			},
			card: function card(_card6) {
				var cardElem = _card6.elem;

				_card6.fan = function (i, len, cb) {
					var z = i / 4;
					var delay = i * 10;
					var rot = i / (len - 1) * 260 - 130;

					_card6.animateTo({
						delay: delay,
						duration: 300,

						x: -z,
						y: -z,
						rot: 0
					});
					_card6.animateTo({
						delay: 300 + delay,
						duration: 300,

						x: Math.cos(deg2rad(rot - 90)) * 55 * _fontSize / 16,
						y: Math.sin(deg2rad(rot - 90)) * 55 * _fontSize / 16,
						rot: rot,

						onStart: function onStart() {
							cardElem.style.zIndex = i;
						},

						onComplete: function onComplete() {
							cb(i);
						}
					});
				};
			}
		};
		this.bysuit = {
			deck: function deck(_deck7) {
				_deck7.bysuit = _deck7.queued(bysuit);

				function bysuit(next) {
					var cards = _deck7.cards;

					___fontSize = fontSize();

					cards.forEach(function (card) {
						card.bysuit(function (i) {
							if (i === cards.length - 1) {
								next();
							}
						});
					});
				}
			},
			card: function card(_card7) {
				var rank = _card7.rank;
				var suit = _card7.suit;

				_card7.bysuit = function (cb) {
					var i = _card7.i;
					var delay = i * 10;

					_card7.animateTo({
						delay: delay,
						duration: 400,

						x: -Math.round((6.75 - rank) * 8 * ___fontSize / 16),
						y: -Math.round((1.5 - suit) * 92 * ___fontSize / 16),
						rot: 0,

						onComplete: function onComplete() {
							cb(i);
						}
					});
				};
			}
		};
		//#endregion
	}
	_card(i, text = '') {

		return new CardB(this, i, text);

	}
	mount(root) {
		// mount deck to root
		this.root = root;
		this.root.appendChild(this.elem);
	}

	unmount() {
		// unmount deck from root
		if (!this.root) {
			console.log('has not been mounted!!!')
		}
		this.root.removeChild(cardElem);
	}

	addModule(module) {
		module.deck && module.deck(self);
	}

	makeDeck52(jokers) {
		// init cards array
		this.cards = new Array(jokers ? 55 : 52);

		var deckElem = createElement('div');
		this.elem = deckElem;
		var hallo = observable({ mount: this.mount, unmount: this.unmount, cards: this.cards, elem: deckElem });

		// make queueable
		queue(hallo);

		// // load modules
		// var module;
		// for (module in this.modules) {
		// 	this.addModule(this.modules[module]);
		// }

		// add class
		deckElem.classList.add('deck');

		var card;

		// create cards
		for (var i = this.cards.length; i; i--) {
			card = this.cards[i - 1] = this._card(i - 1);
			card.setSide('back');
			card.mount(deckElem);
		}


	}
}
//#region vars
var ____fontSize;
var ___fontSize;
var __fontSize;
var _fontSize;
var ticking;
var animations = [];
var style = document.createElement('p').style;
var memoized = {};
var has3d;
var maxZ = 52;
var displacement = 4;

//#endregion

//#region helpers
function addListener(target, name, listener) {
	target.addEventListener(name, listener);
}
function animationFrames(delay, duration) {
	var now = Date.now();

	// calculate animation start/end times
	var start = now + delay;
	var end = start + duration;

	var animation = {
		start: start,
		end: end
	};

	// add animation
	animations.push(animation);

	if (!ticking) {
		// start ticking
		ticking = true;
		requestAnimationFrame(tick);
	}
	var self = {
		start: function start(cb) {
			// add start callback (just one)
			animation.startcb = cb;
			return self;
		},
		progress: function progress(cb) {
			// add progress callback (just one)
			animation.progresscb = cb;
			return self;
		},
		end: function end(cb) {
			// add end callback (just one)
			animation.endcb = cb;
			return self;
		}
	};
	return self;
}
function check3d() {
	// I admit, this line is stealed from the great Velocity.js!
	// http://julian.com/research/velocity/
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	if (!isMobile) {
		return false;
	}

	var transform = prefix('transform');
	var $p = document.createElement('p');

	document.body.appendChild($p);
	$p.style[transform] = 'translate3d(1px,1px,1px)';

	has3d = $p.style[transform];
	has3d = has3d != null && has3d.length && has3d !== 'none';

	document.body.removeChild($p);

	return has3d;
}
function createElement(type) {
	return document.createElement(type);
}
function deg2rad(degrees) {
	return degrees * Math.PI / 180;
}
function fisherYates(array) {
	var rnd, temp;

	for (var i = array.length - 1; i; i--) {
		rnd = Math.random() * i | 0;
		temp = array[i];
		array[i] = array[rnd];
		array[rnd] = temp;
	}

	return array;
}
function fontSize() {
	return window.getComputedStyle(document.body).getPropertyValue('font-size').slice(0, -2);
}
function iToSuit52(suit) {
	// return suit name from suit value
	return suit === 0 ? 'spades' : suit === 1 ? 'hearts' : suit === 2 ? 'clubs' : suit === 3 ? 'diamonds' : 'joker';
}
function observable(target) {
	target || (target = {});
	var listeners = {};

	target.on = on;
	target.one = one;
	target.off = off;
	target.trigger = trigger;

	return target;

	function on(name, cb, ctx) {
		listeners[name] || (listeners[name] = []);
		listeners[name].push({ cb: cb, ctx: ctx });
	}

	function one(name, cb, ctx) {
		listeners[name] || (listeners[name] = []);
		listeners[name].push({
			cb: cb, ctx: ctx, once: true
		});
	}

	function trigger(name) {
		var self = this;
		var args = Array.prototype.slice(arguments, 1);

		var currentListeners = listeners[name] || [];

		currentListeners.filter(function (listener) {
			listener.cb.apply(self, args);

			return !listener.once;
		});
	}

	function off(name, cb) {
		if (!name) {
			listeners = {};
			return;
		}

		if (!cb) {
			listeners[name] = [];
			return;
		}

		listeners[name] = listeners[name].filter(function (listener) {
			return listener.cb !== cb;
		});
	}
}
function plusminus(value) {
	var plusminus = Math.round(Math.random()) ? -1 : 1;

	return plusminus * value;
}
function prefix(param) {
	if (typeof memoized[param] !== 'undefined') {
		return memoized[param];
	}

	if (typeof style[param] !== 'undefined') {
		memoized[param] = param;
		return param;
	}

	var camelCase = param[0].toUpperCase() + param.slice(1);
	var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o'];
	var test;

	for (var i = 0, len = prefixes.length; i < len; i++) {
		test = prefixes[i] + camelCase;
		if (typeof style[test] !== 'undefined') {
			memoized[param] = test;
			return test;
		}
	}
}
function queue(target) {
	var array = Array.prototype;

	var queueing = [];

	target.queue = queue;
	target.queued = queued;

	return target;

	function queued(action) {
		return function () {
			var self = this;
			var args = arguments;

			queue(function (next) {
				action.apply(self, array.concat.apply(next, args));
			});
		};
	}

	function queue(action) {
		if (!action) {
			return;
		}

		queueing.push(action);

		if (queueing.length === 1) {
			next();
		}
	}
	function next() {
		queueing[0](function (err) {
			if (err) {
				throw err;
			}

			queueing = queueing.slice(1);

			if (queueing.length) {
				next();
			}
		});
	}
}
function removeListener(target, name, listener) {
	target.removeEventListener(name, listener);
}
function tick() {
	var now = Date.now();

	if (!animations.length) {
		// stop ticking
		ticking = false;
		return;
	}

	for (var i = 0, animation; i < animations.length; i++) {
		animation = animations[i];
		if (now < animation.start) {
			// animation not yet started..
			continue;
		}
		if (!animation.started) {
			// animation starts
			animation.started = true;
			animation.startcb && animation.startcb();
		}
		// animation progress
		var t = (now - animation.start) / (animation.end - animation.start);
		animation.progresscb && animation.progresscb(t < 1 ? t : 1);
		if (now > animation.end) {
			// animation ended
			animation.endcb && animation.endcb();
			animations.splice(i--, 1);
			continue;
		}
	}
	requestAnimationFrame(tick);
}
function translate(a, b, c) {
	typeof has3d !== 'undefined' || (has3d = check3d());

	c = c || 0;

	if (has3d) {
		return 'translate3d(' + a + ', ' + b + ', ' + c + ')';
	} else {
		return 'translate(' + a + ', ' + b + ')';
	}
}


//#endregion


