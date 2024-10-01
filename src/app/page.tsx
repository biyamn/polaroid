'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [uploadedFileUrl, setUploadedFileUrl] = useState([]);

  return (
    <div className="h-dvh bg-cyan-50 p-6 pt-20">
      <div className="flex justify-between px-6 py-4">
        <Image src="/print.png" alt="인쇄" height={30} width={30} />
        <Image src="/pen.png" alt="수정" height={30} width={30} />
      </div>
      <div className="h-[600px] bg-white">
        <div className="p-5 flex flex-col h-full justify-between items-center">
          <label
            htmlFor="file"
            className="h-full w-full flex items-center justify-center cursor-pointer bg-gray-100 my-5"
          >
            <input type="file" id="file" name="file" hidden /> +
          </label>
          <textarea
            className="w-full"
            rows={4}
            placeholder="기념할 하루에 대해 설명해주세요."
          />
        </div>
      </div>
    </div>
  );
}
