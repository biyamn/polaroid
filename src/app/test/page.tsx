'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    // 쿼리 파라미터 생성
    const query = new URLSearchParams({
      date: '2024-02-02',
      text: '오늘은 불꽃축제에 다녀왔다ㅎㅎ 너무 예뻤다!! 친구와 함께 여의도에 갔다~',
      uploadedImageUrl:
        'https://eagdqfebxhcyrcckqfho.supabase.co/storage/v1/object/public/polaroid-image/ab57d3f2-1acb-4c34-98ef-ed377b2e70df',
    }).toString();

    // img src를 API 경로로 설정
    setImgSrc(`/api/generateSvg?${query}`);
  }, []);

  return (
    <div>
      {/* API로부터 받은 이미지(SVG)를 렌더링 */}
      {imgSrc && (
        <img
          src={imgSrc}
          alt="Generated PNG by satori+resvg"
          style={{ width: '100%', height: '100vh' }}
        />
      )}

      <a href={imgSrc} download="generated-image.png">
        <button>이미지 다운로드</button>
      </a>
    </div>
  );
}
