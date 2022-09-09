//Promineo Week 6 Assignment - Classic War Card Game - Mocha & Chai Unit Test
//Written by Patrick Warner

//Mocha and Chai Unit Test for my Week 6 code

let expect = chai.expect //variable so we can call chai's expect

describe('Deck Builder Tester', function() {
    describe('#deck', function(){
        it("should build an array of cards", function(){
            let deck = new Deck
            deck.deckBuilder()
            expect(deck.cardDeck).to.be.a('array')
            expect(deck.cardDeck[0]).to.be.instanceOf(Card)
        })

        it("should have all 52 cards", function(){
            let deck = new Deck
            deck.deckBuilder()
            expect(deck.cardDeck.length).to.equal(52)
        })

        it("should have strings for each card suit and name, and a number for value", function(){
            let deck = new Deck
            deck.deckBuilder()
            expect(deck.cardDeck[0].suit).to.be.a('string')
            expect(deck.cardDeck[0].name).to.be.a('string')
            expect(deck.cardDeck[0].value).to.be.a('number')
        })
    })

})