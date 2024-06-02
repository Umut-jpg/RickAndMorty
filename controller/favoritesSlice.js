import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('favorites');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};
const saveFavorites = async (favorites) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem('favorites', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    characters: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.characters = action.payload;
    },
    addFavorite: (state, action) => {
      if (state.characters.length < 10) {
        state.characters.push(action.payload);
        saveFavorites(state.characters);
      } else {
        alert('Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerdençıkarmalısınız');
      }
    },
    removeFavorite: (state, action) => {
      state.characters = state.characters.filter(character => character.id !== action.payload);
      saveFavorites(state.characters);
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

export const initializeFavorites = () => async (dispatch) => {
  const favorites = await loadFavorites();
  dispatch(setFavorites(favorites));
};

export default favoritesSlice.reducer;
