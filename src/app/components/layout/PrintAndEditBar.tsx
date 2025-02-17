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
    <div className="flex justify-between px-4 py-2 items-center">
      {isLoading && <Progress />}
      <div
        className="flex gap-1 cursor-pointer items-center justify-between"
        onClick={handleClickEdit}
      >
        <Image src="/pen.png" alt="수정" height={27} width={27} />
        {uploadedImageUrl === '' && text === '' ? (
          <div className="text-sm">만들기</div>
        ) : (
          <div className="text-sm">수정하기</div>
        )}
      </div>
      {uploadedImageUrl && text ? (
        <div
          className="flex gap-1 cursor-pointer items-center"
          onClick={handleDownloadImage}
        >
          <Image src="/print.png" alt="인쇄" height={25} width={25} />
          <div className="text-sm">인쇄하기</div>
        </div>
      ) : (
        <div className="text-sm">사진/글 모두 있어야 저장할 수 있어요.</div>
      )}
    </div>
  );
};

export default PrintAndEditBar;
