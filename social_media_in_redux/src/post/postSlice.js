import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
    {
        id: 1,
        title: "First Title",
        content: "lorem thss asdfha asdfgha khaldsf",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            view: 0,
            like: 0,
            dislike: 0,

        }
    },
    {
        id: 2,
        title: "Seconde Title",
        content: "This is content if the post give",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            view: 0,
            like: 0,
            dislike: 0,

        }
    },
];

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            // const newPost = action.payload;
            // console.log(newPost, '  ', state)
            state.push(action.payload);
        },
        prepare(title, content, id) {
            return {
                payload: {
                    title,
                    content,
                    id,
                    date: sub(new Date()).toISOString,
                    reactions: {
                        view: 0,
                        like: 0,
                        dislike: 0
                    }
                }
            }

        },
        removePost: (state, action) => {
            const id = action.payload;
            return state.filter((item) => item.id != id);
        },
        updatePost: (state, action) => {
            const upData = action.payload;
            const uptoPost = state.map((data) => {
                if (data.id === upData.id) {
                    return upData;
                } else {
                    return data;
                }
            });
            return uptoPost;
        },
    },
});

export const { addPost, removePost, updatePost } = postSlice.actions;

export default postSlice.reducer;
