import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string; // Assuming the JWT contains a 'role' field
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const loginUrl = new URL("/login", request.url);
  const { pathname } = request.nextUrl;

  // Define paths that logged-in users cannot access
  const restrictedForLoggedIn = ["/login", "/register"];

  // Define payment routes that require authentication
  const paymentRoutes = [
    "/courses/:id/payment",
    "/resources/:id/payment",
  ];

  // Check if the current path is a payment route
  const isPaymentRoute = paymentRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(":id", "[^/]+")}$`);
    return regex.test(pathname);
  });

  // If no token, redirect to login page unless already on login/register
  if (!token) {
    if (restrictedForLoggedIn.includes(pathname)) {
      return NextResponse.next(); // Allow access to login/register
    }
    return NextResponse.redirect(loginUrl);
  }

  try {
    const user = jwtDecode<DecodedToken>(token);

    // Prevent logged-in users from accessing login/register
    if (restrictedForLoggedIn.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect to home
    }

    // Restrict /dashboard to admins only
    if (pathname.startsWith("/dashboard") && user.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(loginUrl);
    }

    // Restrict /user-dashboard to normal users only
    if (pathname.startsWith("/user-dashboard") && user.role !== "USER") {
      return NextResponse.redirect(loginUrl);
    }

    // Allow authenticated users (SUPER_ADMIN or USER) to access payment routes
    if (isPaymentRoute && !["SUPER_ADMIN", "USER"].includes(user.role)) {
      return NextResponse.redirect(loginUrl);
    }

    // Allow access to other routes
    return NextResponse.next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/user-dashboard/:path*",
    "/login",
    "/register",
    "/courses/:id/payment",
    "/resources/:id/payment",
    "/invoice",
  ],
};