"use client";

import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import React from "react";
import { FormWrapper } from "../FormComponents/FormWrapper";
import { FormInputs } from "../FormComponents/FormInputs";
import { showSwal } from "../Alert";

export const AuthForm = ({ mode }: { mode: "login" | "register" }) => {
  const setUser = useStore((s) => s.setUser);
  const router = useRouter();

  const onSubmit = (data: any) => {
    if (mode === "register") {
      localStorage.setItem("_demo_user", JSON.stringify(data));
      setUser({ username: data.username, email: data.email });

      showSwal({
        type: "info",
        title: "Informasi",
        icon: "success",
        text: "🎉 Register success!",
      });

      router.push("/");
      return;
    }

    // login
    const raw = localStorage.getItem("_demo_user");
    if (!raw) return;

    showSwal({
      type: "info",
      title: "Informasi",
      icon: "warning",
      text: "⚠️ Data user tidak tersedia. Silakan Register terlebih dahulu.",
    });

    const saved = JSON.parse(raw);

    if (saved.email === data.email && saved.password === data.password) {
      setUser({ username: saved.username, email: saved.email });
      router.push("/");
    } else {
      showSwal({
        type: "info",
        title: "Informasi",
        icon: "error",
        text: "❌ Invalid credentials",
      });
    }
  };

  return (
    <FormWrapper
      onSubmit={onSubmit}
      className="w-full max-w-md space-y-5 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg"
    >
      {mode === "register" && (
        <FormInputs
          placeholder="Enter username"
          label="Username"
          name="username"
        />
      )}

      <FormInputs placeholder="Enter email" label="Email" name="email" />

      <FormInputs
        placeholder="Enter password"
        label="Password"
        name="password"
        type="password"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r text-fuchsia-50 from-blue-600 to-indigo-500 hover:opacity-90 transition py-2.5 rounded-xl font-semibold shadow-md"
      >
        {mode === "register" ? "Create account" : "Sign in"}
      </button>

      {mode === "login" ? (
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      ) : (
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Sign in
          </a>
        </p>
      )}
    </FormWrapper>
  );
};
