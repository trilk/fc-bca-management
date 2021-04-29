import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {
  msgCode: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { msgCode: payload };

    case CLEAR_MESSAGE:
      return { msgCode: "" };

    default:
      return state;
  }
}
