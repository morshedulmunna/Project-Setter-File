import React, { ReactNode, type FC } from "react";

type ModalStateProps = {
  isOpen: Boolean;
  onClose: (A?: any) => any;
  children: ReactNode;
  className?: string;
  crossEnable?: boolean;
};

const ModalContainer: FC<ModalStateProps> = ({ children, isOpen, onClose, className, crossEnable = false }) => {
  return (
    <React.Fragment>
      <div className={`fixed left-0 top-0 z-50 grid h-screen w-screen place-content-center overflow-hidden  bg-opacity-70 backdrop-blur-[2px] transition-all duration-200 ${isOpen ? "" : "invisible opacity-0"} `} onClick={() => !crossEnable && onClose(false)}>
        <div className={`relative ${className}`} onClick={(e) => e.stopPropagation()}>
          {crossEnable && (
            <button onClick={() => onClose(false)} className="absolute right-2 top-2 rounded cursor-pointer  bg-white p-1 shadow border hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};
export default ModalContainer;
