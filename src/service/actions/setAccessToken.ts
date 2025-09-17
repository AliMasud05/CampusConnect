/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { authKey } from "@/constants/authkey";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setAccessToken = async (token: string, option?: any) => {
  const cookieStore = await cookies();
  cookieStore.set(authKey, token);
};

export default setAccessToken;
//
