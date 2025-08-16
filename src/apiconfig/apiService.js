// src/apiconfig/apiService.js
import API from "./api.config";

export const getSlider = async () => {
  const res = await fetch(API.SLIDER);
  if (!res.ok) throw new Error("Failed to fetch slider data");
  return res.json();
};

export const getAboutUs = async () => {
  const res = await fetch(API.ABOUTUS);
  if (!res.ok) throw new Error("Failed to fetch about us data");
  return res.json();
};

export const getGallery = async () => {
  const res = await fetch(API.GALLERY);
  if (!res.ok) throw new Error("Failed to fetch gallery data");
  return res.json();
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
