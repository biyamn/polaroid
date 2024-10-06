type DescriptionFormProps = {
  isEditing: boolean;
  text: string;
  setText: (text: string) => void;
};

const DescriptionForm = ({
  isEditing,
  text,
  setText,
}: DescriptionFormProps) => {
  const maxLength = 40;
  return (
    <div className="w-full relative -top-16">
      <textarea
        className="w-full px-2 py-1 z-50 bg-transparent resize-none text-[15px] relative text-gray-700"
        rows={2}
        placeholder="어떤 기념할 일이 있었나요?"
        disabled={!isEditing}
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
      />
      {isEditing && (
        <div className="absolute bottom-0.5 right-2 text-xs text-gray-500">
          {text.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default DescriptionForm;
