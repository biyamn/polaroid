import satori from 'satori';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import Image from 'next/image';
import { convertSvgToPngByResvg } from '@/app/utils/convertSvgToPngByResvg';

// 폰트 로드
const pretendardFontBuffer = fs.readFileSync(
  path.join(process.cwd(), 'src', 'app', 'fonts', 'Pretendard-Regular.woff')
);

const timeFontBuffer = fs.readFileSync(
  path.join(process.cwd(), 'src', 'app', 'fonts', 'time.ttf')
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date') || '';
  const text = searchParams.get('text') || '';
  const uploadedImageUrl = searchParams.get('uploadedImageUrl') || '';

  try {
    // Satori로 SVG 생성
    const svg = await satori(
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          height: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', position: 'relative' }}>
            <Image
              src="https://eagdqfebxhcyrcckqfho.supabase.co/storage/v1/object/public/polaroid-image/frame.jpg"
              alt="폴라로이드"
              style={{ height: '516px', width: '324px' }}
            />
          </div>
          <Image
            src={uploadedImageUrl}
            alt="이미지"
            style={{
              display: 'flex',
              objectFit: 'contain',
              position: 'absolute',
              top: '43px',
              left: '54px',
              height: '382px',
              width: '288px',
            }}
          />
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '154px',
              right: '90px',
              fontFamily: 'timeFont',
              color: '#facc15',
            }}
          >
            <span>{date}</span>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              position: 'relative',
              bottom: '70px',
              right: '-50px',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                padding: '8px',
                zIndex: 50,
                backgroundColor: 'transparent',
                resize: 'none',
                fontSize: '15px',
                color: '#1F2937', // text-gray-900
                maxWidth: '300px',
              }}
            >
              {text}
            </div>
          </div>
        </div>
      </div>,
      {
        width: 400,
        height: 500, // 적절한 높이로 설정
        fonts: [
          {
            style: 'normal',
            name: 'pretendard',
            data: pretendardFontBuffer,
            weight: 600,
          },
          {
            style: 'normal',
            name: 'timeFont',
            data: timeFontBuffer,
            weight: 600,
          },
        ],
      }
    );

    const pngBuffer = convertSvgToPngByResvg(svg);

    // 성공적으로 SVG를 생성한 후 반환
    return new NextResponse(pngBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.error('SVG 생성 오류:', error);
    return new NextResponse('SVG 생성 오류', { status: 500 });
  }
}
