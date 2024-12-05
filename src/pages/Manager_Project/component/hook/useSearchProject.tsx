import { createSearchParams, useNavigate } from 'react-router-dom';
import { useProjectQueryConfig } from '../../../../hooks/useQueryConfig';
import { projectSchema, ProjectSchema } from '../../../../util/rules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import path from '../../../../constant/path';

type FormData = Pick<ProjectSchema, 'SearchTerm'>;
const nameSchema = projectSchema.pick(['SearchTerm']);

export default function useSearchProject() {
  const queryConfig = useProjectQueryConfig();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      SearchTerm: '',
    },
    resolver: yupResolver(nameSchema),
  });

  const onSubmitSearch = handleSubmit((data) => {
    const config = {
      ...queryConfig,
      SearchTerm: data.SearchTerm,
    };
    navigate({
      pathname: path.manager_project_management,
      search: createSearchParams(config).toString(),
    });
  });

  return { register, onSubmitSearch };
}
