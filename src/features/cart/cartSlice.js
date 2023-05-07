import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import cartItems from "../../cartItems";
import axios from "axios";
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-project";
export const getCartSlice = createAsyncThunk("cart/getCartSlice", async () => {
  //   try {
  //     const res = await fetch(url);
  //     return await res.json();
  //   } catch (error) {
  //     return console.log(error);
  //   }
  try {
    const res = await axios(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

// export const getCartSlice = createAsyncThunk(
//   "cart/getCartSlice",
//   async (_ , thunkAPI) => {
//     try {
//         console.log(thunkAPI);
//         console.log(thunkAPI.getState() , "thunkAPI states");
//        // console.log(thunkAPI.dispatch(openModal()))
//       const res = await axios(url);
//       return res.data;
//     }catch(error){
//         return thunkAPI.rejectWithValue("Something went wrong!")
//     }

//   }
// );

const initialState = {
  cartItems: [],
  amount: 4, // quantity of items
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      const itemId = payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartSlice.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cartItems = payload;
      })
      .addCase(getCartSlice.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});
console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
