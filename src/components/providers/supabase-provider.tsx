"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { createApiClient } from "@/src/lib/api/client";

interface SupabaseContextType {
  supabase: SupabaseClient;
  session: Session | null;
  isLoading: boolean;
  profile: any | null; 
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabase] = useState(() => 
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initial session check
  useEffect(() => {
    (async () => {
       const { data: { session } } = await supabase.auth.getSession();
       setSession(session);
       if (session) {
          fetchProfile(session);
       }
       setIsLoading(false);
    })();
  }, [supabase]);

  const fetchProfile = async (currentSession: Session) => {
      try {
          const client = createApiClient(currentSession);
          // @ts-ignore - method exists in our new client
          const res = await client.auth.getMe() as any; 
          if (res.success) {
              setProfile(res.data);
              console.log("Backend Profile Loaded:", res.data);
          }
      } catch (e) {
          console.error("Failed to load backend profile", e);
      }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: string, session: Session | null) => {
      setSession(session);
      setIsLoading(false);
      
      if (event === "SIGNED_IN" && session) {
         fetchProfile(session);
         router.refresh();
      }
      if (event === "SIGNED_OUT") {
          setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, session, isLoading, profile }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
