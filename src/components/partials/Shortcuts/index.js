import amazonIcon from "../../../../public/amazon.png";
import sainsburysIcon from "../../../../public/sainsburys.png";
import morrisonIcon from "../../../../public/morrison.png";
import asdaIcon from "../../../../public/asda.png";
import { ShortcutsPanel } from "@/components/dummy";

export const Shortcuts = () => {
    const shortcuts = [
        { name: "ASDA", url: "https://www.asda.com/", icon: asdaIcon.src },
        { name: "Morrison", url: "https://groceries.morrisons.com/", icon: morrisonIcon.src },
        { name: "Amazon", url: "https://www.amazon.co.uk/", icon: amazonIcon.src },
        { name: "Sainsburys", url: "https://www.sainsburys.co.uk/", icon: sainsburysIcon.src }
    ];

    return <ShortcutsPanel shortcuts={shortcuts} />;
};
