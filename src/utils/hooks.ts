import { TypedUseSelectorHook, 
    useSelector as selectorHook,
    useDispatch as dispatchHook } from "react-redux";
import { TRootState, TAppDispatch, TAppThunk } from './types';

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch: () => TAppDispatch | TAppThunk = dispatchHook;