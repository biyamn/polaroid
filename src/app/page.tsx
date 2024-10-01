'use client';

import Image from 'next/image';
import { supabase } from '@/supabase/supabaseClient';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export default function Home() {
  console.log('1');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFileName = uuid();

    const fileImage = e.target.files;
    if (!fileImage || !fileImage[0]) return;

    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
      .upload(newFileName, fileImage[0]);
    if (error) {
      console.error('Upload error:', error);
      return;
    }
    console.log('File uploaded successfully:', data);

    const res = supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
      .getPublicUrl(data.path);
    console.log('res.data.publicUrl:', res.data.publicUrl);
    setUploadedImageUrl(res.data.publicUrl);

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
          <Image src={uploadedImageUrl} alt="이미지" width={50} height={50} />
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
