import { createSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { QueryConfig } from '../../pages/Manager_Event/component/Manager_Event';

interface Props {
  queryConfig: QueryConfig;
  PageSize: number;
  pathName: string;
}
const RANGE = 2;
export default function Pagination({ queryConfig, PageSize, pathName }: Props) {
  const page = Number(queryConfig.PageNumber);
  const rederPagination = () => {
    let dotAfter = false;
    let dotBefore = false;

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={index}
            className="mx-2 rounded border bg-white px-3 py-1 shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            key={index}
            className="mx-2 rounded border bg-white px-3 py-1 shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };
    return Array(PageSize)
      .fill(0)
      .map((_, index) => {
        const PageNumber = index + 1;
        if (
          page <= RANGE * 2 + 1 &&
          PageNumber > page + RANGE &&
          PageNumber < PageSize - RANGE + 1
        ) {
          //Trường Hợp ... chỉ xuất hiện duy nhất Ở sau
          //Page nó nằm ở khúc đầu
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < PageSize - RANGE * 2) {
          //Page nó nằm ở khúc giữa
          if (PageNumber < page - RANGE && PageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            PageNumber > page + RANGE &&
            PageNumber < PageSize - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          page >= PageSize - RANGE * 2 &&
          PageNumber > RANGE &&
          PageNumber < page - RANGE
        ) {
          //Trường Hợp ... chỉ xuất hiện duy nhất Ở đầu
          //Page nó nằm ở khúc cuối
          return renderDotBefore(index);
        }
        return (
          <Link
            to={{
              pathname: pathName,
              search: createSearchParams({
                ...queryConfig,
                PageNumber: PageNumber.toString(),
              }).toString(),
            }}
            key={index}
            className={classNames(
              'mx-2 cursor-pointer rounded border bg-white px-3 py-1 shadow-sm',
              {
                'border-cyan-500': PageNumber === page,
                'border-transparent': PageNumber !== page,
              },
            )}
          >
            {PageNumber}
          </Link>
        );
      });
  };
  return (
    <div className="flex flex-wrap justify-center">
      {page === 1 ? (
        <span className="mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-1 shadow-sm">
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: pathName,
            search: createSearchParams({
              ...queryConfig,
              PageNumber: (page - 1).toString(),
            }).toString(),
          }}
          className="mx-2 cursor-pointer rounded border bg-white px-3 py-1 shadow-sm"
        >
          Prev
        </Link>
      )}
      {rederPagination()}
      {page === PageSize ? (
        <span className="mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-1 shadow-sm">
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: pathName,
            search: createSearchParams({
              ...queryConfig,
              PageNumber: (page + 1).toString(),
            }).toString(),
          }}
          className="mx-2 cursor-pointer rounded border bg-white px-3 py-1 shadow-sm"
        >
          Next
        </Link>
      )}
    </div>
  );
}
