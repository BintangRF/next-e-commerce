import React, { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

type FormInputsProps = {
  name: string;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInputs = ({ name, label, ...rest }: FormInputsProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-medium capitalize">{label}</label>
      )}

      <input
        {...register(name)}
        {...rest}
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
