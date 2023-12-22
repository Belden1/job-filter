import React, { useState, useEffect } from 'react';
import './Card.css';
import data from './data/data.json';

function Card({ filters, onFilterChange, selectedFilters, setSelectedFilters }) {
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
		onFilterChange(filterType);
	};

	const renderChips = (type, items) =>
		items.map((item, index) => (
			<div
				key={`${type}-${index}`}
				className={`chip ${selectedFilters.includes(`${type}-${item}`) ? 'selected' : ''}`}
				onClick={() => handleFilterClick(type, item)}
			>
				{item}
			</div>
		));

	return (
		<>
			<div className="right-card-container">
				<div className="chips-test">{filters.map(({ type, values }) => renderChips(type, values))}</div>
			</div>
		</>
	);
}

export default Card;
