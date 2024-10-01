'use client';

import Image from 'next/image';
import { supabase } from '@/supabase/supabaseClient';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export default function Home() {
  console.log('1');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

  // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newFileName = uuid();

  //   const fileImage = e.target.files;
  //   if (!fileImage || !fileImage[0]) return;

  //   const { data, error } = await supabase.storage
  //     .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
  //     .upload(newFileName, fileImage[0]);
  //   if (error) {
  //     console.error('Upload error:', error);
  //     return;
  //   }
  //   const res = supabase.storage
  //     .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
  //     .getPublicUrl(data.path);
  //   console.log('res.data.publicUrl:', res.data.publicUrl);
  //   setUploadedImageUrl(res.data.publicUrl);
  //   console.log('File uploaded successfully:', data);

  //   return data;
  // };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFileName = uuid();

    const fileImage = e.target.files;
    if (!fileImage || !fileImage[0]) return;

    // 업로드 전에 브라우저 내부에서만 유효한 임시 URL 생성
    const localPreviewUrl = URL.createObjectURL(fileImage[0]);
    setUploadedImageUrl(localPreviewUrl); // 임시 이미지 URL을 설정

    // Supabase에 파일 업로드
    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
      .upload(newFileName, fileImage[0]);

    if (error) {
      console.error('Upload error:', error);
      return;
    }

    // 실제 업로드된 파일의 public URL을 가져와서 설정
    const res = supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
      .getPublicUrl(data.path);

    setUploadedImageUrl(res.data.publicUrl); // 실제 이미지 URL로 교체
    console.log('File uploaded successfully:', data);

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
      <div className="h-[560px] bg-white">
        <div className="p-5 flex flex-col h-full justify-between items-center">
          {uploadedImageUrl ? (
            <div className="h-96 w-full flex items-center justify-center cursor-pointer my-5 relative">
              <div className="absolute inset-0">
                <Image
                  src={uploadedImageUrl}
                  alt="이미지"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          ) : (
            <label
              htmlFor="file"
              className="h-96 w-full flex items-center justify-center cursor-pointer bg-gray-100 my-5"
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
          )}
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
