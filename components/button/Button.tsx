"use client";

import React from "react";

interface ButtonProps {
  label: string;
  disabled?: boolean;
}

export default function Button({ label, disabled = false }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full h-12 rounded-xl bg-white text-black font-semibold
                 hover:bg-neutral-200 transition disabled:opacity-50
                 disabled:cursor-not-allowed cursor-pointer"
    >
      {label}
    </button>
  );
}
