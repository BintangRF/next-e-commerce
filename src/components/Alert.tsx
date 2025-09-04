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
  onConfirm?: () => void;
  onClose?: () => void;
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
    onConfirm,
    onClose,
  } = options;

  if (type === "info") {
    await Swal.fire({
      title,
      text,
      icon: icon || "info",
      confirmButtonText: confirmButtonText || "OK",
      // timer: 2000,
      // timerProgressBar: true,
    });
    if (onClose) onClose();
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

    if (result.isConfirmed) {
      if (onConfirm) onConfirm();
      return true;
    } else {
      if (onClose) onClose();
      return false;
    }
  }
};
