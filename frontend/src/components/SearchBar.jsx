const SearchBar = ({ search, onSearch }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
};

export default SearchBar;