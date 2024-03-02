export const ShortcutsPanel = ({ shortcuts }) => (
    <div
        className={`widgetBackground flex px-8 items-center rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
    >
        <div className="flex text-white items-center">
            {shortcuts.map((shortcut, index) => (
                <a
                    key={`shortcut_${shortcut.name}_${index}`}
                    className="w-[80px] mx-[10px] text-center"
                    href={shortcut.url}
                    target="_blank"
                >
                    <img className="p-[5px] rounded-3xl" src={shortcut.icon} />
                    <p>{shortcut.name}</p>
                </a>
            ))}
        </div>
    </div>
);
