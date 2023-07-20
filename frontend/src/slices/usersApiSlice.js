import { USERS_URL } from "../constant.js";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    login: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builders.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builders.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),

    getUsersById: builders.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),

    deleteUser: builders.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
        providesTags: ["User"],
      }),
    }),

    updateUser: builders.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation,useLogoutMutation, useRegisterMutation, useProfileMutation } = usersApiSlice;
export const {useGetUsersQuery,useGetUsersByIdQuery,useDeleteUserMutation,useUpdateUserMutation} = usersApiSlice;