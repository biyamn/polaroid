import localFont from 'next/font/local';

type DescriptionFormProps = {
  isEditing: boolean;
  text: string;
  setText: (text: string) => void;
};

const descriptionFont = localFont({
  src: '../fonts/Hakgyoansim Geurimilgi TTF R.ttf',
  display: 'swap',
});

const DescriptionForm = ({
  isEditing,
  text,
  setText,
}: DescriptionFormProps) => {
  const maxLength = 40;
  return (
    <div className="w-full relative -top-16">
      <textarea
        className={`${descriptionFont.className} w-full px-5 z-20 bg-transparent resize-none text-md relative text-gray-800`}
        rows={2}
        placeholder="어떤 기념할 일이 있었나요?"
        disabled={!isEditing}
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
      />
      {isEditing && (
        <div className="absolute bottom-3 right-2 text-xs text-gray-600">
          {text.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default DescriptionForm;
