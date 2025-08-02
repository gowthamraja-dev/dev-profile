import React from "react";

const GoogleSignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Google Sign Up</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Sign Up with Google
      </button>
      <p className="mt-4 text-gray-600">Or sign up with your email</p>
      <form className="mt-2">
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 px-4 py-2 rounded w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 px-4 py-2 rounded w-full mb-2"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default GoogleSignUp;
