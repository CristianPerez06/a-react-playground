import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className='h-50 w-50' style={{ backgroundColor: 'white', padding: 20 + 'px' }}>
      Examples:
      <ul className='examples'>
        <li><Link to="/button-link">Button link</Link></li>
        <li><Link to="/downshift-select">Select (Downshift)</Link></li>
        <li><Link to="/download-csv">JSON to CSV File</Link></li>
      </ul>
    </div>
  )
}

export default Home;

