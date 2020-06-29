import React from 'react';
const cn = require('../../node_modules/classnames');

const DateCarousel = ({dateArr, activeDay, onClick, today}) => {  
    const dayOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat',]
    return (
        <div className = 'date_carousel'>
            {dateArr.map((day, index) =>
                (<div key={index} className={cn('date_carousel__item', {'date_carousel__item--active' :activeDay == day, 'date_carousel__item--today':today==day})} onClick={() => onClick(day, index)} >
                    <div className='date_carousel__item__str_date '>{dayOfWeek[index - 7*Math.floor(index / 7)]}</div>
                    <div className='date_carousel__item__num_date'><span>{day}</span></div>
                </div>))
            }
        </div>
    )
   
}
export default DateCarousel;