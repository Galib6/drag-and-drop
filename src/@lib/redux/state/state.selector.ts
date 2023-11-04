import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../config/redux/store';

const selectState = (state: RootState) => state.products;

export const productList = createSelector([selectState], (edge) => edge?.products);
