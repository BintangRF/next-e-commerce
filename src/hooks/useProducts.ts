"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getProducts() {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data as any[];
}

async function getProductById(id: number) {
  const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return data as any;
}

export const useProduct = {
  useGet: () =>
    useQuery({
      queryKey: ["products"],
      queryFn: getProducts,
      staleTime: 1000 * 60 * 60,
    }),

  useGetById: (id: number) =>
    useQuery({
      queryKey: ["productsDetail", id],
      queryFn: () => getProductById(id),
      staleTime: 1000 * 60 * 60,
    }),
};
