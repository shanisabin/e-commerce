"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import InputField from "../input-field/InputField";
import Button from "../button/Button";
import OtpInput from "../OtpInput/OtpInput";
import Image from "next/image";

import { verifyOtp, registerUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";


type LoginStep = "PHONE" | "OTP" | "NAME";


export default function Login() {
  const [step, setStep] = useState<LoginStep>("PHONE");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [name, setName] = useState("");
  const [serverOtp, setServerOtp] = useState<string | null>(null);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [serverToken, setServerToken] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "OTP" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [step, timeLeft]);

  const handleResend = async () => {
    if (!canResend) return;
    try {
      const res = await verifyOtp(phone);
      setServerOtp(res.otp);
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      console.error("Resend OTP failed", error);
    }
  };


  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await verifyOtp(phone);

      console.log("OTP Response:", res);
      console.log("Server OTP:", res.otp);

      setServerOtp(res.otp);
      setIsExistingUser(res.user);

      if (res.user && res.token?.access) {
        setServerToken(res.token.access);
      }
      setStep("OTP");
    } catch (error) {
      console.error("OTP verification failed", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };



  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredOtp = otp.join("").trim();

    console.log("Entered OTP:", enteredOtp);
    console.log("Server OTP:", serverOtp);
    console.log("OTP Array:", otp);
    console.log("Comparison:", enteredOtp === serverOtp);

    if (enteredOtp.length !== 4) {
      alert("Please enter all 4 digits of the OTP");
      return;
    }

    if (!/^\d{4}$/.test(enteredOtp)) {
      alert("OTP must contain only numbers");
      return;
    }

    if (enteredOtp !== String(serverOtp || "").trim()) {
      alert(`Invalid OTP. You entered: ${enteredOtp}, Expected: ${serverOtp}`);
      return;
    }

    if (isExistingUser && serverToken) {
      useAuthStore.getState().setToken(serverToken);
      document.cookie = `access=${serverToken}; path=/; SameSite=Strict; Secure;`;
      router.push("/profile");
    } else {
      setStep("NAME");
    }
  };



  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await registerUser({
        name,
        phone_number: phone,
      });

      useAuthStore.getState().setToken(res.token.access);
      document.cookie = `access=${res.token.access}; path=/; SameSite=Strict; Secure;`;

      router.push("/profile");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="login-section flex flex-row bg-black min-h-screen">
      <div className="login-left-img flex-1 flex items-center justify-center">
        <Image
          src="/assets/login-hero-img.svg"
          alt="Login Image"
          width={720}
          height={871}
          priority
          className="object-contain"
        />
      </div>

      <div className="login-form-section flex-1 flex flex-col justify-center items-center px-[60px]">
        <h1 className="font-[Inter] text-white font-semibold text-[28px] text-center">
          {step === "PHONE" && "Login"}
          {step === "OTP" && "Verify Phone"}
          {step === "NAME" && "Welcome, You are?"}
        </h1>
        {step === "OTP" && (
          <p className="text-[#FFFFFF]/60 text-[16px] mt-2 mb-8 text-center">
            Enter the OTP sent to +91 {phone}
          </p>
        )}

        {step === "PHONE" && (
          <form onSubmit={handlePhoneSubmit} className="w-full">
            <InputField
              label="Phone"
              type="tel"
              name="phone"
              value={phone}
              placeholder="Enter phone"
              maxLength={10}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button label={isLoading ? "Sending..." : "Continue"} disabled={isLoading} />
          </form>
        )}

        {step === "OTP" && (
          <form onSubmit={handleOtpSubmit} className="w-full flex flex-col gap-6">
            <OtpInput
              value={otp}
              onChange={setOtp}
            />

            <div className="text-center text-sm text-gray-400 mt-2">
              {timeLeft > 0 ? (
                <p className="text-white/60">
                  Resend OTP in <span className="text-white font-semibold">{timeLeft}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-white font-semibold underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <Button label="Verify OTP" />

            {serverOtp && (
              <p className="text-center text-xs text-white/20 mt-4 italic">
                Development Mode: Use OTP <span className="text-white/40 font-bold">{serverOtp}</span> to proceed
              </p>
            )}
          </form>
        )}


        {step === "NAME" && (
          <form onSubmit={handleNameSubmit} className="w-full">
            <InputField
              label="Name"
              name="name"
              value={name}
              placeholder="Enter your name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <Button label={isLoading ? "Registering..." : "Continue"} disabled={isLoading} />
          </form>
        )}
      </div>
    </div>
  );
}
