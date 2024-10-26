import Image from 'next/image';
import { supabase } from '@/supabase/supabaseClient';
import { useEffect, useState } from 'react';

type PrintAndEditBarProps = {
  setIsEditing: (isEditing: boolean | ((prev: boolean) => boolean)) => void;
  imageUuid: string;
  uploadImage: File | null;
  elementRef: React.RefObject<HTMLDivElement>;
  text: string;
  date: Date;
  setUploadedImageUrl: (url: string) => void;
};

const PrintAndEditBar = ({
  setIsEditing,
  imageUuid,
  uploadImage,
  date,
  text,
  setUploadedImageUrl,
}: PrintAndEditBarProps) => {
  const handleClickEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    // 쿼리 파라미터 생성
    const query = new URLSearchParams({
      date: date.toISOString().split('T')[0],
      text: text,
      uploadedImageUrl:
        'https://eagdqfebxhcyrcckqfho.supabase.co/storage/v1/object/public/polaroid-image/2e320958-f6cd-4c90-949d-a5d1e0cfc577',
    }).toString();

    // img src를 API 경로로 설정
    setImgSrc(`/api/generateSvg?${query}`);
  }, []);

  const handleDownloadImage = async () => {
    // 이미지를 저장
    // 가상의 앵커(a) 태그를 생성하여 클릭 이벤트를 트리거
    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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
  );
};

export default PrintAndEditBar;
