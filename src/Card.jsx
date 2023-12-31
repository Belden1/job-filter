import React, { useState, useEffect } from 'react';
import './Card.css';
import data from './data/data.json';

function Card({ filters, onFilterChange, selectedFilters, setSelectedFilters }) {
	const [filteredJobs, setFilteredJobs] = useState(data);

	useEffect(() => {
		// Filter jobs based on selected filters
		const filtered = data.filter((job) =>
			selectedFilters.every((filter) => {
				const [type, value] = filter.split('-');
				return job[type] === value || (job[type] && job[type].includes(value));
			})
		);
		setFilteredJobs(filtered);
	}, [selectedFilters]);

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

	const renderChips = (job, type, items) => {
		return items.map((item, index) => (
			<div
				key={`${type}-${index}`}
				className={`chip${job && selectedFilters.includes(`${type}-${item}`) ? ' selected' : ''}`}
				onClick={() => job && handleFilterClick(type, item)}
			>
				{item}
			</div>
		));
	};

	return (
		<>
			{filteredJobs.map((job) => (
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
							<p>
								<strong>Roles:</strong> {job.role}
							</p>
							<p>
								<strong>Level:</strong> {job.level}
							</p>
							<p>
								<strong>Languages:</strong> {job.languages.join(', ')}
							</p>
							<p>
								<strong>Tools:</strong> {job.tools.join(', ')}
							</p>
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
