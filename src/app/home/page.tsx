'use client';

import { useRef, useState } from 'react';
import PrintAndEditBar from '@/app/components/PrintAndEditBar';
import RemoveAndConfirmBar from '@/app/components/RemoveAndConfirmBar';
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
    </>
  );
}
