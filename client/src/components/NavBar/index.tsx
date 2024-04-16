import { ModeToggle } from './ModeToggle';
import Link from '../Link';

const NavBar = () => {
  return (
    <nav className="p-5 flex flex-row items-center justify-around w-screen fixed top-0 backdrop-blur-sm border-b">
      <div>
        <Link href="/" className="mx-10 text-primary/100 hover:text-primary/80 italic text-2xl">
          Beerify
        </Link>
        <Link href="/reviews">Reviews </Link>
        <Link href="/create">
          Create a review
        </Link>
      </div>

      <ModeToggle />
    </nav>
  );
};

export default NavBar;
