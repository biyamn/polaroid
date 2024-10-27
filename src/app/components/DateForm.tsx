import localFont from 'next/font/local';

const timeFont = localFont({
  src: '../fonts/time.ttf',
  display: 'swap',
});

type DateFormProps = {
  isEditing: boolean;
  date: Date;
  setDate: (date: Date) => void;
};

const DateForm = ({ isEditing, date, setDate }: DateFormProps) => {
  return (
    <div className={`${timeFont.className} absolute bottom-40 right-10`}>
      <input
        type="date"
        value={date.toISOString().split('T')[0]}
        onChange={(e) => setDate(new Date(e.target.value))}
        disabled={!isEditing}
        className="w-[260px] bg-transparent text-right text-sm absolute bottom-3 -right-4 text-yellow-400"
      />
    </div>
  );
};

export default DateForm;
