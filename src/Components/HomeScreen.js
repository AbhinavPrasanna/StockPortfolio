import React from 'react'
import Card from './Card'
import RowScreen from './RowScreen'

function HomeScreen() {
  const cards = [
    new Card(1,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/sapphirepreferredcard.png","Chase Sapphire Preferred Card", "Personal", "Chase"),
    new Card(2,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/citicustomcash.png", "Citi Custom Cash", "Personal", "Citi"),
    new Card(3,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/freedomunlimitedcard.png", "Chase Freedom Unlimited", "Personal", "Chase"),
    new Card(4,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/inkpreferredcard.png", "Chase Ink Preferred Card", "Buisness", "Chase"),
    new Card(5,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/inkcash.png", "Chase Ink Cash Card", "Buisness", "Chase"),
    new Card(6,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/inkunlimitedcard.png", "Chase Ink Unlimited Card", "Buisness", "Chase"),
    new Card(8, "https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/costcoanywherecard.png","Costco Anywhere Visa Card", "Personal", "Citi"),
    new Card(9,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/amexplatinum.png","Amex Platnium Card", "Personal", "Amex"),
    new Card(10,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/amexbluecashpreferred.jpg","Amex Blue Cash Preferred", "Personal", "Amex"),
    new Card(11,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/amexbluecash.jpg","Amex Blue Card", "Personal", "Amex"),
    new Card(12,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/venturexcard.jpg","Capital One Venture Card", "Personal", "Capital One"),
    new Card(13,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/southwestpluscard.png","Chase Southwest Plus Card", "Personal", "Chase"),
    new Card(14,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/unitedexplorercard.png","Chase United Explorer Card", "Personal", "Chase"),
    new Card(15,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/primevisacard.png","Chase Prime Visa Card", "Personal", "Chase"),
    new Card(16,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wellsfargoautograph.png","Wells Fargo Autograph", "Personal", "Wells Fargo"),
    new Card(17,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wellsfargoreflect.png","Wells Fargo Reflect", "Personal", "Wells Fargo"),
    new Card(18,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wfactivecash.png","Wells Fargo Active Cash", "Personal", "Wells Fargo"),
    new Card(19,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/freedomflexcard.png","Chase Freedom Flex","Personal","Chase"),
    new Card(20,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/mariottbonvoypremier.png","Mariott Bonvoy Premier","Personal","Chase"),
    new Card(21,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/hiltonhonors.jpg","Hilton Honors","Personal","Chase"),
    new Card(22,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/hiltonhonorsamex.png","Hilton Honors","Personal","Chase"),
    new Card(23,"https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/ihgpremiercard.png","IHG Rewards Card","Personal","Chase"),

      ];
    const personalcards = cards.filter(card => card.type === "Personal");
    const buisnesscards = cards.filter(card => card.type === "Buisness");
  return (
    <div>
      <div class="container-xl">
        <button class="mt-5 ms-5 w-75 TransparentButton">
          <img src="https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/sapphirepreferredcard.png" alt="Search" class=" ms-5 mt-4 w-75" />
        </button>
      </div>
      <div class="mt-5">
        <RowScreen title="Personal" cards={personalcards}/>
      </div>
      <div class="mt-5">
        <RowScreen title="Buisness" cards={buisnesscards}/>
      </div>
    </div>
  )
}

export default HomeScreen