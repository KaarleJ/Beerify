import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/types';
import { MenuIcon } from 'lucide-react';

interface MenuProps {
  className?: string;
  user?: User;
  logout: () => void;
}

const Menu = ({ className, user, logout }: MenuProps) => {
  return (
    <div className={`border bg-background px-2 pt-2 rounded-md mx-2 ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user ? (
            <>
              <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><a href={`/reviews?author=${user.id}`} className='font-normal w-full h-full'>Your reviews</a></DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem><a href='/login' className='font-normal w-full h-full'>login</a></DropdownMenuItem>
              <DropdownMenuItem><a href='/register' className='font-normal w-full h-full'>register</a></DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Menu;
