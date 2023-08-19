class PlayingCards {
	static valuesName = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Knight","Queen","King"];
	static valuesSymbol = ["A","2","3","4","5","6","7","8","9","10","J","C","Q","K"];
	
	static suitsName = ["Spade","Heart","Diamond","Club"];
	static suitsSymbol = {"black":["\u2660","\u2665","\u2666","\u2663"],
	                      "white":["\u2664","\u2661","\u2662","\u2667"]};

	// Playing cards methods
	static getPlayingCard(value, suit) {
		return String.fromCodePoint(0x1f0a0 + this.#getValueIndex(value)+0x1 + this.#getSuitIndex(suit)*0x10);
	}
	
	static isPlayingCard(card, includeJokers=false, includeTrumps=false, includeBack=false) {
		if (card.length !== 2) return false;
		if ([0x1f0a,0x1f0b,0x1f0c,0x1f0d].indexOf(Math.floor(card.codePointAt(0)/0x10)) !== -1 && card.codePointAt(0)%16 >= 0x1 && card.codePointAt(0)%16 <= 0xe) return true;
		return (includeTrumps && this.isTrumpCard(card)) || (includeJokers && this.isJoker(card)) || (includeBack && this.isCardBack(card));
	}
	
	static getValueName(value, digits=true) {
		const index = this.#getValueIndex(value);
		if (digits && index+1 >= 2 && index+1 <= 10) return this.getValueSymbol(value);
		return this.valuesName[index];
	}
	
	static getValueSymbol(value) {
		return this.valuesSymbol[this.#getValueIndex(value)];
	}
	
	static getSuitName(suit, plural=true) {
		return this.suitsName[this.#getSuitIndex(suit)]+(plural ? "s" : "");
	}
	
	static getSuitSymbol(suit, filled=true) {
		return this.suitsSymbol[filled ? "black" : "white"][this.#getSuitIndex(suit)];
	}
	
	static #getValueIndex(value) {
		if (typeof value === "string") {
			value = value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
			if (this.valuesSymbol.indexOf(value) !== -1) return this.valuesSymbol.indexOf(value);
			if (this.valuesName.indexOf(value) !== -1) return this.valuesName.indexOf(value);
			if (this.isPlayingCard(value)) return value.codePointAt(0)%16-1;
			throw new Error("[ERROR] "+value+" is not a valid value");
		}
		throw new Error("[ERROR] The value parameter is not a string");
	}
	
	static #getSuitIndex(suit) {
		if (typeof suit === "string") {
			suit = suit.charAt(0).toUpperCase() + suit.substring(1).toLowerCase();
			var suitBis = suit;
			if (suitBis.slice(-1) === "s") suitBis = suitBis.slice(0, -1);
			if (this.suitsName.indexOf(suitBis) !== -1) return this.suitsName.indexOf(suitBis);
			if (this.suitsSymbol.black.indexOf(suitBis) !== -1) return this.suitsSymbol.black.indexOf(suitBis);
			if (this.suitsSymbol.white.indexOf(suitBis) !== -1) return this.suitsSymbol.white.indexOf(suitBis);
			if (this.isPlayingCard(suitBis)) return Math.floor(suitBis.codePointAt(0)/16%16)-10;
			throw new Error("[ERROR] "+suit+" is not a valid suit");
		}
		throw new Error("[ERROR] The suit parameter is not a string");
	}
	
	// Jokers methods
	static getJoker(color="black") {
		color = color.toLowerCase();
		if (color === "black") return "\u{1f0cf}";
		if (color === "white") return "\u{1f0df}";
		if (color === "red") return "\u{1f0bf}";
		throw new Error("[ERROR] "+color+" is not a valid color (only black, white and red)");
	}
	
	static getJokerColor(joker) {
		if (joker === "\u{1f0cf}") return "black";
		if (joker === "\u{1f0df}") return "white";
		if (joker === "\u{1f0bf}") return "red";
		throw new Error("[ERROR] "+joker+" is not a joker");
	}
	
	static isJoker(joker) {
		return joker === "\u{1f0bf}" || joker === "\u{1f0cf}" || joker === "\u{1f0df}";
	}
	
	// Trump cards methods
	static getTrumpCard(value) {
		if (!Number.isInteger(value) || value < 0 || value > 21) throw new Error("[ERROR] Trump card values are only integers between 0 and 21 (inclusive)");
		return String.fromCodePoint(0x1f0e0 + value);
	}
	
	static getTrumpCardValue(trump) {
		if (!this.isTrumpCard(trump)) throw new Error("[ERROR] "+trump+" is not a trump card");
		return trump.codePointAt(0) - 0x1f0e0;
	}
	
	static isTrumpCard(trump) {
		return trump.length === 2 && trump.codePointAt(0) >= 0x1f0e0 && trump.codePointAt(0) <= 0x1f0f5;
	}
	
	// Card back methods
	static getCardBack() {
		return "\u{1f0a0}";
	}
	
	static isCardBack(back) {
		return back === "\u{1f0a0}";
	}
}

module.exports = PlayingCards;
