import React, { useEffect } from "react";
import RoomButton from "./RoomButton";
import Header from "../../Header";
import Block from "../block";
import { meetingFetch, allMeetingsFetch } from "../../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./index.scss";

const Room = ({ comeInMeeting, user, allMeetings }) => {
  useEffect(() => {
    if (user._id) allMeetings(user._id);
  }, [user._id]);
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
          {user.meetings &&
            user.meetings.map((meeting, idx) => (
              <div key={idx}>
                {" "}
                <Link to={`/meeting/${meeting.id}/${user._id}`}>
                  {meeting.title}; by {meeting.host.displayName}
                </Link>
              </div>
            ))}
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
export default connect(mapStateToProps, mapDispatchToProps)(Room);
