import {
  // CHANGE_QUERY,
  // CHANGE_FLAG,
  // CHANGE_TOPIC_SOURCE,
  // CHANGE_VIEW,
  // CHANGE_PAGE,
  CHANGE_HOME_PARAMS
} from './actiontypes';

export function changeHomeParams(params) {
  return {
    type: CHANGE_HOME_PARAMS,
    params
  };
}

// export function changeQuery(query) {
//   return {
//     type: CHANGE_QUERY,
//     query
//   };
// }

// export function changeFlag(flag) {
//   return {
//     type: CHANGE_FLAG,
//     flag
//   };
// }

// export function changeTopicSource(topicSource) {
//   return {
//     type: CHANGE_TOPIC_SOURCE,
//     topicSource
//   };
// }

// export function changeView(view) {
//   return {
//     type: CHANGE_VIEW,
//     view
//   };
// }

// export function changePage(page) {
//   return {
//     type: CHANGE_PAGE,
//     page
//   };
// }
