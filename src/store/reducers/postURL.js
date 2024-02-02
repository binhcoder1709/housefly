import { POSTURL } from "../../contrains";

const initialState = {};
export const postURL = (state = initialState, action) => {
  switch (action.type) {
    case POSTURL:
      // console.log(action.payload.musicSource);
      return action.payload;

    default:
      return state;
  }
};
