import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const furniroeCom = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL
    }),
    tagTypes:["cart"],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/user/create",
                method: "POST",
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/user/logout",
                method: "POST",
                headers: {
                    "Authorization": JSON.parse(localStorage.getItem("e-com")).accessToken
                }
            })
        }),
        resendMail: builder.mutation({
            query: (data) => {
                return {
                    url: "/user/resendmail",
                    method: "POST",
                    body: data
                }
            }
        }),
        createCart: builder.mutation({
            query: (data) => {
                return {
                    url: "/cart/create",
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags:["cart"]
        }),
        cart: builder.query({
            query: (userId) => `/cart/${userId}`,
            providesTags:["cart"]
        }),
        // page, limit, category, subCategory, sort, quantity
        products: builder.query({
            query: ({currentPage,category,subCategory,sort, quantity}) => {
                let url = `/products?page=${currentPage}&limit=5`
                if (category) {
                    url += `&cataegory=${category}`
                }
                if (subCategory) {
                    url += `&subCategory=${subCategory}`
                }
                if (sort) {
                    url += `&sort=${sort}`
                }
                if (quantity) {
                    url += `&quantity=${quantity}`
                }

                return url
            },
        }),
        singleProduct: builder.query({
            query: (slug) => `/products/${slug}`
        }),
    })
})

export const { useRegisterMutation, useResendMailMutation, useLoginMutation, useLogoutMutation, useProductsQuery ,useSingleProductQuery, useCreateCartMutation, useCartQuery } = furniroeCom