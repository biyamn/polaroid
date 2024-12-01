import Image from 'next/image';
import { supabase } from '@/supabase/supabaseClient';

type PrintAndEditBarProps = {
  setIsEditing: (isEditing: boolean | ((prev: boolean) => boolean)) => void;
  imageUuid: string;
  uploadImage: File | null;
  elementRef: React.RefObject<HTMLDivElement>;
  text: string;
  date: Date;
};

const PrintAndEditBar = ({
  setIsEditing,
  imageUuid,
  uploadImage,
  date,
  text,
}: PrintAndEditBarProps) => {
  const handleClickEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDownloadImage = async () => {
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
    link.href = `/api/generateSvg?${query}`;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('link.href: ', link.href);
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
