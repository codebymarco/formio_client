import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const App: React.FC = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className='form'>
      <h1>title</h1>
      <input type="text" placeholder='name'/>
      <input type="text" placeholder='email'/>
      <textarea placeholder='body'></textarea>
      <button>submit</button>
    </div>
  );
};

export default App;