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
  return (
    <textarea
      className="relative -top-16 w-full px-4 z-50 bg-transparent resize-none text-lg"
      rows={2}
      placeholder="어떤 기념할 일이 있었나요?"
      disabled={!isEditing}
      value={text}
      onChange={(e) => setText(e.target.value)}
      maxLength={28}
    />
  );
};

export default DescriptionForm;
