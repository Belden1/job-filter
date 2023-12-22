import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<div className="main-container" style={{ backgroundColor: '#2D2D2D' }}>
			<App />
		</div>
	</React.StrictMode>
);
