import React from 'react'

import '../Stylesheets/RowScreen.css'

function RowScreen(props) {
  const title = props.title;
  return (
    <div className='row'>
        <h1 className='RowTitleTypography'>{title}</h1>
        <div className='row_posters'>
            {props.cards.map((card) => (
              <button className='TransparentButton row_poster'   key={card.cardID}  data-testid='card_button'>
                <img 
              
                src={card.cardThumbnailURL} alt={card.cardName}
                width="220px"
                height="140px"
                data-testid='card_poster'/>
              </button>
            ))}
        </div>
    </div>
  )
}

export default RowScreen