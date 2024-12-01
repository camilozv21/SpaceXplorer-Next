import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cart/cart';

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      cart: cartSlice,
    }),
    devTools: true
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']