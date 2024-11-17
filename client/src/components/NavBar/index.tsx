import { ModeToggle } from './ModeToggle';
import Link from '../Link';
import useAuth from '@/hooks/useAuth';
import Menu from './Menu';

const NavBar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="py-3 pl-6 md:py-5 md:px-56 flex flex-row items-center justify-between w-screen fixed top-0 backdrop-blur-sm border-b">
      <div className='w-full flex items-end justify-start gap-4 md:gap-16'>
        <Link
          href="/"
          className="text-primary/100 hover:text-primary/80 italic text-2xl"
        >
          Beerify
        </Link>
        <Link href="/reviews" className='text-left'>Reviews </Link>

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
