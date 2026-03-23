// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { check } from "./userSlice";
// import { fetchTest } from "./testSlice";
// import { fetchTestAttemp } from "./testAttempSlice";
// import { AxiosError } from "axios";
// import { RootState } from "./store";


// const initialState = {}

// export const initApp = createAsyncThunk<void, void, {state: RootState}>(
//     'app/initialApp', 
//     async (_, {rejectWithValue, dispatch, getState}) => {
//         try {
//             const user = await dispatch(check()).unwrap();
            
//             await dispatch(fetchTest({ userId: user.id })).unwrap();

//             const test = getState().test
            
//             const testId = Object.keys(test);
//             const userId = user.id;
//             await dispatch(fetchTestAttemp({ userId, testId })).unwrap();
//         } catch (error) {
//             if(error instanceof AxiosError){
//                 return rejectWithValue(error.response?.data.message)
//             }
//             return rejectWithValue("Ошибка загрузки")
//         }
//     }
// )

// const appSlice = createSlice({
//     name: 'app', 
//     initialState,
//     reducers:{}
// })