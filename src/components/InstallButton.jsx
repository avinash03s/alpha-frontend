import { useEffect, useState } from "react";

export default function InstallButton() {

    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {

        const handler = (e) => {

            e.preventDefault();

            setDeferredPrompt(e);

        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {

            window.removeEventListener(
                "beforeinstallprompt",
                handler
            );

        };

    }, []);

    async function installApp() {

        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        setDeferredPrompt(null);

    }

    if (!deferredPrompt) return null;

    return (

        <button onClick={installApp}>
            Install Alpha
        </button>

    );

}