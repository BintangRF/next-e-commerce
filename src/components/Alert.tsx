"use client";

import Swal from "sweetalert2";

export type SwalType = "info" | "confirm";

export interface SwalOptions {
  type?: SwalType;
  title: string;
  text: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const showSwal = async (
  options: SwalOptions
): Promise<boolean | void> => {
  const {
    type = "info",
    title,
    text,
    icon,
    confirmButtonText,
    cancelButtonText,
  } = options;

  if (type === "info") {
    await Swal.fire({
      title,
      text,
      icon: icon || "info",
      confirmButtonText: confirmButtonText || "OK",
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  if (type === "confirm") {
    const result = await Swal.fire({
      title,
      text,
      icon: icon || "warning",
      showCancelButton: true,
      confirmButtonText: confirmButtonText || "Ya",
      cancelButtonText: cancelButtonText || "Batal",
    });

    return result.isConfirmed;
  }
};
