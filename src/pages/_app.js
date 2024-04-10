import { AppProvider } from "@/context/appState";
import "./globals.css";
import { useAppState } from "@/hooks/useAppState";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    const [state, dispatch] = useAppState();

    return (
        <SessionProvider session={session}>
            <AppProvider value={[state, dispatch]}>
                <Component {...pageProps} />
            </AppProvider>
        </SessionProvider>
    );
}
