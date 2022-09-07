//Classic War Card Game

class Card {
    constructor(value, name, suit){
        this.value = value;
        this.name = name;
        this.suit = suit;
        
    }
}

class Deck{
    constructor(){
        this.cardSuit = ["Diamonds", "Hearts", "Clubs", "Spades"];
        this.cardName = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]
        //[{"2": 2}, {"3": 3}, {"4": 4}, {"5": 5}, {"6": 6}, {"7": 7}, {"8": 8}, {"9": 9}, {"10": 10}, {"Jack": 11}, {"Queen": 12}, {"King" : 13}, {"Ace": 14}];
        this.cardDeck = []
        this.shuffledDeck = []
    }

    deckBuilder(){
        for (let i = 0; i < this.cardName.length; i++){
            let value = i + 2;
            let name = this.cardName[i]
            for(let suit of this.cardSuit){
                this.cardDeck.push(new Card(value, name, suit))
            }
        }
       //console.log(this.cardDeck)
            
    }

    //this shuffling method is the Schwartzian Transform and is commonly used for small array shuffling
    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    deckShuffler(){
        this.deckBuilder();
        /*for (let i = this.cardDeck.length - 1; i > 0; i--){
            const j = Math.floor(Math.random()) * (i + 1);
            this.shuffledDeck = this.cardDeck
            console.log(this.shuffledDeck)
            [this.shuffledDeck[i], this.shuffledDeck[j]] = this.shuffledDeck[i], this.shuffledDeck[j]
        }*/
        this.shuffledDeck = this.cardDeck
            .map(element => ({element, sort: Math.random()})) //put each element in an object then we assign it a random sort key   
            .sort((a, b) => a.sort - b.sort) // we then sort using the above generated random sort key
            .map(({element}) => element) // we now unmap the array to get our original objects back
        console.log(this.shuffledDeck)
    }
}

class Player {
    constructor(name, hand = []){
        this.hand = hand;
        this.name = name;
    }

    handBuilder(){
        
    }
}

class Dealer {
    constructor(){
        this.player1 = new Player("Bob");
        this.player2 = new Player("Theresa");
        this.deck = new Deck();
    }

    dealer(){
        this.deck.deckShuffler();
        console.log(this.deck.shuffledDeck)
        for(let card in this.deck.shuffledDeck){
            //console.log(card)
            if (card % 2 === 0){
                //console.log(this.deck.shuffledDeck[card])
                this.player1.hand.push(this.deck.shuffledDeck[card])
            } else{
                this.player2.hand.push(this.deck.shuffledDeck[card])
            }
        }
        console.log(this.player1.hand)
        console.log(this.player2.hand)
    }

}

class WarGame {
    constructor(){
        this.dealer = new Dealer();

    }

    gamePlay(){
        this.dealer.dealer();
        const tieArray = [];
        let player1WinCounter = 0;
        let player2WinCounter = 0;
        while(((this.dealer.player1.hand.length > 0) && (this.dealer.player2.hand.length > 0)) || (player1WinCounter + player2WinCounter < 200)){
            let player1card = this.dealer.player1.hand.shift()
            let player2card = this.dealer.player2.hand.shift()
            if (player1card.value > player2card.value){
                console.log(`${this.dealer.player1.name}'s ${player1card.name} of ${player1card.suit} beats ${this.dealer.player2.name}'s ${player2card.name} of ${player2card.suit}`)
                this.dealer.player1.hand.push(player1card)
                this.dealer.player1.hand.push(player2card)
                if (tieArray.length > 0){
                    for (let i in tieArray){
                        this.dealer.player1.hand.push(tieArray[i])
                    }
                    tieArray.length = 0;
                }
                player1WinCounter += 1;
            } else if (player1card.value < player2card.value){
                console.log(`${this.dealer.player2.name}'s ${player2card.name} of ${player2card.suit} beats ${this.dealer.player1.name}'s ${player1card.name} of ${player1card.suit}`)
                this.dealer.player2.hand.push(player1card)
                this.dealer.player2.hand.push(player2card)
                if (tieArray.length > 0){
                    for (let i in tieArray){
                        this.dealer.player2.hand.push(tieArray[i])
                    }
                    tieArray.length = 0;
                }
                player2WinCounter += 1;
            } else {
                console.log(`${player1card.name} equals ${player2card.name}, cards are held until someone wins`)
                tieArray.push(player1card)
                tieArray.push(player2card)
            }
        }
        if (this.dealer.player1.hand.length > 0){
            alert(`${this.dealer.player1.name} wins!`)
            console.log(`${this.dealer.player1.name} had ${player1WinCounter} wins, while ${this.dealer.player2.name} had ${player2WinCounter} wins`)
            console.log(this.dealer.player1.hand)
        } else if (this.dealer.player2.hand.length > 0){
            alert(`${this.dealer.player2.name} wins!`)
            console.log(`${this.dealer.player2.name} had ${player2WinCounter} wins, while ${this.dealer.player1.name} had ${player1WinCounter} wins`)
            console.log(this.dealer.player2.hand)
        } else if(player1WinCounter > player2WinCounter){
            alert(`player 1 wins by default`)
        } else if(player1WinCounter < player2WinCounter){
            alert(`player 2 wins by default`)
        }else{
            throw(new Error ("Error... We don't know what happened..."))
        }
    }
}

//let testDeck = new Deck();
//testDeck.deckShuffler();
//let testDeal = new Dealer();
//testDeal.dealer();
let testwarGame = new WarGame();
testwarGame.gamePlay();