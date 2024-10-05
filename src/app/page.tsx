'use client';

import Image from 'next/image';
import { supabase } from '@/supabase/supabaseClient';
import { v4 as uuid } from 'uuid';
import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import localFont from 'next/font/local';

const timeFont = localFont({
  src: '../time.ttf',
  display: 'swap',
});

export default function Home() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [imageUuid, setImageUuid] = useState<string>('');
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState(new Date());

  const handleClickEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleClickSave = async () => {
    // 텍스트, 이미지를 DB에 저장하기

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

  const handleDownloadImage = async () => {
    // 리액트 컴포넌트를 이미지로 변환하여 다운로드
    if (elementRef.current) {
      // 이미지를 다운로드하기 전에 화면에 표시되는 이미지 크기 축소
      elementRef.current.style.transform = 'scale(0.7)';
      elementRef.current.style.transformOrigin = 'center';

      // elementRef가 참조하는 DOM 요소가 존재하는지 확인
      toPng(elementRef.current, { cacheBust: false }) // 해당 요소를 PNG로 변환
        .then((dataUrl) => {
          // 이미지 다운로드 이후 화면에 표시되는 이미지 크기 복원
          elementRef.current!.style.transform = 'scale(1)';
          // 변환이 완료되면, PNG 이미지의 Data URL을 반환
          const link = document.createElement('a'); // 다운로드를 위한 <a> 태그 생성
          link.download = '폴라로이드.png'; // 다운로드될 파일의 이름 설정
          link.href = dataUrl; // <a> 태그의 href 속성에 변환된 이미지의 Data URL을 설정
          link.click(); // 링크 클릭을 트리거하여 다운로드 시작
        })
        .catch((err) => {
          // 변환 과정에서 에러가 발생한 경우 처리
          console.log(err); // 에러를 콘솔에 출력
        });
    }

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
  };

  return (
    <div className="h-dvh bg-yellow-50 p-6 pt-16 overflow-y-hidden">
      {!isEditing ? (
        <div className="flex justify-between px-6 py-4">
          <Image
            src="/print.png"
            alt="인쇄"
            height={30}
            width={30}
            className="cursor-pointer downloadButton"
            onClick={handleDownloadImage}
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
      {/* 프레임 시작 */}
      <div className="flex justify-center items-center relative">
        <div
          ref={elementRef}
          className="flex flex-col justify-center items-center relative"
        >
          <div className="relative">
            <Image src="/frame.jpg" alt="폴라로이드" height={516} width={324} />
          </div>
          {uploadedImageUrl ? (
            <div className="top-10 left-4 h-[382px] w-[288px] flex items-center justify-center absolute">
              <div className="inset-0">
                <div className="h-[382px] w-[288px] bg-white"></div>
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
              className="absolute top-10 left-4 h-[382px] w-[288px] flex items-center justify-center cursor-pointer bg-white"
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
          <div className={`${timeFont.className} absolute bottom-36 right-10`}>
            <input
              type="date"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              disabled={!isEditing}
              className="w-[260px] bg-transparent text-right text-sm absolute bottom-0 -right-4 text-yellow-400"
            />
          </div>
          <textarea
            className="relative -top-16 w-full px-4 z-50 bg-transparent resize-none "
            rows={2}
            placeholder="어떤 기념할 일이 있었나요?"
            disabled={!isEditing}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
