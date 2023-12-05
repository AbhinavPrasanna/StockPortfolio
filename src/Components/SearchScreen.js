import React from 'react'
import Card from './Card'
import RowScreen from './RowScreen'
import { useLocation } from 'react-router-dom';

function SearchScreen() {
  const cards = [
    new Card(1,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/sapphirepreferredcard.png","Chase Sapphire Preferred Card", "Personal", "Chase",true,5.0),
    new Card(2,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/citicustomcash.png", "Citi Custom Cash", "Personal", "Citi",true,5.0),
    new Card(3,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/freedomunlimitedcard.png", "Chase Freedom Unlimited", "Personal", "Chase",false,5.0),
    new Card(4,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/inkpreferredcard.png", "Chase Ink Preferred Card", "Buisness", "Chase",false,4.0),
    new Card(5,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/inkcash.png", "Chase Ink Cash Card", "Buisness", "Chase",false,5.0),
    new Card(6,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/inkunlimitedcard.png", "Chase Ink Unlimited Card", "Buisness", "Chase",false,5.0),
    new Card(8, "https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/costcoanywherecard.png","Costco Anywhere Visa Card", "Personal", "Citi",true,5.0),
    new Card(9,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/amexplatinum.png","Amex Platnium Card", "Personal", "Amex",true,3.0),
    new Card(10,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/amexbluecashpreferred.jpg","Amex Blue Cash Preferred", "Personal", "Amex",true,4.0),
    new Card(11,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/amexbluecash.jpg","Amex Blue Card", "Personal", "Amex",false,4.5),
    new Card(12,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/venturexcard.jpg","Capital One Venture Card", "Personal", "Capital One",4.5),
    new Card(13,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/southwestpluscard.png","Chase Southwest Plus Card", "Personal", "Chase",true,4.0),
    new Card(14,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/unitedexplorercard.png","Chase United Explorer Card", "Personal", "Chase",true,4.0),
    new Card(15,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/primevisacard.png","Chase Prime Visa Card", "Personal", "Chase",true,4.8),
    new Card(16,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wellsfargoautograph.png","Wells Fargo Autograph", "Personal", "Wells Fargo",false,4.3),
    new Card(17,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wellsfargoreflect.png","Wells Fargo Reflect", "Personal", "Wells Fargo",false,4.3),
    new Card(18,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wfactivecash.png","Wells Fargo Active Cash", "Personal", "Wells Fargo",false,5.0),
    new Card(19,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/freedomflexcard.png","Chase Freedom Flex","Personal","Chase",false,5.0),
    new Card(20,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/mariottbonvoypremier.png","Mariott Bonvoy Premier","Personal","Chase",true,3.5),
    new Card(21,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/hiltonhonors.jpg","Hilton Honors","Personal","Amex",true,3.5),
    new Card(22,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/hiltonhonorsamex.png","Hilton Honors","Personal","Amex",true,3.5),
    new Card(23,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/ihgpremiercard.png","IHG Rewards Card","Personal","Chase",true,3.5),
    new Card(24,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/sapphirereservecard.png","Chase Sapphire Reserve Card","Personal","Chase",true,5.0),
    new Card(25,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/discoverit.jpeg","Discover IT Card","Personal","Discover",true,3.5),
    new Card(25,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/freedom_rise_card.png","Chase Freedom Rise","Personal","Chase",true,3.5),
    new Card(26,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/slate_edge_card.png", "Chase Slate Edge", "Personal", "Chase",true,3.0),
    new Card(27,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/bankamericard.png", "Bank of America BankAmericard", "Personal", "Bank of America",true,3.0),
    new Card(27,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/citipremiercard.png", "Citi Premier Card", "Personal", "Citi",true,3.5),
      ];
  const Location = useLocation();
  const searchWord = Location.state.searchWord;
  const SearchCards = cards.filter((card) => card.cardName.toLowerCase().includes(searchWord.toLowerCase()));
  return (
    <div>
      <RowScreen title="" cards={SearchCards}/>
    </div>
  )
}

export default SearchScreen