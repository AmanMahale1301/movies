import axios from "axios";

export const axiosOpen = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST
    }
  });