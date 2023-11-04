import { arrayMove } from '@dnd-kit/sortable';
import { createSlice } from '@reduxjs/toolkit';

export interface IProduct {
  id: string | number;
  img: string;
}

export interface IState {
  products: IProduct[];
}

const initialState: IState = {};

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setNewList: (state, action): any => {
      const data = (items, active, over) => {
        const oldIndex = items.findIndex((object) => {
          return object.id === active.id;
        });
        const newIndex = items.findIndex((object) => {
          return object.id === over.id;
        });

        return arrayMove(items, oldIndex, newIndex);
      };
      const newdata = data(action.payload.products, action.payload.active, action.payload.over);

      state.products = null;
      state.products = newdata as IProduct[];
      console.log(state.products);
    },
  },
});

export const { setNewList } = stateSlice.actions;
export default stateSlice.reducer;
