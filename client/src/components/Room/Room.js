import React, {useEffect} from 'react';
import RoomButton from './RoomButton';
import Header from '../Header';
import {webinarFetch, allWebinarsFetch} from '../../actions'
import { connect } from 'react-redux'
import {Link} from "react-router-dom";
import './index.scss'
const Room = ({comeInWebinar, webinars, user, allWebinars}) => {
    useEffect(()=>{
        if (user._id) allWebinars(user._id)
    }, [user])
    return (
        <div className='room'>
            <div className='room__inner'>
                <div className='room__inner__main'>
                    <div className='room__inner__item'>
                        <div className='room__inner__item__head'>
                            <div>
                                <Link to ='/webinar'>
                                    <RoomButton
                                        color={'blue'} onClick={() =>comeInWebinar(user._id)}>Запустить вебинар</RoomButton>
                                </Link>
                                
                                <RoomButton
                                    color={'green'}>Запланировать вебинар</RoomButton> 
                            </div>
                            <Header>Новые</Header>
                        </div>
                        <div className='room__inner__item__body'>
                            {webinars && webinars.map((webinar, idx)=>(
                                <div key={idx}> <Link to ={`/webinar/${webinar.id}`}>{webinar.title}; by {webinar.host.displayName}</Link></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='room__inner__sub'>
                    <div className='room__inner__item'>
                    <div className='room__inner__item__head'>
                        <div>
                            <RoomButton
                                color={'yellow'}>Просмотреть всю статистику</RoomButton>
                        </div>
                        <Header>Прошедшие</Header> 
                        </div>
                        <div className='room__inner__item__body'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
   
}

const mapStateToProps = state => ({
    webinars: state.webinarReducer.webinars,
    user: state.authReducer.currentUser
})
const mapDispatchToProps = (dispatch) =>({
    comeInWebinar: (uId) => dispatch(webinarFetch(uId)),
    allWebinars: (uId) => dispatch(allWebinarsFetch(uId)),
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Room);