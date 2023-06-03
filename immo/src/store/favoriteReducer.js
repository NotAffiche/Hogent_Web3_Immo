const initialState = {
    favorites: [],
  };
  
  const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_FAVORITE':
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      case 'REMOVE_FAVORITE':
        return {
          ...state,
          favorites: state.favorites.filter(
            (favoriteId) => favoriteId !== action.payload
          ),
        };
      default:
        return state;
    }
  };
  
  export default favoriteReducer;