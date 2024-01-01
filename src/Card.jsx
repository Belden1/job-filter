import React, { useState, useEffect } from 'react';
import './Card.css';
import data from './data/data.json';

function Card({ selectedFilters, setSelectedFilters, onFilterChange }) {
	const [filteredJobs, setFilteredJobs] = useState(data);
	const [displayedJobs, setDisplayedJobs] = useState([]);

	useEffect(() => {
		// Filter jobs based on selected filters
		const filtered = data.filter((job) =>
			selectedFilters.every((filter) => {
				const [type, value] = filter.split('-');
				return job[type] === value || (job[type] && job[type].includes(value));
			})
		);
		console.log('1. Filtered Jobs:', filtered);
		setFilteredJobs(filtered);
	}, [selectedFilters]);

	useEffect(() => {
		// Display only the new filters
		const newFilters = selectedFilters.filter((filter) => !displayedJobs.includes(filter));
		setDisplayedJobs((prevDisplayedJobs) => [...prevDisplayedJobs, ...newFilters]);
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

	console.log('2. Filtered Jobs State:', filteredJobs);
	console.log('3. Displayed Filters:', displayedJobs);

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

							<div className="text-card-footer">
								<p className="footer-text">{`${job.postedAt} • ${job.contract} • ${job.location}`}</p>
							</div>
						</div>
					</div>
					<div className="right-card-container">
						<div
							className={`chip${job && selectedFilters.includes(`role-${job.role}`) ? ' selected' : ''}`}
							onClick={() => job && handleFilterClick('role', job.role)}
						>
							{job.role}
						</div>
						<div
							className={`chip${
								job && selectedFilters.includes(`level-${job.level}`) ? ' selected' : ''
							}`}
							onClick={() => job && handleFilterClick('level', job.level)}
						>
							{job.level}
						</div>
						{job.languages.map((item, index) => (
							<div
								key={index}
								className={`chip${
									job && selectedFilters.includes(`language-${item}`) ? ' selected' : ''
								}`}
								onClick={() => job && handleFilterClick('language', item)}
							>
								{item}
							</div>
						))}
						{job.tools.map((item, index) => (
							<div
								key={index}
								className={`chip${job && selectedFilters.includes(`tool-${item}`) ? ' selected' : ''}`}
								onClick={() => job && handleFilterClick('tool', item)}
							>
								{item}
							</div>
						))}
					</div>
				</div>
			))}
		</>
	);
}

export default Card;

// const renderChips = (job, type, items) => {
// 	return items.map((item, index) => (
// 	  <div
// 		key={`${type}-${index}`}
// 		className={`chip${job && selectedFilters.includes(`${type}-${item}`) ? ' selected' : ''}`}
// 		onClick={() => job && handleFilterClick(type, item)}
// 	  >
// 		{item}
// 	  </div>
// 	));
//   };
