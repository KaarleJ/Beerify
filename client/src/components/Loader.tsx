import { Loader2 as LoadIcon } from 'lucide-react';

const Loader = () => {
  return (
    <div className="absolute top-96 animate-spin">
      <LoadIcon size={64} />
    </div>
  );
};

export default Loader;
