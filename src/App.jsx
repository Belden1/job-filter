import React from 'react';
import './App.css';
import Card from './Card';
import Filter from './Filter';
import data from './data/data.json';

function App() {
	return (
		<>
			<div className="container" style={{ border: '1px solid red', backgroundColor: '#3d3d3d' }}>
				<p style={{ color: 'black' }}>App</p>
				<Filter />
				<Card />
			</div>
		</>
	);
}

export default App;
