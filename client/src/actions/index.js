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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          dispatch(loginUser(data.user));
        }
      });
  };
};

export const authPostFetch = () => {
  return (dispatch) => {
    return fetch("http://localhost:3001/api/users/auth", {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data._id) {
          dispatch(loginUser(data));
          return true;
        }
      });
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

export const registerWithGoogleFetch = (data) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/api/users/google`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          dispatch(loginUser(data.user));
        }
      });
  };
};

export const loginWithGoogleFetch = (data) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/api/users/google`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          dispatch(loginUser(data.user));
        }
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
