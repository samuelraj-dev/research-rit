import { createStore, combineReducers } from 'redux';

const initialState = {
  user: {
    username: '',
    email: '',
    photo: '',
  },
};

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer, initialState);

export default store;