import { createSlice } from '@reduxjs/toolkit'

const scores = createSlice({
  name: 'scores',
  initialState: {
    scores: [],
    isGameFinished: false,
  },
  reducers: {
    showScores: (state, action) => {
      state.scores = action.scores;
      state.isGameFinished = false;
      localStorage.setItem('scores', JSON.stringify(action.payload))
    },
    passQuestionAnswer: (state, action) =>  {
      state.isGameFinished = false;
    },
    passQuestionAnswerSuccess: (state, action) =>  {
      return {
        ...state.scores,
        scores: [...state.scores, action.payload]
      }
    },
    endGame: (state, action) =>  {
      state.scores = action.payload;
      state.isGameFinished = true;
    },
  },
});

export default scores.reducer

const { passQuestionAnswerSuccess } = scores.actions;

export const dispatchAnswer = ({ answer }) => async dispatch => {
  try {
    dispatch(passQuestionAnswerSuccess(answer));
  } catch (e) {
    return console.error(e.message);
  }
};
