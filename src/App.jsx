import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!session) return <Auth />;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Study Planner</h1>
      <p>Logged in as {session.user.email}</p>
      <button
        className="border rounded px-3 py-1 mt-3"
        onClick={() => supabase.auth.signOut()}
      >
        Log out
      </button>
    </div>
  );
}

export default App;
