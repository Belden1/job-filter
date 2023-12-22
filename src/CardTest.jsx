import React from 'react';
import data from './data/data.json';

const Card = ({ filters, onCardButtonClick }) => {
	const handleClick = () => {
		const exampleData = data[0];

		const cardInfo = {
			role1: exampleData.role,
			level1: exampleData.level,
			languages1: exampleData.languages,
			tools1: exampleData.tools
		};

		onCardButtonClick(cardInfo);
	};

	const handleRoleChipClick = () => {
		console.log('Role chip clicked!');
	};

	return (
		<>
			{filteredJobs.map((job) => (
				<div key={job.id} className={`card ${job.featured ? 'featured' : ''}`}>
					<div className="left-card-container">{/* ... (existing code) ... */}</div>

					<div className="right-card-container">
						<div className="chip" onClick={handleRoleChipClick}>
							{job.role}
						</div>
						<button onClick={handleClick}>Click me</button>
						<div onClick={handleClick}>Click me</div>
						{/* ... (existing code) ... */}
					</div>
				</div>
			))}
		</>
	);
};

export default Card;
