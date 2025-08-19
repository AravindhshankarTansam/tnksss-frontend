// src/apiconfig/apiService.js
import API from "./api.config";

export const getSlider = async () => {
  const res = await fetch(API.SLIDER);
  const json = await res.json();
  console.log("📌 Slider API response:", json);
  return json;
};


export const getAboutUs = async () => {
  const res = await fetch(API.ABOUTUS);
  if (!res.ok) throw new Error("Failed to fetch about us data");
  return res.json();
};

export const getGallery = async () => {
  const res = await fetch(API.GALLERY);
  const json = await res.json();
  console.log("📌 Slider API response:", json);
  return json;
};

export const getContacts = async () => {
  const res = await fetch(API.CONTACT);
  if (!res.ok) throw new Error("Failed to fetch contacts data");
  return res.json();
};

export const getDistricts = async () => {
  const res = await fetch(API.DISTRICTS);
  if (!res.ok) throw new Error("Failed to fetch districts data");
  return res.json();
};

export const sendOtp = async (data) => {
  const res = await fetch(API.SEND_OTP, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const verifyOtp = async (data) => {
  const res = await fetch(API.VERIFY_OTP, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const setPassword = async (data) => {
  const res = await fetch(API.SET_PASSWORD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};