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
    <div className="flex justify-between px-4 py-2">
      <div
        className="flex gap-1 cursor-pointer items-center"
        onClick={handleDelete}
      >
        <Image src="/trashcan.png" alt="삭제" height={25} width={25} />
        <div className="text-sm">내용 비우기</div>
      </div>
      <div
        className="flex gap-1 cursor-pointer items-center"
        onClick={handleClickSave}
      >
        <Image src="/save.png" alt="저장" height={25} width={25} />
        <div className="text-sm">저장하기</div>
      </div>
    </div>
  );
};

export default RemoveAndConfirmBar;
