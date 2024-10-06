import Image from 'next/image';
import DescriptionForm from '@/app/components/DescriptionForm';
import DateForm from '@/app/components/DateForm';
import { v4 as uuid } from 'uuid';

type PolaroidProps = {
  uploadedImageUrl: string;
  setImageUuid: (imageUuid: string) => void;
  setUploadedImageUrl: (uploadedImageUrl: string) => void;
  setUploadImage: (uploadImage: File) => void;
  elementRef: React.RefObject<HTMLDivElement>;
  isEditing: boolean;
  text: string;
  setText: (text: string) => void;
};

const Polaroid = ({
  uploadedImageUrl,
  setImageUuid,
  setUploadedImageUrl,
  setUploadImage,
  elementRef,
  isEditing,
  text,
  setText,
}: PolaroidProps) => {
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

  return (
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
        <DateForm isEditing={isEditing} />
        <DescriptionForm isEditing={isEditing} text={text} setText={setText} />
      </div>
    </div>
  );
};

export default Polaroid;
