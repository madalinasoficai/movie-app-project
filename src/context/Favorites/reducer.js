export const initialFavoritesState = {
  favorites: [],
};

export function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.favorites.some((f) => f.id === action.payload.id)) return state;
      return { ...state, favorites: [...state.favorites, action.payload] };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((m) => m.id !== action.payload),
      };

    default:
      return state;
  }
}
