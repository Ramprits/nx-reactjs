import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../hook';
import { ProductModel } from './product.model';

export const PRODUCT_FEATURE_KEY = 'products';

export type ProductEntity = ProductModel;

export interface ProductState extends EntityState<ProductEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | undefined;
}

export const productAdapter = createEntityAdapter<ProductEntity>();

export const fetchProduct = createAsyncThunk(
  'product/fetchStatus',
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/products', {
        params,
      });
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const initialProductState: ProductState = productAdapter.getInitialState(
  {
    loadingStatus: 'not loaded',
    error: '',
  }
);

export const productSlice = createSlice({
  name: PRODUCT_FEATURE_KEY,
  initialState: initialProductState,
  reducers: {
    add: productAdapter.addOne,
    remove: productAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state: ProductState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchProduct.fulfilled,
        (state: ProductState, action: PayloadAction<ProductEntity[]>) => {
          productAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchProduct.rejected, (state: ProductState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const productReducer = productSlice.reducer;

export const productActions = productSlice.actions;

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const getProductState = (rootState: RootState): ProductState =>
  rootState[PRODUCT_FEATURE_KEY];

export const selectAllProduct = createSelector(getProductState, selectAll);

export const selectProductEntities = createSelector(
  getProductState,
  selectEntities
);
