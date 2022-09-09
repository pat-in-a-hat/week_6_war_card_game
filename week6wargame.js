//Promineo Week 6 Assignment - Classic War Card Game
//Written by Patrick Warner

/*
I took this weeks prompt a bit further and built a fully working war card game that plays automatically
A deck of cards is created, then shuffled, then 26 cards are dealt to each player
Each player then plays the "top" card (first in array), and the winner puts both cards on the bottom of their hand (end of array)
In the case of a tie, the tied cards and three more are placed aside
The next winner after the tie gets all of the cards
The game continues until one player has no cards left in their hand, and a winner is declared!
*/


//Build a card class with constructor objects for the card value, name, and suit
//The card value allows us to compare the cards as number values, and gives face cards values ("Jack" is 11)
//The name is all strings and is the exact name of each (i.e. "2" or "Jack")
//The suit is an addition in case I want to make this a visual game posted in browser
class Card {
    constructor(value, name, suit){
        this.value = value;
        this.name = name;
        this.suit = suit;
        
    }
}

//Here we have the deck class, with the card names and suits, as well as two empty arrays for the card deck and shuffled deck
//This will store the bulk of what we need to run the game in another class
class Deck{
    constructor(){
        this.cardSuit = ["Diamonds", "Hearts", "Clubs", "Spades"];
        this.cardName = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]
        //[{"2": 2}, {"3": 3}, {"4": 4}, {"5": 5}, {"6": 6}, {"7": 7}, {"8": 8}, {"9": 9}, {"10": 10}, {"Jack": 11}, {"Queen": 12}, {"King" : 13}, {"Ace": 14}];
        this.cardDeck = []
        this.shuffledDeck = []
    }


    //this iterates through the card name array, with another for loop iterating through suits to apply all 4 suits to each card
    //the value is assigned by adding 2 to the value of i, as 2 is our lowest card and i starts at 0
    //we then create a new Card class and push it into the cardDeck array for storage
    //with 13 names and 4 suits, this fills the cardDeck array with 52 unique Card classes, i.e. a full deck of cards
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


    //we then need to shuffle the deck, which we do by called the deckBuilder method then putting the cardDeck array into the shuffledDeck array
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
        //console.log(this.shuffledDeck)
    }
}

//we then have a player class, used to store each players hand. this also requires a name becuase why not
//as you can see hand is specified as a blank array and does not need to be entered when calling the class
class Player {
    constructor(name, hand = []){
        this.hand = hand;
        this.name = name;
    }

}

//We then utilize a dealer class to distribute the cards to each players hand (player class)
//two players are created in the constructor, as well as a new deck of cards (deck class)
class Dealer {
    constructor(){
        this.player1 = new Player("Bob");
        this.player2 = new Player("Theresa");
        this.deck = new Deck();
    }

    //our dealer creates the deck, then iterates through 52 times to distribute cards
    //I utilized a modulus with a counter to hand cards out to each player
    //each loop, if the counter is even player 1 gets a card, else player 2 gets a card
    //this leaves us with two player hands with 26 cards each, we're ready to start the game of war!
    dealer(){
        this.deck.deckShuffler();//the dealer method calls on the shuffler, which has a deck created then shuffles it
        //console.log(this.deck.shuffledDeck)
        //console.log(this.deck.shuffledDeck.length)
        let counter = 0;
        for(let i = 52; i > 0; i--){ 
            //console.log(card)
            if (counter % 2 === 0){ //modulus in use here
                this.player1.hand.push(this.deck.shuffledDeck.pop())
                counter += 1;
                
                /*console.log(this.deck.shuffledDeck)
                console.log(this.player1.hand)
                console.log(counter)*/

            } else{
                this.player2.hand.push(this.deck.shuffledDeck.pop())
                counter +=1;
                
                /*console.log(this.deck.shuffledDeck)
                console.log(this.player2.hand)
                console.log(counter)*/
            }
        }
        /*console.log(this.player1.hand)
        console.log(this.player2.hand)
        console.log(this.deck.shuffledDeck)*/
    }

}

