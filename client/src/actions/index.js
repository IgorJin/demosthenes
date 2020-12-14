export const registerPostFetch = (user) => {
  return (dispatch) => {
    return fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          dispatch(loginUser(data.user));
          return true;
        }
      });
  };
};

export const loginPostFetch = (user) => {
  return (dispatch) => {
    return fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          dispatch(loginUser(data.user));
        }
      });
  };
};

export const authPostFetch = () => {
  return (dispatch) => {
    const token = localStorage.jwt;
    return (
      token &&
      fetch("http://localhost:3001/api/users/auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data._id) {
            dispatch(loginUser(data));
            return true;
          }
        })
    );
  };
};

export const meetingFetch = (id) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/api/meetings/add/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          console.log(data);
          dispatch(allMeetingsFetch(id));
        }
      });
  };
};

export const allMeetingsFetch = (id) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/api/meetings/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(meetings(data));
      });
  };
};

export const setMeetingInfo = (meeting) => ({
  type: "SET_MEETING",
  meeting,
});

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  playload: userObj,
  isLogin: true,
});

export const comeMeeting = () => ({
  type: "MEETING_COME",
  //user: userObj,
});

const meetings = (meetingsObj) => ({
  type: "GET_MEETINGS",
  allMeetings: meetingsObj,
});
