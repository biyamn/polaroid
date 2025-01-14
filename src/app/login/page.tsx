'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import { useRouter } from 'next/navigation';

type LoginErrorType = 'empty' | 'unMatch' | null;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<LoginErrorType>(null);

  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        },
      });
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  const handleClickLogin = async () => {
    if (email.length === 0 || password.length === 0) {
      setLoginError('empty');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setLoginError('unMatch');
      return;
    }

    router.push('/home');
  };

  return (
    <div className="flex flex-col items-center h-screen p-8">
      <div className="text-3xl py-10">Snap Diary</div>
      <div className="flex flex-col w-full">
        <div className="relative">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className="focus:border-[#FFA33C] focus:outline-none pl-10 w-full h-12 border border-gray-300 rounded-tr-md rounded-tl-md bg-white"
          />
          <Image
            className="absolute top-3 left-3"
            src="/person.png"
            width={20}
            height={20}
            alt="person"
          />
        </div>
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="focus:border-[#FFA33C]  focus:outline-none pl-10 w-full h-12 border border-gray-300 rounded-br-md rounded-bl-md border-t-white"
          />
          <Image
            className="absolute top-3 left-3"
            src="/lock.png"
            width={20}
            height={20}
            alt="lock"
          />
        </div>
      </div>
      {loginError === 'empty' && (
        <div className="text-left w-full text-red-500 text-sm h-4">
          이메일 또는 비밀번호를 입력해주세요.
        </div>
      )}
      {loginError === 'unMatch' && (
        <div className="text-left w-full text-red-500 text-sm h-4">
          이메일 또는 비밀번호가 잘못되었습니다.
        </div>
      )}
      {loginError === null && <div className="h-4"></div>}

      <div className="w-full">
        {email.length === 0 || password.length === 0 ? (
          <button
            onClick={handleClickLogin}
            className="w-full h-12 rounded-md text-lg my-4 text-white bg-[#c7c7c7]"
          >
            로그인
          </button>
        ) : (
          <button
            onClick={handleClickLogin}
            className="w-full h-12 rounded-md text-lg my-2 text-white bg-[#FFA33C]"
          >
            로그인
          </button>
        )}
      </div>
      <div className="w-full relative my-2">
        <div className="w-full h-0 border border-gray-200"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-400">
          또는
        </div>
      </div>
      <div className="w-full relative py-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full h-12 rounded-md text-lg text-[#8C8C8C] border border-gray-400"
        >
          구글 계정으로 로그인
        </button>
        <Image
          className="absolute top-6 left-10"
          src="/google.png"
          width={25}
          height={25}
          alt="google"
        />
      </div>
      <div className="flex gap-2">
        <div className="text-gray-500">처음이신가요?</div>
        <Link href="/signup">
          <div className="text-[#FFA33C] cursor-pointer">가입하기</div>
        </Link>
      </div>
    </div>
  );
}
