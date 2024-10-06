import Image from 'next/image';
import { supabase } from '@/supabase/supabaseClient';
import { toPng } from 'html-to-image';

type PrintAndEditBarProps = {
  setIsEditing: (isEditing: boolean) => void;
  imageUuid: string;
  uploadImage: File | null;
  elementRef: React.RefObject<HTMLDivElement>;
  text: string;
  setUploadedImageUrl: (url: string) => void;
};

const PrintAndEditBar = ({
  setIsEditing,
  imageUuid,
  uploadImage,
  elementRef,
  text,
  setUploadedImageUrl,
}: PrintAndEditBarProps) => {
  const handleClickEdit = () => {
    setIsEditing((prev) => !prev);
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
