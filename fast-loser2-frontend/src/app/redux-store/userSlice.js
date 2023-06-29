import { createSlice } from '@reduxjs/toolkit';
import { setUserService } from './..//services/tokenServices';

const initialState = {
  adresse: null,
  cp: null,
  dateNaissance: null,
  email: null,
  id: null,
  nom: null,
  prenom: null,
  roles: null,
  silence: null,
  tokens: null,
  ville: null,
  imgProfil: null,
  idMusic: null,
  description: null,
  date_unban: null,
  avertissements: null,
  isGoogleUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.adresse = action.payload.adresse;
      state.cp = action.payload.cp;
      state.dateNaissance = action.payload.dateNaissance;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.nom = action.payload.nom;
      state.prenom = action.payload.prenom;
      state.roles = action.payload.roles;
      state.silence = action.payload.silence;
      state.tokens = action.payload.tokens;
      state.ville = action.payload.ville;
      state.imgProfil = action.payload.img_profil;
      state.idMusic = action.payload.id_music;
      state.description = action.payload.description;
      state.date_unban = action.payload.date_unban;
      state.avertissements = action.payload.avertissements;
      state.isGoogleUser = action.payload.isGoogleUser;
      setUserService(action.payload)
    },
    clearUser: (state) => {
      state.adresse = null;
      state.cp = null;
      state.dateNaissance = null;
      state.email = null;
      state.id = null;
      state.nom = null;
      state.prenom = null;
      state.roles = null;
      state.silence = null;
      state.tokens = null;
      state.ville = null;
      state.imgProfil = null;
      state.idMusic = null;
      state.description = null;
      state.date_unban = null;
      state.avertissements = null;
      state.isGoogleUser = null;
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
