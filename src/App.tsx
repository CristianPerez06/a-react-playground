import React from 'react';
import { MainRouter } from './Routers';

const App: React.FC = () => {
  return (
    <div className='App w-100 h-100 p-2 d-flex justify-content-center align-items-center'>
      <MainRouter />
    </div>
  );
}

export default App;
