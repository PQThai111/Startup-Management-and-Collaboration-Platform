import { HTMLAttributes } from 'react';
import CashItem from './CashItem';

const SourceOfFunds = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <p className="ml-5 text-base font-semibold">Revenue & Expenses</p>
      <div className="mt-3 flex gap-3 overflow-auto">
        <CashItem />
        <CashItem />
        <CashItem />
        <CashItem />
        <CashItem />
        <CashItem />
        <CashItem />
      </div>
    </div>
  );
};

export default SourceOfFunds;
