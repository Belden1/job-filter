import React, { useState, useEffect } from 'react';
import './Card.css';
import data from './data/data.json';

function Card({ filters, onFilterChange, selectedFilters, setSelectedFilters }) {
	const [filteredJobs, setFilteredJobs] = useState(data);

	useEffect(() => {
		// Apply filtering logic when filters change
		const newFilteredJobs = data.filter((job) => {
			return filters.every((filter) => {
				const filterString = String(filter); // Ensure filter is a string
				if (filterString.startsWith('role-')) {
					return job.role === filterString.replace('role-', '');
				} else if (filterString.startsWith('level-')) {
					return job.level === filterString.replace('level-', '');
				} else if (filterString.startsWith('language-')) {
					return job.languages.includes(filterString.replace('language-', ''));
				} else if (filterString.startsWith('tool-')) {
					return job.tools.includes(filterString.replace('tool-', ''));
				}
				return false;
			});
		});

		setFilteredJobs(newFilteredJobs);
	}, [filters]);

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
			<div className="card">
				<div className="left-card-container"></div>
				<div className="right-card-container">
					<div className="chips-test">{filters.map(({ type, values }) => renderChips(type, values))}</div>
				</div>
			</div>

			{/* Display the filtered jobs */}
			<div className="filtered-jobs-container">
				{filteredJobs.map((job) => (
					<div key={job.id} className={`test-card ${job.featured ? 'featured' : ''}`}>
						{/* Render job details here */}
					</div>
				))}
			</div>
		</>
	);
}

export default Card;
