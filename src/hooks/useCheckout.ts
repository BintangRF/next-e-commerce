"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type CheckoutPayload = {
  total: number;
  username: string;
  email: string;
};

type CheckoutResponse = {
  snapToken: string;
  orderId: string;
};

const checkoutRequest = async (
  payload: CheckoutPayload
): Promise<CheckoutResponse> => {
  const { data } = await axios.post("/api/checkout", payload);
  return data;
};

export function useCheckout() {
  return useMutation<CheckoutResponse, Error, CheckoutPayload>({
    mutationFn: checkoutRequest,
  });
}
