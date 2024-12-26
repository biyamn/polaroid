import Image from 'next/image';
import { supabase } from '@/supabase/supabaseClient';
import { useState } from 'react';
import Progress from '@/app/components/Progress';

type PrintAndEditBarProps = {
  setIsEditing: (isEditing: boolean | ((prev: boolean) => boolean)) => void;
  imageUuid: string;
  uploadImage: File | null;
  elementRef: React.RefObject<HTMLDivElement>;
  text: string;
  date: Date;
  uploadedImageUrl: string;
};

const PrintAndEditBar = ({
  setIsEditing,
  imageUuid,
  uploadImage,
  date,
  text,
  uploadedImageUrl,
}: PrintAndEditBarProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDownloadImage = async () => {
    setIsLoading(true);

    try {
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

      // Supabase DB에 이미지 URL과 텍스트 저장
      const { error: dbError } = await supabase
        .from('polaroid-data')
        .insert([{ image_url: res.data.publicUrl, description: text }]);

      if (dbError) {
        console.error('DB insert error:', dbError);
        return;
      }

      const query = new URLSearchParams({
        date: date.toISOString().split('T')[0],
        text: text,
        uploadedImageUrl: res.data.publicUrl,
      }).toString();

      // 이미지를 저장
      // 가상의 앵커(a) 태그를 생성하여 클릭 이벤트를 트리거

      const link = document.createElement('a');
      link.href = `/api/satori?${query}`;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('link.href: ', link.href);
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-between px-6 py-2">
      {isLoading && <Progress />}
      <Image
        src="/pen.png"
        alt="수정"
        height={20}
        width={20}
        className="cursor-pointer"
        onClick={handleClickEdit}
      />
      {uploadedImageUrl && text ? (
        <Image
          src="/print.png"
          alt="인쇄"
          height={20}
          width={20}
          className="cursor-pointer downloadButton"
          onClick={handleDownloadImage}
        />
      ) : (
        <>사진과 글 모두가 있어야 인쇄할 수 있어요!</>
      )}
    </div>
  );
};

export default PrintAndEditBar;
