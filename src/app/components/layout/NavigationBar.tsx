'use client';

import Link from 'next/link';
import Image from 'next/image';

const NavigationBar = ({ isLogin }) => {
  return (
    <div className="flex justify-between bg-amber-200 px-7 pt-4 pb-2">
      <Link href="/home">
        <div className="flex flex-col items-center cursor-pointer text-xl">
          Snap Diary
        </div>
      </Link>
      <div className="flex gap-4">
        {isLogin ? (
          <Link href="/gallery">
            <div className="flex flex-col items-center cursor-pointer">
              <Image src="/gallery.png" alt="갤러리" height={30} width={30} />
            </div>
          </Link>
        ) : (
          <Link href="/login">
            <button
              className="
          bg-amber-500 text-white px-2 rounded-md h-8
          hover:bg-amber-600 transition-colors text-sm
        "
            >
              로그인
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
