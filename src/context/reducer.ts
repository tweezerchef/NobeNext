import { SET_WISHLIST, SET_LENDING_LIBRARY, SET_LENDING_LIBRARY_IDS, SET_USER_BOOKS, SET_USER_BOOKS_IDS, SET_USER, SET_WISHLIST_IDS, SET_STAR_RATINGS } from './actions';

function userReducer(state, action) {
  switch (action.type) {
    case SET_USER:
        return { ...state, user: action.payload };
    case SET_WISHLIST:
      return { ...state, wishList: action.payload };
    case SET_LENDING_LIBRARY:
      return { ...state, lendingLibrary: action.payload };
      case SET_LENDING_LIBRARY_IDS:
        return { ...state, lendingLibraryIDs: action.payload };
    case SET_USER_BOOKS:
      return { ...state, userBooks: action.payload };
    case SET_USER_BOOKS_IDS:
      return { ...state, userBooksIDs: action.payload };
    case SET_WISHLIST_IDS:
      return { ...state, wishListIDs: action.payload };
    case SET_STAR_RATINGS:
      return { ...state, starRatings: action.payload };
    default:
      return state;
  }
}

export default userReducer;
