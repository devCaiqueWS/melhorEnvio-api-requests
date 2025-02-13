import React from 'react';
import './FreteOption.css';

const FreteOption = ({ option, index }) => {
  return (
    option.price ? (
      <div key={index} className="frete-option">
        <input type="checkbox" id={`frete-${index}`} className="frete-checkbox" />
        <label htmlFor={`frete-${index}`} className="frete-label">
          <img src={option.company.picture} alt={option.companyName} className="frete-image" />
          <div className="frete-details">
            <h3 className="frete-name">{option.name}</h3>
            <p className="frete-price">{option.price} {option.currency}</p>
            {option.delivery_time ? <p className="frete-delivery-time">Tempo de entrega: {option.delivery_time} dias úteis</p> : null}
          </div>
        </label>
      </div>
    ) : null
  );
};

export default FreteOption;