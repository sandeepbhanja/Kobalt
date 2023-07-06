import {PRODUCTS_URL} from '../constant.js';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builders) => ({
    getProducts: builders.query({
        query: ()=>({
            url: PRODUCTS_URL,
        }),
        keepUnusedDataFor: 5
    }),

    getProductDetails : builders.query({
      query: (id)=>({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    })
  }),
});

export const {useGetProductsQuery} = productApiSlice;
export const {useGetProductDetailsQuery} = productApiSlice;