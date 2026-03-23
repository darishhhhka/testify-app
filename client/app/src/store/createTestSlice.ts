import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateTest, Question } from "./models/createTestModel";

const initialState: CreateTest = {
    test: '',
    question: []
}

const createTestSlice = createSlice({
    name: 'create-test',
    initialState,
    reducers: {
        addNewQuestion: (state) => {
            state.question.push({question: '', answers: [], typeQuestion: 'single'})
        },
        addDataOnQuestion: (state, action: PayloadAction<{index: number, data: Question}>) => {
            state.question[action.payload.index] = action.payload.data
        }
    }
})

export const {addNewQuestion, addDataOnQuestion} = createTestSlice.actions
export default createTestSlice.reducer