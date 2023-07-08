import { USERS_URL } from "../constant.js";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    login: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builders.mutation({
      query: (data)=>({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      })
    }),
    logout: builders.mutation({
      query: ()=>({
        url : `${USERS_URL}/logout`,
        method : 'POST',
      })
    })
  }),
});

export const { useLoginMutation,useLogoutMutation, useRegisterMutation } = usersApiSlice;
