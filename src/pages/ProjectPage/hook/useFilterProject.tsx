import { createSearchParams, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import path from '../../../constant/path';
import { projectSchema, ProjectSchema } from '../../../util/rules';
import { useProjectQueryConfig } from '../../../hooks/useQueryConfig';

type FormData = Pick<ProjectSchema, 'projectCategories'>;
const nameSchema = projectSchema.pick(['projectCategories']);

export function useFilterProjectStudent() {
  const queryConfig = useProjectQueryConfig();

  console.log(queryConfig);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      projectCategories: [],
    },
    resolver: yupResolver(nameSchema),
  });

  console.log(errors);

  const onSubmitFilter = handleSubmit((data) => {
    const config = {
      ...queryConfig,
      projectCategories: data.projectCategories,
    };
    navigate({
      pathname: path.project,
      search: createSearchParams(config).toString(),
    });
  });

  return { register, onSubmitFilter };
}
