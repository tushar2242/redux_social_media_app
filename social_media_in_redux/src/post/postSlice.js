import { createSlice } from '@reduxjs/toolkit';


const initialState = [
    {
        id: 1,
        title: 'First Title',
        content: 'lorem thss asdfha asdfgha khaldsf'
    },
    {
        id: 2,
        title: 'Seconde Title',
        content: 'This is contetb if the post give'
    }
]


const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:
    {
        addPost: (state, action) => {
            const newPost = action.payload;
            // console.log(newPost, '  ', state)
            state.push(newPost)
        },
        removePost: (state, action) => {
            const id = action.payload;
            return state.filter((item) => item.id != id)
        },
        updatePost: (state, action) => {
            const upData = action.payload;
            const uptoPost= state.map((data) => {
                if (data.id === upData.id) {
                    return upData
                }
                else {
                    return data
                }
            })
            return uptoPost
        }
    }
});

export const { addPost, removePost,updatePost } = postSlice.actions;

export default postSlice.reducer;