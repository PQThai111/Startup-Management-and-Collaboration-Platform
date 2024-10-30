import { HTMLAttributes } from 'react';
import { PiWalletFill } from 'react-icons/pi';

const RevExp = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <p className="ml-5 text-base font-semibold">Revenue & Expenses</p>
      <div className="mt-5 flex gap-5">
        <div className="flex h-36 w-1/2 items-center rounded-xl bg-[#EEF2F5] pl-5">
          <div>
            <div className="h-fit w-fit rounded-full bg-[#CAE2FF] p-2 text-2xl text-[#255DC9]">
              <PiWalletFill />
            </div>
            <div className="mt-2">
              <p>Total</p>
              <p className="text-xl font-semibold">11.050.000 Đ</p>
            </div>
          </div>
        </div>
        <div className="flex h-36 w-1/2 items-center rounded-xl bg-[#EEF2F5] pl-5">
          <div>
            <div className="h-fit w-fit rounded-full bg-[#A9A9A9] p-2 text-2xl">
              <PiWalletFill />
            </div>
            <div className="mt-2">
              <p>Cash out</p>
              <p className="text-xl font-semibold">- 500.000 Đ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevExp;
