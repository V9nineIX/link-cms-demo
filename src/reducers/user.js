import {
  GET_USERS_LIST,
  GET_MORE_USERS_LIST
} from '../actions/user'

let initialState = {
   usersList : []
}

export default function (state = initialState, action) {
  const { type, payload } = action  
  switch (type) {
    case GET_USERS_LIST: {
      return {
        ...state,
        usersList: payload
      }
    }
    case GET_MORE_USERS_LIST: {
      return {
        ...state,
        usersList:  state.usersList.concat(payload)
      }
    }

      break;

    default: {
      return state
    }
  }
}
