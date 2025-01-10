import NiceModal, { useModal } from '@ebay/nice-modal-react';

export default NiceModal.create(() => {
  const modal = useModal();
  return (
    <div className="fixed top-1/2 left-1/2 z-50 w-40 h-40 border border-gray-900 -translate-x-1/2 -translate-y-1/2">
      <button onClick={() => modal.remove()}>ok</button>
      <button onClick={() => modal.remove()}>cancel</button>
    </div>
  );
});
