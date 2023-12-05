import React from 'react'
import Card from './Card'
import RowScreen from './RowScreen'
import { useLocation } from 'react-router-dom';

function SearchScreen() {
  const cards = [
    new Card(1,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/sapphirepreferredcard.png","Chase Sapphire Preferred Card", "Personal", "Chase",true),
    new Card(2,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/citicustomcash.png", "Citi Custom Cash", "Personal", "Citi",true),
    new Card(3,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/freedomunlimitedcard.png", "Chase Freedom Unlimited", "Personal", "Chase",false),
    new Card(4,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/inkpreferredcard.png", "Chase Ink Preferred Card", "Buisness", "Chase",false),
    new Card(5,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/inkcash.png", "Chase Ink Cash Card", "Buisness", "Chase",false),
    new Card(6,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/inkunlimitedcard.png", "Chase Ink Unlimited Card", "Buisness", "Chase",false),
    new Card(8, "https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/costcoanywherecard.png","Citi Costco Anywhere Visa Card", "Personal", "Citi",true),
    new Card(9,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/amexplatinum.png","Amex Platnium Card", "Personal", "Amex",true),
    new Card(10,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/amexbluecashpreferred.jpg","Amex Blue Cash Preferred", "Personal", "Amex",true),
    new Card(11,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/amexbluecash.jpg","Amex Blue Card", "Personal", "Amex",false),
    new Card(12,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/venturexcard.jpg","Capital One Venture Card", "Personal", "Capital One",true),
    new Card(13,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/southwestpluscard.png","Chase Southwest Plus Card", "Personal", "Chase",true),
    new Card(14,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/unitedexplorercard.png","Chase United Explorer Card", "Personal", "Chase",true),
    new Card(15,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/primevisacard.png","Chase Prime Visa Card", "Personal", "Chase",true),
    new Card(16,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wellsfargoautograph.png","Wells Fargo Autograph", "Personal", "Wells Fargo",false),
    new Card(17,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wellsfargoreflect.png","Wells Fargo Reflect", "Personal", "Wells Fargo",false),
    new Card(18,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wfactivecash.png","Wells Fargo Active Cash", "Personal", "Wells Fargo",false),
    new Card(19,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/freedomflexcard.png","Chase Freedom Flex","Personal","Chase",false),
    new Card(20,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/mariottbonvoypremier.png","Mariott Bonvoy Premier","Personal","Chase",true),
    new Card(21,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/hiltonhonors.jpg","Hilton Honors","Personal","Chase",true),
    new Card(22,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/hiltonhonorsamex.png","Hilton Honors","Personal","Chase",true),
    new Card(23,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/ihgpremiercard.png","IHG Rewards Card","Personal","Chase",true),

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