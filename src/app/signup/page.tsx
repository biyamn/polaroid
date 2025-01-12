'use client';

import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickSignup = async () => {
    console.log('click!');
    await supabase.auth.signUp({
      email: email,
      password: password,
    });
  };
  return (
    <div className="flex flex-col items-center h-screen p-8">
      <div className="text-3xl py-10">Snap Diary</div>
      <div className="flex flex-col w-full gap-3">
        <div>
          <div className="text-[#FFA33C]">이메일</div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-4 w-full h-12 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <div className="text-[#FFA33C]">비밀번호</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="6글자 이상"
            className="pl-4 w-full h-12 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <div className="text-[#FFA33C]">비밀번호 확인</div>
          <input
            type="password"
            placeholder="6글자 이상"
            className="pl-4 w-full h-12 border border-gray-300 rounded-md "
          />
        </div>
      </div>
      <div className="w-full flex gap-3 pt-6">
        <div className="w-1/3">
          <Link href="/home">
            <button className="w-full h-12 rounded-md text-lg my-4 border border-[#FFA33C]">
              취소
            </button>
          </Link>
        </div>
        <button
          onClick={handleClickSignup}
          className="w-2/3 h-12 rounded-md text-lg my-4 text-white bg-[#FFA33C]"
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
