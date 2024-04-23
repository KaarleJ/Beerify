import { Card } from './ui/card';

interface ModalProps {
  className?: string;
  show?: boolean;
  children: React.ReactNode;
}

const Modal = ({ show, className, children }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <Card className={`z-40 ${className}`}>{children}</Card>
    </div>
  );
};

export default Modal;
