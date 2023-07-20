import {PRODUCTS_URL,UPLOADS_URL} from '../constant.js';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    getProducts: builders.query({
      query: (keyword) => ({
        url: PRODUCTS_URL,
        params: {keyword}
      }),
      keepUnusedDataFor: 5,
    }),

    getProductDetails: builders.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builders.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builders.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    uploadImage: builders.mutation({
      query:(data)=>({
        url:`${UPLOADS_URL}`,
        method: "POST",
        body: data,
      })
    }),

    deleteProduct: builders.mutation({
      query:(id)=>({
        url:`${PRODUCTS_URL}/${id}`,
        method:'DELETE',
      }),
    }),

    createReview: builders.mutation({
      query: (data)=>({
        url:`${PRODUCTS_URL}/${data._id}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product']
    }),
  }),
});

export const {useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation} = productApiSlice;
export const {useCreateReviewMutation,useDeleteProductMutation , useUploadImageMutation ,useGetProductDetailsQuery} = productApiSlice;