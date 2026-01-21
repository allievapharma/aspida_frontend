import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://aspidalifesciences.com/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Cart"],

  endpoints: (builder) => ({
    /* ---------------- PRODUCTS ---------------- */
    getProducts: builder.query({
      query: ({
        search = "",
        brand = "",
        category = "",
        subcategory = "",
        page = 1,
      }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (brand) params.append("brand", brand);
        if (category) params.append("category", category);
        if (subcategory) params.append("subcategory", subcategory);
        params.append("page", page);

        return `products/?${params.toString()}`;
      },
      refetchOnMountOrArgChange: true,
    }),

    getProductBySlug: builder.query({
      query: (slug) => `products/${slug}/`,
    }),

    /* ---------------- BRANDS ---------------- */
    getBrands: builder.query({
      query: (page = 1) => `brands/?page=${page}`,
      refetchOnMountOrArgChange: true,
    }),

    /* ---------------- CART ---------------- */
    getCart: builder.query({
      query: () => "cart/",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (body) => ({
        url: "cart/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `cart/${id}/`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `cart/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetBrandsQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} = productsApi;