//where the meat gets ground, as they maybe say?
//the WarGame class creates a new dealer to get everything up and running
class WarGame {
    constructor(){
        this.dealer = new Dealer();

    }

    //we then call the dealer method in the dealer class, which kicks everything into gear
    //this is because the dealer method referenced many of our other classes and methods, and therefore kicks off everything
    //we now have two players with unique hands that were recieved from a shuffled deck of cards
    //we're ready to play!
    gamePlay(){
        this.dealer.dealer();
        const tieArray = [];
        let player1WinCounter = 0;
        let player2WinCounter = 0;
        //console.log(this.dealer.player1.hand)
        //console.log(this.dealer.player2.hand)

    
        //using a while loop to play the game. the game ends once one player runs out of cards or we get 10,000 plays
        //this is because the cards are added to the bottom of the hand, and the hand is not shuffled, which I've found has created the occasional infinite loop
        while(((this.dealer.player1.hand.length > 0) && (this.dealer.player2.hand.length > 0)) && ((player1WinCounter < 10000) && (player2WinCounter < 10000)) ){
            let player1card = this.dealer.player1.hand.shift()//we pull the "top" (start of array) card from each player here using shift
            let player2card = this.dealer.player2.hand.shift()
            /*console.log("Player 1 starting hand")
            console.log(player1card)
            console.log("Player 2 starting hand")
            console.log(player2card)*/


            //then using a series of if else statements we perform the action
            //if player 1 has a larger card, the win is logged to the console and we then add both cards to the "bottom" of their hand (end of the array)
            if (player1card.value > player2card.value){
                console.log(`${this.dealer.player1.name}'s ${player1card.name} of ${player1card.suit} beats ${this.dealer.player2.name}'s ${player2card.name} of ${player2card.suit}`)
                /*console.log("before and after adding to player 1 hand")
                console.log(this.dealer.player1.hand)*/
                this.dealer.player1.hand.push(player1card)
                this.dealer.player1.hand.push(player2card)
                //console.log(this.dealer.player1.hand)

                //this nifty if statement adds all the tied cards to their hand, if the tied cards array is full (i.e. the last round was a tie)
                if (tieArray.length > 0){
                    //console.log("testing if the tie array adds to player 1's hand")
                    //console.log(tieArray)
                    for (let i = tieArray.length - 1; i > -1; i--){
                        this.dealer.player1.hand.push(tieArray.pop())
                    }
                    //tieArray.length = 0;
                    //console.log(tieArray)
                }
                player1WinCounter += 1;
                //console.log("Player 1 win count")
                //console.log(player1WinCounter)
                //console.log(this.dealer.player1.hand)


            //same stuff, just for player two now
            } else if (player1card.value < player2card.value){
                console.log(`${this.dealer.player2.name}'s ${player2card.name} of ${player2card.suit} beats ${this.dealer.player1.name}'s ${player1card.name} of ${player1card.suit}`)
                /*console.log("before and after adding to player 2 hand")
                console.log(this.dealer.player2.hand)*/
                this.dealer.player2.hand.push(player1card)
                this.dealer.player2.hand.push(player2card)
                //console.log(this.dealer.player2.hand)
                if (tieArray.length > 0){
                    //console.log("testing if the tie array adds to player 2's hand")
                    //console.log(tieArray)
                    for (let i = tieArray.length - 1; i > -1; i--){
                        this.dealer.player2.hand.push(tieArray.pop())
                    }
                    //tieArray.length = 0;
                    //console.log(tieArray)
                }
                player2WinCounter += 1;
                /*console.log("Player 2 win count")
                console.log(player2WinCounter)
                console.log(this.dealer.player2.hand)*/

                //here is our tie array. if the two card values are equal (a tie), the cards are added to an empty array (tieArray)
                //the idea is that tieArray stores the cards until the next hand, then if someone wins, the if statements for tieArray
                //are triggered, causing all of the cards set aside from the tie to be added to the winners hand
                //this also prevents a near infinite loop in the while statement, as without this the game goes on a LOOONG time
            /*} else if (player1card.value = player2card.value && this.dealer.player1.hand.length < 5){
                for (let i in this.dealer.player1.hand.length){
                    this.dealer.player2.hand.push(this.dealer.player1.hand.shift())
                }
                
            } else if(player1card.value = player2card.value && this.dealer.player2.hand.length < 5){//these two elif statements ensure that if someone is short cards to play out the tie, they lose
                for (let i in this.dealer.player2.hand.length){
                    this.dealer.player1.hand.push(this.dealer.player2.hand.shift())
                }*/
                
            } else {
                console.log(`${player1card.name} equals ${player2card.name}, cards are held until someone wins`)
                tieArray.push(player1card)
                tieArray.push(player2card)
                tieArray.push(this.dealer.player1.hand.shift())
                tieArray.push(this.dealer.player1.hand.shift())
                tieArray.push(this.dealer.player1.hand.shift())
                tieArray.push(this.dealer.player2.hand.shift())
                tieArray.push(this.dealer.player2.hand.shift())
                tieArray.push(this.dealer.player2.hand.shift())
                console.log("Tie array printed below")
                console.log(tieArray)

                /*if (this.dealer.player1.hand.length = 0){
                    this.dealer.player2.hand.push(tieArray)

                } else if (this.dealer.player2.hand.length = 0){
                    this.dealer.player1.hand.push(tieArray)

                } else{
                    console.log("enough cards tie is passed through") //this attempt to have a tie end the game did not work, instead implementing this outside the while loop
                }*/

            }
        }

        //after the while loop ends, we assume somone won
        //we check if its player 1 or player 2 using an if statement
        //and also have a handy error statement just in case...
        if (this.dealer.player1.hand.length > this.dealer.player2.hand.length){
            alert(`${this.dealer.player1.name} wins!`)

            for (let i = tieArray.length; i > -1; i--){
                if (tieArray[0] instanceof Card){
                    this.dealer.player1.hand.push(tieArray.shift())//push any cards from the tie into the hand to make a full 52
                } else{
                    tieArray.shift()
                }
            }


            console.log(`${this.dealer.player1.name} had ${player1WinCounter} wins, while ${this.dealer.player2.name} had ${player2WinCounter} wins`)
            console.log("Player 1 hand")
            console.log(this.dealer.player1.hand)
            console.log("Player 2 hand")
            console.log(this.dealer.player2.hand)
            
            //console.log(tieArray)

        } else if (this.dealer.player2.hand.length > this.dealer.player1.hand.length){
            alert(`${this.dealer.player2.name} wins!`)
            
            for (let i = tieArray.length; i > -1; i--){
                if (tieArray[0] instanceof Card){
                    this.dealer.player2.hand.push(tieArray.shift())//push any cards from the tie into the hand to make a full 52
                } else{
                    tieArray.shift()
                }
            }

            console.log(`${this.dealer.player2.name} had ${player2WinCounter} wins, while ${this.dealer.player1.name} had ${player1WinCounter} wins`)
            console.log("Player 2 hand")
            console.log(this.dealer.player2.hand)
            console.log("Player 1 Hand")
            console.log(this.dealer.player1.hand)

            //console.log(tieArray)



        }else{
            throw(new Error ("Error... We don't know what happened...")) /*else if(player1WinCounter > player2WinCounter){
            alert(`player 1 wins by default`)
        } else if(player1WinCounter < player2WinCounter){
            alert(`player 2 wins by default`)
        }*/
        }
    }
}




//well folks, that's the game! hope you enjoyed it
//we'll see if I get around to utilizing html to make this a visual game where you can see the cards




//let testDeck = new Deck();
//testDeck.deckShuffler();
//let testDeal = new Dealer();
//testDeal.dealer();
let testwarGame = new WarGame();
testwarGame.gamePlay();