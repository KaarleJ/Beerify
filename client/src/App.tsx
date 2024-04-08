import { useEffect, useState } from 'react';
import viteLogo from '/vite.svg';
import { getCount } from './services/api';

function App() {
  const [serverCount, setServerCount] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCount();
      setServerCount(data.count);
    };
    fetchData();
  }, []);


  return (
    <div className='flex flex-col min-h-screen items-center justify-start'>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="m-12" alt="Vite logo" />
        </a>
      </div>
      <h1 className='text-blue font-sans text-2xl'>Beerify - initial app</h1>
      <div className="m-5">
        <button type='button' onClick={() => setCount((count) => count + 1)}>
          Clientside count is {count}
        </button>
        <p>
          Serverside count is {serverCount}
        </p>
      </div>
    </div>
  );
}

export default App;

