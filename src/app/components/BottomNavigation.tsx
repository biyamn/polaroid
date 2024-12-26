'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoHome } from 'react-icons/go';
import { GrGallery } from 'react-icons/gr';

type NavItemProps = {
  href: string;
  Icon: any;
  text: string;
};

const navIconColors = {
  default: '#8D8D8D',
  selected: '#FF8800',
};

const getNavItemStatus = (pathname: string, href: string) => {
  console.log('pathname', pathname);
  console.log('href', href);
  return new RegExp(href).test(pathname) ? 'selected' : 'default';
};

const NAV_ITEMS = [
  { href: '/home', Icon: GoHome, text: '홈' },
  { href: '/gallery', Icon: GrGallery, text: '갤러리' },
];

const NavItem = ({ href, Icon, text }: NavItemProps) => {
  const pathname = usePathname();
  const color = navIconColors[getNavItemStatus(pathname, href)];

  return (
    <Link href={href}>
      <div className="flex flex-col items-center cursor-pointer">
        <Icon color={color} style={{ width: '45px', height: '45px' }} />
        <div className={`text-[${color}]`}>{text}</div>
      </div>
    </Link>
  );
};

const BottomNavigation = () => {
  return (
    <div className="h-24 w-full mx-auto z-50 bg-yellow-100 flex justify-around items-center">
      {NAV_ITEMS.map(({ href, Icon, text }) => (
        <NavItem key={href} href={href} Icon={Icon} text={text} />
      ))}
    </div>
  );
};

export default BottomNavigation;
