import amazonIcon from "../../../../public/amazon.png";
import sainsburysIcon from "../../../../public/sainsburys.png";
import morrisonIcon from "../../../../public/morrison.png";
import asdaIcon from "../../../../public/asda.png";
import { ShortcutsPanel } from "@/components/dummy";

export const Shortcuts = () => {
    const shortcuts = [
        { name: "asda", url: "https://www.asda.com/", icon: asdaIcon.src },
        { name: "morrison", url: "https://groceries.morrisons.com/", icon: morrisonIcon.src },
        { name: "amazon", url: "https://www.amazon.com/", icon: amazonIcon.src },
        { name: "sainsburys", url: "https://www.sainsburys.co.uk/", icon: sainsburysIcon.src }
    ];

    return <ShortcutsPanel shortcuts={shortcuts} />;
};
