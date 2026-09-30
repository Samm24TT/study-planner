import { supabase } from "./supabaseClient";
import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : "Signed up! You can log in now.");
  }

  async function handleLogIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setMessage(error.message);
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 space-y-3">
      <h1 className="text-2xl font-bold py-2 text-yellow-500">Study Planner</h1>
      <input
        className="w-full border rounded p-2"
        type="email"
        placeholder="enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border rounded p-2"
        type="password"
        placeholder="enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          className="flex-1 text-white bg-yellow-500 rounded p-2"
          onClick={handleLogIn}
        >
          Log in
        </button>
        <button className="flex-1 border rounded p-2" onClick={handleSignUp}>
          Sign up
        </button>
      </div>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </div>
  );
}
