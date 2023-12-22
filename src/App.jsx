import React, { useState } from 'react';
import './App.css';
import Card from './Card';
import Filter from './Filter';
import data from './data/data.json';

function App() {
	const [selectedFilters, setSelectedFilters] = useState([]);

	const handleFilterChange = (filterType) => {
		setSelectedFilters((prevSelectedFilters) => {
			if (prevSelectedFilters.includes(filterType)) {
				return prevSelectedFilters.filter((type) => type !== filterType);
			} else {
				return [...prevSelectedFilters, filterType];
			}
		});
	};

	const handleClearFilters = () => {
		setSelectedFilters([]);
	};

	const filters = [
		{ type: 'role', values: data.map((entry) => entry.role) },
		{ type: 'level', values: data.map((entry) => entry.level) },
		{ type: 'language', values: data.flatMap((entry) => entry.languages) },
		{ type: 'tool', values: data.flatMap((entry) => entry.tools) }
	];

	return (
		<>
			<div className="container">
				<Filter selectedFilters={selectedFilters} onClearFilters={handleClearFilters} />
				{Array.isArray(filters) && (
					<Card
						filters={filters}
						onFilterChange={handleFilterChange}
						selectedFilters={selectedFilters}
						setSelectedFilters={setSelectedFilters}
					/>
				)}
			</div>
		</>
	);
}

export default App;
