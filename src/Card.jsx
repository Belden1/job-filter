import React, { useState, useEffect } from 'react';
import './Filter.css';

function Card({ roles, levels, languages, tools, onFilterChange }) {
	const [selectedFilters, setSelectedFilters] = useState([]);

	const handleFilterClick = (filterType, value) => {
		const updatedFilters = [...selectedFilters];
		const filterIdentifier = `${filterType}-${value}`;

		const isSelected = updatedFilters.includes(filterIdentifier);

		if (isSelected) {
			const index = updatedFilters.indexOf(filterIdentifier);
			updatedFilters.splice(index, 1);
		} else {
			updatedFilters.push(filterIdentifier);
		}

		setSelectedFilters(updatedFilters);
		onFilterChange(updatedFilters);
	};

	const handleClearFilters = () => {
		setSelectedFilters([]);
		onFilterChange([]);
	};

	return (
		<>
			<div style={{ border: '1px solid black' }}>
				{/* <button onClick={handleFilterClick('role', role)}>Test</button> */}
			</div>
		</>
	);
}

export default Card;
