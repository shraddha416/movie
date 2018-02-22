/**
 * Created by zopper on 20/02/18.
 */
const initialState = {
  list: [],
};

const movielist = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_MOVIE_LIST':
      return {
        ...state,
        list: action.payload
      }
    case 'APPEND_MOVIE_LIST':
      return {
        ...state,
        list: state.list.concat(action.payload)
      }
    default:
      return state
  }
}
export default movielist;
