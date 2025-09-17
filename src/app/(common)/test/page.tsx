"use client"
import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        className="btn btn-primary p-4 cursor-pointer bg-amber-500"
        onClick={() => `http://localhost:7008/api/v1/auth/login-with-google`}
      >
        login with google
      </button>
    </div>
  );
}

export default Page