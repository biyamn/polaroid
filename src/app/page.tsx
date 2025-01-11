'use client';
import NavigationBar from '@/app/components/layout/NavigationBar';
import { useRef, useState } from 'react';
import PrintAndEditBar from '@/app/components/layout/PrintAndEditBar';
import RemoveAndConfirmBar from '@/app/components/layout/RemoveAndConfirmBar';
import Polaroid from '@/app/components/Polaroid';

export default function Home() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [imageUuid, setImageUuid] = useState<string>('');
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState(new Date());

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col justify-between bg-yellow-50 h-full">
        <div className="px-6 pb-6 pt-2 overflow-y-hidden">
          {!isEditing ? (
            <PrintAndEditBar
              setIsEditing={setIsEditing}
              imageUuid={imageUuid}
              uploadImage={uploadImage}
              elementRef={elementRef}
              uploadedImageUrl={uploadedImageUrl}
              text={text}
              date={date}
            />
          ) : (
            <RemoveAndConfirmBar
              setIsEditing={setIsEditing}
              setUploadedImageUrl={setUploadedImageUrl}
              setUploadImage={setUploadImage}
              setText={setText}
            />
          )}
          <Polaroid
            uploadedImageUrl={uploadedImageUrl}
            setImageUuid={setImageUuid}
            setUploadedImageUrl={setUploadedImageUrl}
            setUploadImage={setUploadImage}
            elementRef={elementRef}
            isEditing={isEditing}
            text={text}
            setText={setText}
            date={date}
            setDate={setDate}
          />
        </div>
      </div>
    </>
  );
}
