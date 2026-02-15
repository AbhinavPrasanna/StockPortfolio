import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/Preview.css'

function PreviewScreen() {
    const navigate = useNavigate();

    const cards = [
        {
            cardName: "Chase Sapphire Reserve",
            cardDescription: "$900 Bonus when you spend $4,000",
            cardThumbnailURL: "https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/sapphirereservecard.png",
        },
        {
            cardName: "Chase Freedom Unlimited",
            cardDescription: "$200 Bonus when you spend $500",
            cardThumbnailURL: "https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/freedomunlimitedcard.png",
        },
        {
            cardName: "Chase Sapphire Preferred",
            cardDescription: "$750 Bonus when you spend $4,000",
            cardThumbnailURL: "https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/sapphirepreferredcard.png",
        },
        {
            cardName: "Wells Fargo Active Cash",
            cardDescription: "2% Cash Back Flat",
            cardThumbnailURL: "https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/wfactivecash.png",
        },
    ];
    return (
        <div className="preview-wrapper">
            <Carousel controls={false} className="preview-carousel">
                <Carousel.Item>
                    <div className="preview-slide-content">
                        <Button
                            variant="link"
                            className="preview-card-btn w-100 p-0 border-0 bg-transparent shadow-none"
                            onClick={() => navigate('/card-details', { state: { card: cards[0] } })}
                        >
                            <img src={cards[0].cardThumbnailURL} alt="First Slide" className="preview-card-image" />
                        </Button>
                    </div>
                    <Carousel.Caption className="preview-caption">
                        <h3 className="preview-caption-title">{cards[0].cardName}</h3>
                        <p className="preview-caption-text">{cards[0].cardDescription}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="preview-slide-content">
                        <Button
                            variant="link"
                            className="preview-card-btn w-100 p-0 border-0 bg-transparent shadow-none"
                            onClick={() => navigate('/card-details', { state: { card: cards[1] } })}
                        >
                            <img src={cards[1].cardThumbnailURL} alt="Second Slide" className="preview-card-image" />
                        </Button>
                    </div>
                    <Carousel.Caption className="preview-caption">
                        <h3 className="preview-caption-title">{cards[1].cardName}</h3>
                        <p className="preview-caption-text">{cards[1].cardDescription}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="preview-slide-content">
                        <Button
                            variant="link"
                            className="preview-card-btn w-100 p-0 border-0 bg-transparent shadow-none"
                            onClick={() => navigate('/card-details', { state: { card: cards[2] } })}
                        >
                            <img src={cards[2].cardThumbnailURL} alt="Third Slide" className="preview-card-image" />
                        </Button>
                    </div>
                    <Carousel.Caption className="preview-caption">
                        <h3 className="preview-caption-title">{cards[2].cardName}</h3>
                        <p className="preview-caption-text">{cards[2].cardDescription}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="preview-slide-content">
                        <Button
                            variant="link"
                            className="preview-card-btn w-100 p-0 border-0 bg-transparent shadow-none"
                            onClick={() => navigate('/card-details', { state: { card: cards[3] } })}
                        >
                            <img src={cards[3].cardThumbnailURL} alt="Fourth Slide" className="preview-card-image" />
                        </Button>
                    </div>
                    <Carousel.Caption className="preview-caption">
                        <h3 className="preview-caption-title">{cards[3].cardName}</h3>
                        <p className="preview-caption-text">{cards[3].cardDescription}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default PreviewScreen
