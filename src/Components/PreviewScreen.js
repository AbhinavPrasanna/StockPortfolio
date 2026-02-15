import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import '../Stylesheets/Preview.css'

function PreviewScreen() {
    return (
        <div className="preview-wrapper">
            <Carousel controls={false} className="preview-carousel">
                <Carousel.Item>
                    <div className="preview-slide-content">
                        <Button variant="link" className="preview-card-btn w-100 p-0 border-0 bg-transparent shadow-none">
                            <img src="https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/sapphirereservecard.png" alt="First Slide" className="preview-card-image" />
                        </Button>
                    </div>
                    <Carousel.Caption className="preview-caption">
                        <h3 className="preview-caption-title">Chase Sapphire Reserve</h3>
                        <p className="preview-caption-text">$900 Bonus when you spend $4,000</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="preview-slide-content">
                        <Button variant="link" className="preview-card-btn w-100 p-0 border-0 bg-transparent shadow-none">
                            <img src="https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/freedomunlimitedcard.png" alt="Second Slide" className="preview-card-image" />
                        </Button>
                    </div>
                    <Carousel.Caption className="preview-caption">
                        <h3 className="preview-caption-title">Chase Freedom Unlimited</h3>
                        <p className="preview-caption-text">$200 Bonus when you spend $500</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="preview-slide-content">
                        <Button variant="link" className="preview-card-btn w-100 p-0 border-0 bg-transparent shadow-none">
                            <img src="https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/sapphirepreferredcard.png" alt="Third Slide" className="preview-card-image" />
                        </Button>
                    </div>
                    <Carousel.Caption className="preview-caption">
                        <h3 className="preview-caption-title">Chase Sapphire Preferred</h3>
                        <p className="preview-caption-text">$750 Bonus when you spend $4,000</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="preview-slide-content">
                        <Button variant="link" className="preview-card-btn w-100 p-0 border-0 bg-transparent shadow-none">
                            <img src="https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wfactivecash.png" alt="Fourth Slide" className="preview-card-image" />
                        </Button>
                    </div>
                    <Carousel.Caption className="preview-caption">
                        <h3 className="preview-caption-title">Wells Fargo Active Cash</h3>
                        <p className="preview-caption-text">2% Cash Back Flat</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default PreviewScreen
