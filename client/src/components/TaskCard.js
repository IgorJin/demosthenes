import React from './node_modules/react';
import Recipient from './Recipient'
import TaskChangeIcon from './TaskChangeIcon'

const TaskCard = ({index, info, dateStr}) => {
    const {text, type, recipient, status} = info;
    let status_text, status_class,type1, type2 ='';
    switch (status) {
        case 0:
            status_text = 'Active';
            status_class ='active';
            type1 = 'completed';
            type2 = 'ended';
            break;
        case 1:
            status_text=  'Completed';
            status_class= 'completed';
            type1 = 'active';
            type2 = 'ended';
            break;
        case 2:
            status_text=  'Ended';
            status_class= 'ended';
            type1 = 'completed';
            type2 = 'active';
            break;
    }
    return (
        <div className='task_card' key={index}>
            <div>
                <div className='task_card__type'> {type} </div>
                <div className='task_card__text'> {text} </div>
            </div>
            <div className='task_card__date'>
                <span>Due date:</span> 
                <span className='task_card__date--date'>{dateStr} </span>
            </div>
            <div className='task_card__status'>
                <div className='task_card__status__action'>
                    <TaskChangeIcon type={type1} />
                    <TaskChangeIcon type={type2} />
                    <TaskChangeIcon type='edit' />
                    <TaskChangeIcon type='delete' />
                </div>
                <div className={`task_card__status__current_status task_card__status__current_status--${status_class}`}>
                    <span>{status_text}</span> 
                </div>
            </div>
            <div className='task_card__recipient'>
                <Recipient 
                    image = {recipient.image}
                    name =  {recipient.name}
                />
            </div>
        </div>
    )
   
}
export default TaskCard;