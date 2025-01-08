import { isUndefined, omitBy } from 'lodash';
import { useQueryParams, useQueryParams2 } from './useQueryParams';
import { QueryConfig } from '../pages/EventPage/components/EventList';
<<<<<<< HEAD
=======
import { QueryConfig as QueryConfig1 } from '../pages/ProjectPage/components/ProjectList';

export function useStudentQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      PageNumber: queryParams.PageNumber || '1',
      PageSize:
        Number(queryParams.PageSize) > 8 ? '8' : queryParams.PageSize || '8',
      SearchTerm: queryParams.SearchTerm,
      CourseId: queryParams.CourseId,
      SemesterId: queryParams.SemesterId,
      HadTeam: 'false',
    },
    isUndefined,
  );

  return queryConfig;
}
>>>>>>> e31efde (Staff manage main)

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
    },
    isUndefined,
  );

  return queryConfig;
}

<<<<<<< HEAD
export function useStudentQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      PageNumber: queryParams.PageNumber || '1',
      PageSize:
        Number(queryParams.PageSize) > 8 ? '8' : queryParams.PageSize || '8',
      SearchTerm: queryParams.SearchTerm,
      CourseId: queryParams.CourseId,
      SemesterId: queryParams.SemesterId,
      HadTeam: 'false',
    },
    isUndefined,
  );

  return queryConfig;
}

export function useProjectQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
=======
export function useProjectQueryConfig() {
  const queryParams = useQueryParams2();
  const queryConfig: QueryConfig1 = omitBy(
>>>>>>> e31efde (Staff manage main)
    {
      PageNumber: queryParams.PageNumber || '1',
      PageSize:
        Number(queryParams.PageSize) > 8 ? '8' : queryParams.PageSize || '8',
      SearchTerm: queryParams.SearchTerm,
<<<<<<< HEAD
=======
      projectCategories: Array.isArray(queryParams.projectCategories)
        ? queryParams.projectCategories
        : [queryParams.projectCategories].filter(Boolean),
>>>>>>> e31efde (Staff manage main)
    },
    isUndefined,
  );

  return queryConfig;
}
