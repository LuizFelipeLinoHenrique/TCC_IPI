// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";

// type AuthState =
//     | "loading"
//     | "unauthorized"
//     | "authenticated"
//     | "recovering";

// interface AuthContextData {
//     authState: AuthState;
//     setAuthState: (state: AuthState) => void;
// }

// const AuthContext = createContext<AuthContextData | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//     const [authState, setAuthState] =
//         useState<AuthState>("loading");

//     useEffect(() => {
//         async function checkSession() {
//             const { data, error } = await supabase.auth.getSession();

//             if (error) {
//                 throw error
//             }

//             if (data.session) {
//                 setAuthState("authenticated");
//             } else {
//                 setAuthState("unauthorized");
//             }
//         }

//         checkSession();
//     }, []);

//     return (
//         <AuthContext.Provider
//             value={{
//                 authState,
//                 setAuthState,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export function useAuth() {
//     const context = useContext(AuthContext);

//     if (!context) {
//         throw new Error("useAuth deve ser usado dentro de AuthProvider");
//     }

//     return context;
// }