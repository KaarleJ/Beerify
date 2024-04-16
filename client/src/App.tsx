import { ReactNode } from 'react';
import NavBar from './components/NavBar';
function App({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center mt-50">
      <NavBar />
      <div className='mt-28'>{children}</div>
    </div>
  );
}

export default App;

