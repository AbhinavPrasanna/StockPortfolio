class Card{
    constructor(cardID,cardThumbnailURL,cardName, type, bank, annualfee, rating){
        this.cardID = cardID;
        this.cardThumbnailURL = cardThumbnailURL;
        this.cardName = cardName;
        this.type = type;
        this.bank = bank;
        this.annualfee = annualfee;
        this.rating = rating;
    }
}

export default Card;