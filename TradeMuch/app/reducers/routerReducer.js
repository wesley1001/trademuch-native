import {
  Actions,
} from 'react-native-router-flux';

export function router(state = {}, action) {
  let array = [];
  switch (action.type) {
    case Actions.BEFORE_ROUTE:
      console.log("BEFORE_ROUTE:", action);
      return {
        ...state,
        beforeRoute: action.name,
      };
    case Actions.AFTER_ROUTE:
      console.log("AFTER_ROUTE!!!!!!!!!!!!!!:", action, state.routeHistory);
      if (state.routeHistory) {
        array = [...state.routeHistory];
      }
      array.push(action.name);
      return {
        ...state,
        routeHistory: array,
      };
    case Actions.AFTER_POP:
      console.log("AFTER_POP:", action);
      if (state.routeHistory) {
        array = [...state.routeHistory];
      }
      array.push(action.name);
      return {
        ...state,
        beforeRoute: action.name,
        routeHistory: array,
      };
    case Actions.BEFORE_POP:
      console.log("BEFORE_POP:", action);
      return state;
    case Actions.AFTER_DISMISS:
      //console.log("AFTER_DISMISS:", action);
      return state;
    case Actions.BEFORE_DISMISS:
      //console.log("BEFORE_DISMISS:", action);
      return state;
    default:
      return state;
  }
}
