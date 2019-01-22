import { Loopback } from '../lib';

export const GET_USERS_LIST = 'GET_USERS_LIST';
export const GET_MORE_USERS_LIST = 'GET_MORE_USERS_LIST';
export const GET_USER = 'GET_USER'


const getUsersList = () => async (dispatch) => {
  let user = new Loopback('users')
  let userResult = await user.find({ "limit": "12", "skip": "0" });
  dispatch({
    type: GET_USERS_LIST,
    payload: userResult.data
  })
}

const getMoreUserList = (skip) => async (dispatch) =>{
  let user = new Loopback('users')
  let userResult = await user.find({ "limit": "12", "skip": skip });


  dispatch({
    type: GET_MORE_USERS_LIST,
    payload:userResult.data
  })

}

export {
  getUsersList,
  getMoreUserList
}
