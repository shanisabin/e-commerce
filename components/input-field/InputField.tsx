"use client";

import React from "react";

interface InputFieldProps {
  label: string;
  type?: "text" | "tel" | "number" | "password";
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  maxLength?: number;
}

export default function InputField({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  required = false,
  maxLength,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-4 w-full mb-[36px]">
      <label
        htmlFor={name}
        className="text-sm font-medium text-neutral-300"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        className="h-12 rounded-xl bg-[#1f1f1f] px-4 text-white outline-none focus:border-primary"
      />
    </div>
  );
}
