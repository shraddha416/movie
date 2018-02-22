/**
 * Created by zopper on 20/02/18.
 */
export function addNewList(list) {
  return {
    type : 'ADD_NEW_MOVIE_LIST',
    payload: list
  }
}

export function appendList(list) {
  return {
    type : 'APPEND_MOVIE_LIST',
    payload: list
  }
}
