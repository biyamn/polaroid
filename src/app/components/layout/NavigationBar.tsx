'use client';

import Link from 'next/link';
import { GrHomeRounded } from 'react-icons/gr';
import { GrGallery } from 'react-icons/gr';
const NavigationBar = () => {
  return (
    <div className="flex justify-between bg-amber-200 px-7 pt-4 pb-2">
      <Link href="/home">
        <div className="flex flex-col items-center cursor-pointer">
          <GrHomeRounded style={{ width: '25px', height: '25px' }} />
          <div className="text-xs">홈</div>
        </div>
      </Link>
      <div className="flex gap-4">
        <Link href="/gallery">
          <div className="flex flex-col items-center cursor-pointer">
            <GrGallery style={{ width: '25px', height: '25px' }} />
            <div className="text-xs">갤러리</div>
          </div>
        </Link>
        <Link href="/login">
          <button
            className="
          bg-amber-400 text-white px-2 rounded-md h-8
          hover:bg-amber-500 transition-colors
        "
          >
            로그인
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
