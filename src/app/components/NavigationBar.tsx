'use client';

import Link from 'next/link';
import { GrHomeRounded } from 'react-icons/gr';
import { GrGallery } from 'react-icons/gr';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import LoginModal from '@/app/components/LoginModal';
import { Button } from 'antd';

const NavigationBar = () => {
  const showLoginModal = () => {
    // Show a modal with arguments passed to the component as props
    NiceModal.show('login-modal');
  };

  return (
    <div className="flex justify-between bg-amber-200 px-7 pt-4 pb-2">
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
        <Button onClick={showLoginModal} variant="solid" color="orange">
          로그인
        </Button>
      </div>
      <LoginModal id="login-modal" name="Nate" />
    </div>
  );
};

export default NavigationBar;
