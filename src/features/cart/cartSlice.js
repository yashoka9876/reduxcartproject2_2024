import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems,updateItem,deleteItem,addItem } from './cartAPI';
import { useSelector } from 'react-redux';

const initialState = {
  items: [],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAsync = createAsyncThunk(
  'cart/fetchItems',
  async () => {
    const response = await fetchItems();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addAsync = createAsyncThunk(
  'cart/addProduct',
  async (item) => {
    const {id,title,brand,thumbnail,price}=item;
    const response = await addItem({id,title,brand,thumbnail,price,quantity:1});
    return response.data;
  }
);
 
export const updateAsync = createAsyncThunk(
  'cart/updateProduct',
  async (obj) => {
    const response = await updateItem({id:obj.id,quantity:obj.quantity});
    // The value we return becomes the `fulfilled` action payload
    console.log(response.data)
    return response.data;
  }
);

export const deleteAsync = createAsyncThunk(   
  'cart/fetchProduct',
  async (id) => {
     await deleteItem(id);
    // The value we return becomes the `fulfilled` action payload
    return id;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
   
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        let index=state.items.findIndex((it)=>it.id===action.id);
        state.status = 'idle';
        state.items.splice(index,1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        console.log(state)
        console.log(action.payload)
        let index=state.items.findIndex((it)=>it.id===action.payload.id);
        state.status = 'idle';
        state.items.splice(index,1,action.payload);
      });
  },
});

// export const { } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default cartSlice.reducer;
