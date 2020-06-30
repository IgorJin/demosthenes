import React from 'react';
import RoomButton from './RoomButton';
import Header from '../Header';
import {comeWebinar} from '../../actions'
import { connect } from 'react-redux'
import {Link} from "react-router-dom";
import './index.scss'
const Room = ({comeInWebinar}) => {
    return (
        <div className='room'>
            <div className='room__inner'>
                <div className='room__inner__main'>
                    <div className='room__inner__item'>
                        <div className='room__inner__item__head'>
                            <div>
                                <Link to ='/webinar'>
                                    <RoomButton
                                        color={'blue'} onClick={comeInWebinar}>Запустить вебинар</RoomButton>
                                </Link>
                                
                                <RoomButton
                                    color={'green'}>Запланировать вебинар</RoomButton> 
                            </div>
                            <Header>Новые</Header>
                        </div>
                        <div className='room__inner__item__body'>
                            
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

const mapDispatchToProps = (dispatch) =>({
    comeInWebinar: () => dispatch(comeWebinar())
})
export default connect(null, mapDispatchToProps)(Room);