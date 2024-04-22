import { ModeToggle } from './ModeToggle';
import Link from '../Link';
import useAuth from '@/hooks/useAuth';
import Menu from './Menu';

const NavBar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="p-5 flex flex-row items-center justify-around w-screen fixed top-0 backdrop-blur-sm border-b">
      <div>
        <Link
          href="/"
          className="mx-10 text-primary/100 hover:text-primary/80 italic text-2xl"
        >
          Beerify
        </Link>
        <Link href="/reviews">Reviews </Link>

        {user ? (
          <>
            <Link href="/create">Create a review</Link>
          </>
        ) : null}
      </div>

      <div className="flex flex-row">
        <ModeToggle />
        <Menu user={user} logout={logout} />
      </div>
    </nav>
  );
};

export default NavBar;
