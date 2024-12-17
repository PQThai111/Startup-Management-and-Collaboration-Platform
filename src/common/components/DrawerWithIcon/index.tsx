import { ReactNode, useState } from 'react';

const DrawerWithIcon = ({
  icon,
  title,
  children,
}: {
  icon: JSX.Element;
  title: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const onTouchEnd = () => {
    setOpen(false);
  };
  const onSwitch = () => {
    setOpen((c) => !c);
  };

  return (
    <>
      <div className={`bg-white text-center ${open && 'z-20'}`}>
        <button
          type="button"
          data-drawer-target="drawer-example"
          data-drawer-show="drawer-example"
          aria-controls="drawer-example"
          onClick={onSwitch}
        >
          {icon}
        </button>
      </div>
      {open && (
        <div
          onClickCapture={onTouchEnd}
          className={`fixed bottom-0 left-0 z-10 w-screen bg-black opacity-60`}
          style={{ height: 'calc(100% - 96px)' } as React.CSSProperties}
        ></div>
      )}
      <div
        id="drawer-example"
        className={`fixed bottom-0 right-0 ${!open && 'translate-x-full'} z-40 h-[87vh] w-80 overflow-y-auto bg-white p-4 transition-transform duration-500 dark:bg-gray-800`}
        tabIndex={-1}
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
          className="mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
        >
          {title}
        </h5>
        <button
          type="button"
          onClick={onTouchEnd}
          data-drawer-hide="drawer-example"
          aria-controls="drawer-example"
          className="absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        <div>{children}</div>
      </div>
    </>
  );
};

export default DrawerWithIcon;
