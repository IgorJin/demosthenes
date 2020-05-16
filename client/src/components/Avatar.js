import React from './node_modules/react';

const Avatar = ({size}) => {
    const colors = [
        '#885AF8',
        '#109CF1',
        '#FFB946',
        '#F7685B',
        '#2ED47A', 
        '#192A3E'
    ]
    let cur_color = Math.floor(Math.random() * 5)
    return (
        <div className={`avatar ${size}`}  style ={{ backgroundColor: colors[cur_color]}}></div>
    )
   
}
export default Avatar;