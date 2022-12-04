import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: {
    theme: "dark",
    bgColor: "#000",
    themeColor: "#27272a",
    textColor: "#fff",
  },

  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state, action) => {
      console.log("checking", state, action);
      if (state.mode.theme === "dark") {
        state.mode = {
          theme: "light",
          bgColor: "#f4f2f5",
          themeColor: "#fff",
          textColor: "#000",
        };
      } else {
        state.mode = {
          theme: "dark",
          bgColor: "#000",
          themeColor: "#27272a",
          textColor: "#fff",
        };
      }
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: state => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friendsList = action.payload;
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      console.log("Action", action);
      const updatedPosts = state.posts.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
      state.posts = updatedPosts;
    },
    setUser: (state, action) => {
      console.log("--------", action.payload);
      state.user = action.payload;
    },
  },
});

export const {
  setMode,
  setLogin,
  setFriends,
  setPosts,
  setPost,
  setLogout,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
