import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      //TODO - Use .concat()
      state.items = [...state.items, action.payload];
    },

    addOne: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket[index].units++;
      } else
        console.warn(
          `Can't increase units for product (id: ${action.payload.id}) as it is not in the basket`
        );

      state.items = newBasket;
    },

    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it is not in the basket`
        );

      state.items = newBasket;
    },

    removeOne: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        if (newBasket[index].units > 1) newBasket[index].units--;
        else newBasket.splice(index, 1);
      } else
        console.warn(
          `Can't reduce units for product (id: ${action.payload.id}) as it is not in the basket`
        );

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket, addOne, removeOne } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce(
    (total, item) => total + item.price * item.units * 100,
    0
  );

export default basketSlice.reducer;
