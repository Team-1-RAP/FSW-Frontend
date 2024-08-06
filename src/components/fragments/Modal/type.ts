export interface ModalProps {
    title: string;
    description: string;
    visible: boolean;
    buttonLabel: string;
    onButtonClick: () => void;
    onClose: () => void;
    ariaDescribedBy?: string;
}
