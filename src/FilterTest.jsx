// Filter.jsx
import React, { useState } from 'react';

const Filter = ({ roles, levels, languages, tools, onFilterChange, cardInfo, onClearButtonClick }) => {
	// ... (existing code) ...

	const [showRoleChipDetails, setShowRoleChipDetails] = useState(false);

	const handleRoleChipClick = () => {
		setShowRoleChipDetails(!showRoleChipDetails);
	};

	const renderRoleChipDetails = () => {
		if (showRoleChipDetails) {
			// Render the additional div for "role" chip details
			return (
				<div className="role-chip-details">
					{/* ... Add content for the "role" chip details ... */}
					<p>Role: Frontend Developer</p>
					<p>Experience: Midweight</p>
					{/* ... (customize as needed) ... */}
				</div>
			);
		}
		return null;
	};

	return (
		<>
			<div className="filter-container">
				<div style={{ color: '#000' }}>{renderCardInfo()}</div>
				<div className="chips">
					{/* ... (existing code) ... */}

					{/* "role" chip */}
					<div
						className={`chip ${selectedFilters.includes(`role-Frontend`) ? 'selected' : ''}`}
						onClick={() => handleFilterClick('role', 'Frontend')}
					>
						Frontend
					</div>
				</div>
				<a className="clear" href="#" onClick={handleClearFilters}>
					Clear
				</a>
			</div>

			{/* Additional div for "role" chip details */}
			{renderRoleChipDetails()}
		</>
	);
};

export default Filter;
