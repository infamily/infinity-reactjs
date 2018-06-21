import { combineReducers } from 'redux';
// import topicView from 'scenes/TopicView/data/reducer'; // import Reducer from Scene
import home from 'scenes/Home/data/reducer';

// to do: persistedComment, persistedTopic (to TopicView)

// inject to the global reducer
export default combineReducers({
  home
});
