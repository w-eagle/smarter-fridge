export const AlertsSelector = ({ alerts }) => (
    <div
        className={`widgetBackground flex h-[130px] px-8 items-center rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
        onClick={(e) => {
            e.stopPropagation();
        }}
    >
        <div className="flex text-white items-center">
            {alerts.map((alert, index) => (
                <button
                    key={`shortcut_${alert.label}_${index}`}
                    className="w-[80px] mx-[10px] text-center"
                    onClick={alert.handleClick}
                >
                    <img className="p-[5px] w-[80px] h-[80px] rounded-3xl" src={alert.icon} />
                    <p>{alert.label}</p>
                </button>
            ))}
        </div>
    </div>
);
