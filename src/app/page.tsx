'use client';

import Image from 'next/image';
import { supabase } from '@/supabase/supabaseClient';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export default function Home() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [imageUuid, setImageUuid] = useState<string>('');
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  const handleClickEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleClickSave = async () => {
    // 텍스트, 이미지를 DB에 저장하기

    // 이미지와 텍스트가 없으면 종료
    if (!text && !uploadImage) {
      setIsEditing(false);
      return;
    }

    // Supabase storage에 이미지 파일 업로드
    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
      .upload(imageUuid, uploadImage as File, {
        headers: {
          'x-upsert': 'true', // optionally set upsert to true to overwrite existing files
        },
      });

    if (error) {
      console.error('Upload error:', error);
      return;
    }

    // 이미지가 업로드 완료되고 생성된 public URL을 가져와서 화면에 표시
    const res = supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET as string)
      .getPublicUrl(data.path);

    setUploadedImageUrl(res.data.publicUrl); // 실제 이미지 URL로 교체

    // Supabase DB에 이미지 URL과 텍스트 저장
    const { error: dbError } = await supabase
      .from('polaroid-data')
      .insert([{ image_url: res.data.publicUrl, description: text }]);

    if (dbError) {
      console.error('DB insert error:', dbError);
      return;
    }

    setIsEditing((prev) => !prev);
  };

  const handleSaveLocalImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFileName = uuid();
    setImageUuid(newFileName);

    // 파일이 없으면 종료
    const file = e.target.files;
    if (!file || !file[0]) return;

    // 업로드 전에 브라우저 내부에서만 유효한 임시 URL 생성
    const localPreviewUrl = URL.createObjectURL(file[0]);
    setUploadedImageUrl(localPreviewUrl);

    // 실제로 supabase storage에 업로드되기 전에 이미지를 로컬에서 보여주기
    setUploadImage(file[0]);
  };

  const handleDelete = () => {
    setUploadedImageUrl('');
    setUploadImage(null);
    setText('');
  };
  return (
    <div className="h-dvh bg-cyan-50 p-6 pt-20">
      {!isEditing ? (
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
            onClick={handleClickEdit}
          />
        </div>
      ) : (
        <div className="flex justify-between px-6 py-4">
          <Image
            src="/trashcan.png"
            alt="삭제"
            height={30}
            width={30}
            className="cursor-pointer"
            onClick={handleDelete}
          />
          <Image
            src="/save.png"
            alt="저장"
            height={30}
            width={30}
            className="cursor-pointer"
            onClick={handleClickSave}
          />
        </div>
      )}
      <div className="h-[560px] bg-white">
        <div className="p-5 flex flex-col h-full justify-between items-center">
          {uploadedImageUrl ? (
            <div className="h-96 w-full flex items-center justify-center my-5 relative">
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
                onChange={handleSaveLocalImage}
                disabled={!isEditing}
              />
              <Image src="/upload.png" alt="업로드" height={40} width={40} />
            </label>
          )}
          <textarea
            className="w-full"
            rows={4}
            placeholder="기념할 하루에 대해 설명해주세요."
            disabled={!isEditing}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
