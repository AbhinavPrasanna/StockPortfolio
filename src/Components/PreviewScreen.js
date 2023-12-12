import React from 'react'
import Card from './Card'
import Carousel from 'react-bootstrap/Carousel';
import '../Stylesheets/Preview.css'

function PreviewScreen() {
    return (
        <div>
            <Carousel controls={false}>
                <Carousel.Item>
                    <button class="w-100 TransparentButton">
                        <img src="https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/sapphirereservecard.png" alt="First Slide" class="w-25" />
                    </button>
                    <Carousel.Caption>
                        <h3>Chase Sapphire Reserve</h3>
                        <p>$900 Bonus when you spend $4,000</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <button class="w-100 TransparentButton">
                        <img src="https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/freedomunlimitedcard.png" alt="Second Slide" class="w-25" />
                    </button>
                    <Carousel.Caption>
                        <h3>Chase Freedom Unlimited</h3>
                        <p>$200 Bonus when you spend $500</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <button class="w-100 TransparentButton">
                        <img src="https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/sapphirepreferredcard.png" alt="Third Slide" class="w-25" />
                    </button>
                    <Carousel.Caption>
                        <h3>Chase Sapphire Preferred</h3>
                        <p>$750 Bonus when you spend $4,000</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <button class="w-100 TransparentButton">
                        <img src="https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wfactivecash.png" alt="Fourth Slide" class="w-25" />
                    </button>
                    <Carousel.Caption>
                        <h3>Wells Fargo Active Cash</h3>
                        <p>2% Cash Back Flat</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default PreviewScreen
