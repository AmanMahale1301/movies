// pages/api/preferences.js

import { getSession } from "next-auth/react";
import User from "@/models/user";
import { connectToDB } from "@/utils/config";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;
  try {
    await connectToDB();

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User preferences retrieved successfully",
      preferences: user.userPreferences || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
