import { AppProvider } from "@/context/appState";
import "./globals.css";
import { useAppState } from "@/hooks/useAppState";
import { ModalProvider } from "@/context/modalContext";

export default function App({ Component, pageProps }) {
    const [state, dispatch] = useAppState();

    return (
        <AppProvider value={[state, dispatch]}>
            <ModalProvider>
                <Component {...pageProps} />
            </ModalProvider>
        </AppProvider>
    );
}
