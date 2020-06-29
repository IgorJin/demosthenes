import React from 'react';
const Select = ({children, float}) => {
    return (
        <div className={`select ${float}`}>
            {children} 
            <select>
                <option>This week</option>
                <option>This month</option>
            </select>
        </div>
    )
   
}
export default Select;