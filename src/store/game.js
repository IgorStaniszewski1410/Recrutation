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
    passQuestionAnswerSuccess: (state, action) =>  {
      return {
        ...state.scores,
        scores: [...state.scores, action.payload]
      }
    },
    endGameSuccess: (state) =>  {
      state.isGameFinished = true;
    },
    resetScoresSuccess: (state) => {
      return {
        ...state.scores,
        scores: []
      }
    }
  },
});

export default scores.reducer

const { passQuestionAnswerSuccess, endGameSuccess, resetScoresSuccess } = scores.actions;

export const dispatchAnswer = ({ answer }) => async dispatch => {
  try {
    dispatch(passQuestionAnswerSuccess(answer));
  } catch (e) {
    return console.error(e.message);
  }
};

export const endGame = ({ isGameFinished }) => async dispatch => {
  try {
    dispatch(endGameSuccess(isGameFinished));
  } catch (e) {
    return console.error(e.message);
  }
};

export const resetScores = () => async dispatch => {
  try {
    dispatch(resetScoresSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

