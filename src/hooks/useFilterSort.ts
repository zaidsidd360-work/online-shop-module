import { useState, useCallback } from "react";

interface Filters {
	brand: string;
	size: string;
}

export function useFilterSort() {
	const [filters, setFilters] = useState<Filters>({ brand: "", size: "" });
	const [sortKey, setSortKey] = useState<string>("");

	const handleFilterChange = useCallback((newFilters: Filters) => {
		setFilters(newFilters);
	}, []);

	const handleSortChange = useCallback((key: string) => {
		setSortKey(key);
	}, []);

	const resetFilters = useCallback(() => {
		setFilters({ brand: "", size: "" });
		setSortKey("");
	}, []);

	return {
		filters,
		sortKey,
		handleFilterChange,
		handleSortChange,
		resetFilters,
	};
}
