import { Overlay, Modal } from './Modal.styled';

export default function openModal() {
  return (
    <Overlay>
      <Modal></Modal>
    </Overlay>
  );
}
