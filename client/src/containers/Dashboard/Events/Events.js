import React, { useEffect, useState } from "react";
import RoomButton from "./RoomButton";
import Header from "../../../components/Header";
import Block from "../block";
import { meetingFetch, allMeetingsFetch } from "../../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAll } from "../../../lib/events";
import "./index.scss";

const Events = ({ comeInMeeting, user }) => {
  const [events, setEvents] = useState([]);
  console.log("Events -> events", events)

  useEffect(() => {
    (async function () {
      const { result, error } = await getAll();
      if (!error) {
        setEvents(result.data.events);
      }
    })();
  }, []);

  return ( 
    <>
      <Block type="main-half">
        <div className="room__inner__item__head">
          <div>
            <Link to="/meeting">
              <RoomButton
                color={"blue"}
                onClick={() => comeInMeeting(user._id)}
              >
                Запустить вебинар
              </RoomButton>
            </Link>

            <RoomButton color={"green"}>Запланировать вебинар</RoomButton>
          </div>
          <Header>Новые</Header>
        </div>

        <div className="room__inner__item__body">
          {events.length ? (
            events.map((event, idx) => (
              <div key={idx}>
                <Link to={`/e/${event.id}`}>
                  {event.title}; by {event.host.displayName}
                </Link>
              </div>
            ))
          ) : (
            <div>No one meetings</div>
          )}
        </div>
      </Block>

      <Block type="main-half">
        <div className="room__inner__item__head">
          <div>
            <RoomButton color={"yellow"}>Просмотреть всю статистику</RoomButton>
          </div>
          <Header>Прошедшие</Header>
        </div>
        <div className="room__inner__item__body"></div>
      </Block>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  comeInMeeting: (uId) => dispatch(meetingFetch(uId)),
  allMeetings: (uId) => dispatch(allMeetingsFetch(uId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Events);
