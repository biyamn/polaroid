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

  console.log('uploadedImageUrl', uploadedImageUrl);
  return (
    <div className="h-dvh bg-yellow-50 p-6 pt-16 overflow-y-hidden">
      {!isEditing ? (
        <PrintAndEditBar
          setIsEditing={setIsEditing}
          imageUuid={imageUuid}
          uploadImage={uploadImage}
          elementRef={elementRef}
          text={text}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
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
  );
}
