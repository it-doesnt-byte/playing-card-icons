# playing-card-icons

A set of methods that helps you retrieve Unicode playing cards

# Install

```bash
npm install playing-card-icons
```

# Usage

It is now possible to represent playing cards with Unicode characters (Example: 🂻🂡🃌🃞)  
You can learn more about the topic by reading [this Wikipedia article](https://en.wikipedia.org/wiki/Playing_cards_in_Unicode)  
This library offers a way to obtain and interact with these characters  
All value, suit and card parameters must be represented by strings

Here is a list of the different methods available in this library:
* Playing cards methods
  * Values and suits are strings that can be defined by their names ("Two", "jaCk", "sPaDE", "clubs", ...), their symbols ("2", "j", "♠", "♧", ...), or a card
  * They can be retrieved and redefined by modifying `valuesName`, `valuesSymbol`, `suitsName` and `suitsSymbol`
  * `getPlayingCard(value, suit)`: Returns the icon of the corresponding card
  * `isPlayingCard(card, includeJokers=false, includeTrumps=false, includeBack=false)`: Returns `true` if the input is a playing card
  * `getValueName(value, digits=true)`: Returns the literal name of the corresponding value
  * `getValueSymbol(value)`: Returns the symbol of the corresponding value
  * `getSuitName(suit, plural=true)`: Returns the literal name of the corresponding suit
  * `getSuitSymbol(suit, filled=true)`: Returns the symbol of the corresponding suit
* Jokers methods
  * `getJoker(color="black")`: Returns a joker card (The card can be black, white or red)
  * `getJokerColor(joker)`: Returns the color of the corresponding joker
  * `isJoker(joker)`: Returns `true` if the input is a joker card
* Trump cards methods
  * `getTrumpCard(value)`: Returns a trump card from the corresponding value (between 0 and 21 inclusive, 0 representing the fool)
  * `getTrumpCardValue(trump)`: Returns the value of a trump card
  * `isTrumpCard(trump)`: Returns `true` if the input is a trump card
* Card back methods
  * `getCardBack()`: Returns a card back (🂠)
  * `isCardBack(back)`: Returns `true` if the input is a card back

`get` methods will throw an error if the parameters are incorrect  
Use `is` methods if you need to verify the parameters

# Small example

```javascript
var Cards = require('playing-card-icons');
var queen_of_hearts = Cards.getPlayingCard("Q", "hearts");
var spades = Cards.getSuitSymbol("spade"); // It doesn't matter if the name is in plural for suits

// Since cards can also work as values and suits, you can easily change the value or suit of a card
var queen_of_spades = Cards.getPlayingCard(queen_of_hearts, spades);
console.log(queen_of_hearts+" + "+spades+" = "+queen_of_spades);

// Generating a 52-card deck (excluding knights)
var deck = [];
for (const value of Cards.valuesName) {
	for (const suit of Cards.suitsName) {
		if (value !== "Knight") deck.push(Cards.getPlayingCard(value, suit));
	}
}
console.log(deck);
```

# License

[CC0](https://creativecommons.org/publicdomain/zero/1.0/legalcode)
