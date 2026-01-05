import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://aspidalifesciences.com/api/",
    prepareHeaders: (headers) => {
      // ✅ MUST MATCH AuthContext
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
        searchTerm = "",
        brands = [],
        category = "",
        minPrice = "",
        maxPrice = "",
        page = 1,
      }) => {
        const params = new URLSearchParams();

        if (searchTerm) params.append("search", searchTerm);
        if (category) params.append("category", category);
        if (brands.length > 0) params.append("brand", brands.join(","));
        if (minPrice) params.append("min_price", minPrice);
        if (maxPrice) params.append("max_price", maxPrice);
        params.append("page", page);

        return `products/?${params.toString()}`;
      },
    }),

    getProductBySlug: builder.query({
      query: (slug) => `products/${slug}/`,
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

  // Cart hooks
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} = productsApi;
