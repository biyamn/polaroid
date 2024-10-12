'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const fetchSvg = async () => {
      const query = new URLSearchParams({
        date: '2024-02-02',
        text: '기념할 일',
        uploadedImageUrl:
          'https://eagdqfebxhcyrcckqfho.supabase.co/storage/v1/object/public/polaroid-image/fc7abeed-a70d-4575-bd52-8bb4b6977eb4',
      }).toString();

      const res = await fetch(`/api/generateSvg?${query}`); // API 경로에 쿼리 추가
      const svgText = await res.text(); // SVG 응답을 텍스트로 변환
      setSvgContent(svgText); // 상태에 저장
    };

    fetchSvg();
  }, []);

  return (
    <div>
      {/* SVG 내용을 직접 HTML로 삽입 */}
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </div>
  );
}
