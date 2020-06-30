import React, {useState, useEffect} from 'react';
import Select from '../Select'
import Header from '../Header'
import DateCarousel from '../DateCarousel'
import TaskCard from '../TaskCard'
import ProgressBar from '../ProgressBar'
import ava from './task.svg'
import DealsGraph from '../DealsGraph'
import TasksArc from '../TasksArc'
import api from '../../services';

Date.prototype.daysInMonth = function() {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};
Date.prototype.formatDay = function() {
    return `${this.getDate()} ${monthNames[this.getMonth()]}, ${this.getFullYear()}`;
};  

const date = new Date();
const today = date.getDate();
const currentMonth = date.getMonth();
const weekDay = date.getDay();
const period = 7 //date.daysInMonth();
const dayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const monthNames =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const defaultTasks = [
    {text: 'Invite to office meet-up', type:'Call', date:'December 23, 2018', recipient: {image: ava, name:'John Shelt'}, status:2},
    {text: 'Send benefit review by Sunday', type:'Reminder', date:'December 23, 2018', recipient: {image: ava, name:'George Fields'}, status:1},
    {text: 'Send benefit review by Sunday', type:'Event', date:'December 23, 2018', recipient: {image: ava, name:'George Fields'}, status:0}
]

const getDateArray = (d, period) => {
    let dateArr =[];
    for (let i=0; i<period; i++) {
        dateArr.push(new Date ((d.setDate(d.getDate() + (i-d.getDay())))).getDate());
    }
    return dateArr
}

const Dashboard = () => {
    let dateArr = getDateArray(date, period);
    const [task, setTasks] = useState([])
    const [curDay, setCurDay] = useState(dateArr[0]);
    const [weekDay, setWeekDay] = useState(0);
    const [curMonth, setCurMonth] = useState(currentMonth);
    const amountTasks = 10;
    const completedTasks = 8;
    
    useEffect(()=>{
        api.getTask().then((res)=> 
          res.json()).then(d => {
          console.log(d)
          setTasks(d)
        })
      }, [])

    const setActiveDay = (d, i) => {
        setCurDay(d);
        setWeekDay(i)
    }
    return (
        <div className='dashboard'>
            <div className='dashboard__inner '>
                <div className='dashboard__inner__main'>
                    <div className='dashboard__inner__item'>
                        <div className='dashboard__inner__item__head'> 
                            <Select float='right'>Show</Select>
                            <div className='dashboard__inner__item__head__task_counter'>
                                {completedTasks} task completed out of {amountTasks}
                            </div>
                            <ProgressBar completedTasks={completedTasks} amountTasks={amountTasks}/>
                            <Header>{curDay} {monthNames[curMonth]}, {dayOfWeek[weekDay]}</Header>
                            <DateCarousel dateArr={dateArr} today={today} activeDay={curDay} onClick={setActiveDay}></DateCarousel>
                        </div>
                        <div className='dashboard__inner__item__body'>
                            {   
                                task.filter(t => new Date(t.date).getDate() == curDay).map((t,i) => 
                                    <TaskCard
                                        info={t} index={i} dateStr={new Date(t.date).formatDay()}
                                    />
                                    )
                            }
                            <div className='dashboard__inner__item__body__show_more'>
                                <span>
                                    Show more
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard__inner__sub'>
                    <div className='dashboard__inner__item dashboard__inner__item--small'>
                        <div className='dashboard__inner__item__head'>
                            <Select float='right'>Show</Select>
                            <Header>Deals</Header>
                        </div>
                        <div className='dashboard__inner__item__body'>
                            <DealsGraph />
                        </div>
                    </div>
                    <div className='dashboard__inner__item dashboard__inner__item--small'>
                        <div className='dashboard__inner__item__head'>
                            <Select float='right'>Show</Select>
                            <Header>Tasks</Header>
                        </div>
                        <div className='dashboard__inner__item__body'>
                            <TasksArc data = {{active: 3, ended: 6, completed: 9}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         
    )
   
}
export default Dashboard;