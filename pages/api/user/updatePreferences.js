import User from "@/models/user";
import { connectToDB } from "@/utils/config";

export default async function handler(req, res) {
  if (req.method !== "PATCH" && req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  console.log(req);

  try {
    await connectToDB();

    const { userPreferences, email } = req.body;

    if (!userPreferences || !Array.isArray(userPreferences)) {
      return res.status(400).json({ message: "Invalid userPreferences data" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { userPreferences },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User preferences updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
