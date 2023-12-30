import React, { useState, useEffect } from 'react';
import './Card.css';
import data from './data/data.json';

function Card({ filters, onFilterChange, selectedFilters, setSelectedFilters }) {
	const [filteredJobs, setFilteredJobs] = useState(data);

	useEffect(() => {
		// console.log('Filters:', filters);
		// console.log('Filtered Jobs:', filteredJobs);
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
		// console.log('Filter Click:', filterType, value);
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

	const renderChips = (job, type, items) => {
		console.log('Rendering Chips:', type, items);

		return items.map((item, index) => (
			<div
				key={`${type}-${index}`}
				className={`chip ${job && selectedFilters.includes(`${type}-${item}`) ? 'selected' : ''}`}
				onClick={() => job && handleFilterClick(type, item)}
			>
				{item}
			</div>
		));
	};

	return (
		<>
			{data.map((job) => (
				<div key={job.id} className={`card${job.featured ? ' featured' : ''}`}>
					<div className="left-card-container">
						<img src={job.logo} alt={job.company} />

						<div className="text-card-container">
							<div className="text-card-header">
								<p className="company">{job.company}</p>
								{job.new && <p className="text-chip">New!</p>}
								{job.featured && <p className="text-chip">Featured</p>}
							</div>

							<h2>{job.position}</h2>

							<div className="text-card-footer">
								<p className="footer-text">{`${job.postedAt} • ${job.contract} • ${job.location}`}</p>
							</div>
						</div>
					</div>
					<div className="right-card-container">
						{filters.map(({ type, values }) => renderChips(job, type, values))}
					</div>
				</div>
			))}
		</>
	);
}

export default Card;
