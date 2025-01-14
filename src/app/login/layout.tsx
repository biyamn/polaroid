import Image from 'next/image';
import Link from 'next/link';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="pt-4 px-6">
        <Link href="/home">
          <Image
            src="/left-arrow.png"
            width={25}
            height={25}
            alt="뒤로가기 화살표"
          />
        </Link>
        <div className="h-full">
          <div className="">{children}</div>
        </div>
      </div>
    </section>
  );
}
