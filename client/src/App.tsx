import { ReactNode } from 'react';
import NavBar from './components/NavBar';
import { Toaster } from './components/ui/toaster';
function App({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      <div className=' mt-16 md:mt-20 flex flex-col items-center'>{children}</div>
      <Toaster />
    </div>
  );
}

export default App;

