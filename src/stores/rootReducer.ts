import {combineReducers} from 'redux';
import userSlice from './infoUser.store';

// Gộp các reducers lại với nhau
const rootReducer = combineReducers({
  userInfo: userSlice,
});

export default rootReducer;
