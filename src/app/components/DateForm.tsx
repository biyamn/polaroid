import localFont from 'next/font/local';
import { useState } from 'react';

const timeFont = localFont({
  src: '../fonts/time.ttf',
  display: 'swap',
});

type DateFormProps = {
  isEditing: boolean;
};

const DateForm = ({ isEditing }: DateFormProps) => {
  const [date, setDate] = useState(new Date());
  return (
    <div className={`${timeFont.className} absolute bottom-36 right-10`}>
      <input
        type="date"
        value={date.toISOString().split('T')[0]}
        onChange={(e) => setDate(new Date(e.target.value))}
        disabled={!isEditing}
        className="w-[260px] bg-transparent text-right text-sm absolute bottom-5 -right-4 text-yellow-400"
      />
    </div>
  );
};

export default DateForm;
