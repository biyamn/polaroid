import Image from 'next/image';

type RemoveAndConfirmBarProps = {
  setIsEditing: (isEditing: boolean | ((prev: boolean) => boolean)) => void;
  setUploadedImageUrl: (url: string) => void;
  setUploadImage: (file: File | null) => void;
  setText: (text: string) => void;
};

const RemoveAndConfirmBar = ({
  setIsEditing,
  setUploadedImageUrl,
  setUploadImage,
  setText,
}: RemoveAndConfirmBarProps) => {
  const handleClickSave = async () => {
    // 텍스트, 이미지를 DB에 저장하기
    setIsEditing((prev) => !prev);
  };

  const handleDelete = () => {
    setUploadedImageUrl('');
    setUploadImage(null);
    setText('');
  };

  return (
    <div className="flex justify-between px-6 py-2">
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
  );
};

export default RemoveAndConfirmBar;
