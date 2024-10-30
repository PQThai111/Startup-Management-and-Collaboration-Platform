import { HTMLAttributes } from 'react';

const CashItem = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex h-32 w-32 flex-col justify-between rounded-2xl border border-slate-200 py-2 pl-4 ${className}`}
      {...props}
    >
      <div>
        <p className="text-lg">500.000 Đ</p>
        <p className="text-xs">12/20/24</p>
      </div>
      <p>TitleCash</p>
    </div>
  );
};

export default CashItem;
