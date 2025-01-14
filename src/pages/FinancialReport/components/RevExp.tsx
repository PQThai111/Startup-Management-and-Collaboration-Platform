import { HTMLAttributes } from 'react';
import { PiWalletFill } from 'react-icons/pi';
import { formatCurrency } from '../../../util/util';

interface RevExpProps extends HTMLAttributes<HTMLDivElement> {
  total: number;
  cashOut: number;
}

const RevExp = ({ total, cashOut, ...props }: RevExpProps) => {
  return (
    <div {...props}>
      <div className="mt-5 flex w-4/5 flex-col gap-5">
        <div className="flex h-36 w-full items-center rounded-xl bg-[#EEF2F5] pl-5">
          <div>
            <div className="h-fit w-fit rounded-full bg-[#A9A9A9] p-2 text-2xl">
              <PiWalletFill />
            </div>
            <div className="mt-2">
              <p>Total Cash in</p>
              <p className="text-xl font-semibold">
                {formatCurrency(total - cashOut)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex h-36 w-full items-center rounded-xl bg-[#EEF2F5] pl-5">
          <div>
            <div className="h-fit w-fit rounded-full bg-[#A9A9A9] p-2 text-2xl">
              <PiWalletFill />
            </div>
            <div className="mt-2">
              <p>Total Cash out</p>
              <p className="text-xl font-semibold">{formatCurrency(cashOut)}</p>
            </div>
          </div>
        </div>
        <div className="flex h-36 w-full items-center rounded-xl bg-[#EEF2F5] pl-5">
          <div>
            <div className="h-fit w-fit rounded-full bg-[#CAE2FF] p-2 text-2xl text-[#255DC9]">
              <PiWalletFill />
            </div>
            <div className="mt-2">
              <p>Remaining</p>
              <p className="text-xl font-semibold">{formatCurrency(total)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevExp;
