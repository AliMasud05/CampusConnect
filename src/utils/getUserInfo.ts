import { jwtDecode } from "jwt-decode";

type UserInfo = {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

// Helper function to get cookie value by name
const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const getUserInfo = () => {
  // Check for client-side
  if (typeof window === "undefined") return null;
  const token = getCookie("token");
  if (!token) return null;
  try {
    const userInfo: UserInfo = jwtDecode(token);
    return userInfo;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default getUserInfo;