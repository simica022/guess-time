import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

type ResultsModalType = {
    targetTime: number;
    remainingTime: number;
    onReset: () => void;
};

export type ResultsModalHandleType = {
    open: () => void;
};

const ResultsModal = forwardRef<ResultsModalHandleType, ResultsModalType>(({ targetTime, remainingTime, onReset }, ref) => {
    const dialog = useRef<HTMLDialogElement | null>(null);
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const userLost = remainingTime <= 0;
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => ({
        open() {
            if (dialog.current) {
                dialog.current.showModal();
            }
        }
    }));

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You Lost!</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form onSubmit={onReset} method="dialog">
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal') as Element
    );
});

export default ResultsModal;
