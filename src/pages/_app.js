import { AppProvider } from "@/context/appState";
import "./globals.css";
import { useAppState } from "@/hooks/useAppState";

export default function App({ Component, pageProps }) {
    const [state, dispatch] = useAppState();

    return (
        <AppProvider value={[state, dispatch]}>
            <Component {...pageProps} />
        </AppProvider>
    );
}
