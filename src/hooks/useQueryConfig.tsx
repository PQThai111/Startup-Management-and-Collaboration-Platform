import { isUndefined, omitBy } from 'lodash';
<<<<<<< HEAD
import { useQueryParams } from './useQueryParams';
import { QueryConfig } from '../pages/Manager_Event/component/Manager_Event';

export function useEventQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      PageNumber: queryParams.PageNumber || '1',
      PageSize:
        Number(queryParams.PageSize) > 8 ? '8' : queryParams.PageSize || '8',
      SearchTerm: queryParams.SearchTerm,
=======
import { useQueryParams, useQueryParams2 } from './useQueryParams';
import { QueryConfig } from '../pages/EventPage/components/EventList';

export function useEventQueryConfig() {
  const queryParams = useQueryParams2();
  console.log(queryParams);
  const queryConfig: QueryConfig = omitBy(
    {
      PageNumber: queryParams.PageNumber || ('1' as string),
      PageSize:
        Number(queryParams.PageSize) > 8
          ? '8'
          : queryParams.PageSize || ('8' as string),
      SearchTerm: queryParams.SearchTerm as string,
      EventTypes: Array.isArray(queryParams.EventTypes)
        ? queryParams.EventTypes
        : [queryParams.EventTypes].filter(Boolean),
      IsMandatory: queryParams.IsMandatory as string,
>>>>>>> 76c812b (fix merge)
    },
    isUndefined,
  );

  return queryConfig;
}

export function useProjectQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      PageNumber: queryParams.PageNumber || '1',
      PageSize:
        Number(queryParams.PageSize) > 8 ? '8' : queryParams.PageSize || '8',
      SearchTerm: queryParams.SearchTerm,
    },
    isUndefined,
  );

  return queryConfig;
}
