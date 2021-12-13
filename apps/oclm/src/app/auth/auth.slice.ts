import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../hook';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthEntity {
  id: number;
}

export interface AuthState extends EntityState<AuthEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | undefined;
}

export const authAdapter = createEntityAdapter<AuthEntity>();

export const fetchAuth = createAsyncThunk(
  'auth/fetchStatus',
  async (_, thunkAPI) => {
    return Promise.resolve([]);
  }
);

export const initialAuthState: AuthState = authAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: '',
});

export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: initialAuthState,
  reducers: {
    add: authAdapter.addOne,
    remove: authAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state: AuthState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchAuth.fulfilled,
        (state: AuthState, action: PayloadAction<AuthEntity[]>) => {
          authAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchAuth.rejected, (state: AuthState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

const { selectAll, selectEntities } = authAdapter.getSelectors();

export const getAuthState = (rootState: RootState): AuthState =>
  rootState[AUTH_FEATURE_KEY];

export const selectAllAuth = createSelector(getAuthState, selectAll);

export const selectAuthEntities = createSelector(getAuthState, selectEntities);
