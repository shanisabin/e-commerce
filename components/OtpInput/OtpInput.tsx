"use client";

import React, { useRef } from "react";

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (otp: string[]) => void;
}

export default function OtpInput({
  length = 4,
  value,
  onChange,
}: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d?$/.test(digit)) return;

    const newOtp = [...value];
    newOtp[index] = digit;
    onChange(newOtp);

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-[138px] h-[87px] text-center text-lg font-semibold
                     bg-[#1f1f1f] text-white rounded-md
                     border border-neutral-700
                     focus:border-primary outline-none"
        />
      ))}
    </div>
  );
}
