const FilterBar = ({ filter, onFilter }) => {
    const statusOptions = ["all", "active", "completed"];
    const priorityOptions = ["all", "high", "medium", "low"];

    return (
        <div className="flex gap-3 mb-6 flex-wrap">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Status:</span>
                <div className="flex gap-1">
                    {statusOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => onFilter({ ...filter, status: option })}
                            className={`text-xs px-3 py-1 rounded-full capitalize font-medium transition-colors ${filter.status === option
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Priority:</span>
                <div className="flex gap-1">
                    {priorityOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => onFilter({ ...filter, priority: option })}
                            className={`text-xs px-3 py-1 rounded-full capitalize font-medium transition-colors ${filter.priority === option
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;