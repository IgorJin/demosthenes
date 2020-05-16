import React from './node_modules/react';
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