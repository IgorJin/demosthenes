import React from 'react';
import Avatar from './Avatar';

const Recipient = ({ name, image }) => {
    return (
        <div className='recipient'>
            <Avatar />
            <span className='recipient__name'>{name}</span>
        </div>
    )
   
}
export default Recipient;