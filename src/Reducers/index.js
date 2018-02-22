/**
 * Created by zopper on 20/02/18.
 */
const initialState = {
  list: [],
};

const movielist = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MOVIE_LIST':
      return [
        ...state,
        action.payload
    ]
    default:
      return state
  }
}
export default movielist;
