/* global DeckA */

var prefix = DeckA.prefix
var transform = prefix('transform')
var translate = DeckA.translate

var container1 = document.getElementById('container')
var topbar1 = document.getElementById('topbar')

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

var deck = DeckA()


bShuffle.addEventListener('click', function () {
	deck.shuffle()
	deck.shuffle()
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
	deck.pokerN()
})

