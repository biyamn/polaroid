import Link from 'next/link';
import { GrHomeRounded } from 'react-icons/gr';
import { GrGallery } from 'react-icons/gr';

const NavigationBar = () => {
  return (
    <div className="flex justify-between bg-orange-200 px-7 pt-4 pb-2">
      <Link href="/">
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
        <button className="bg-[#FFA33C] hover:bg-orange-500 text-sm font-bold px-2 h-8 rounded">
          로그인
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
