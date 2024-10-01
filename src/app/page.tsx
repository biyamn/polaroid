'use client';

import Image from 'next/image';
import { useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import { v4 as uuid } from 'uuid';

export default function Home() {
  const [uploadedFileUrl, setUploadedFileUrl] = useState([]);
  const [file, setFile] = useState<File>();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileImage = e.target.files;

    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
      .upload(fileImage, file, { upsert: true });
    if (error) {
      console.error(error);
      return;
    }
    return data;
  };

  return (
    <div className="h-dvh bg-cyan-50 p-6 pt-20">
      <div className="flex justify-between px-6 py-4">
        <Image
          src="/print.png"
          alt="인쇄"
          height={30}
          width={30}
          className="cursor-pointer"
        />
        <Image
          src="/pen.png"
          alt="수정"
          height={30}
          width={30}
          className="cursor-pointer"
        />
      </div>
      <div className="h-[600px] bg-white">
        <div className="p-5 flex flex-col h-full justify-between items-center">
          <label
            htmlFor="file"
            className="h-full w-full flex items-center justify-center cursor-pointer bg-gray-100 my-5"
          >
            <input
              type="file"
              id="file"
              name="file"
              hidden
              onChange={handleFileUpload}
            />
            <Image src="/upload.png" alt="업로드" height={40} width={40} />
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
