import React from 'react';
import './Filter.css';

function Filter({ selectedFilters, onClearFilters }) {
	const handleClearFiltersClick = () => {
		onClearFilters();
	};

	const getValueFromFilter = (filter) => {
		return filter.split('-')[1] || '';
	};

	return (
		<>
			<div className="filter-container">
				<div className="chips">
					{selectedFilters.map((filter, index) => {
						const value = getValueFromFilter(filter);
						return (
							value && (
								<div key={index} className={'chip'}>
									{value}
								</div>
							)
						);
					})}
				</div>

				<a className="clear" href="#" onClick={handleClearFiltersClick}>
					Clear
				</a>
			</div>
		</>
	);
}

export default Filter;
