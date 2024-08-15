import { useState } from 'react';

function App() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-3xl font-bold mb-8 text-gray-800'>JWT Auth</h1>
      <div className='flex space-x-4'>
        <button className='px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'>
          SIGNUP
        </button>
        <button className='px-6 py-2 text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50'>
          SIGNIN
        </button>
      </div>
    </div>
  );
}

export default App;
