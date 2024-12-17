import { createSearchParams, useNavigate } from 'react-router-dom';
import { useEventQueryConfig } from '../../../hooks/useQueryConfig';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import path from '../../../constant/path';
import { projectSchema, ProjectSchema } from '../../../util/rules';

type FormData = Pick<ProjectSchema, 'EventTypes' | 'IsMandatory'>;
const nameSchema = projectSchema.pick(['EventTypes', 'IsMandatory']);

export function useFilterEventStudent() {
  const queryConfig = useEventQueryConfig();
  console.log(queryConfig);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      EventTypes: [],
      IsMandatory: '',
    },
    resolver: yupResolver(nameSchema),
  });

  console.log(errors);

  const onSubmitFilter = handleSubmit((data) => {
    const config = {
      ...queryConfig,
      IsMandatory: data.IsMandatory,
      EventTypes: data.EventTypes,
    };
    navigate({
      pathname: path.newFeed,
      search: createSearchParams(config).toString(),
    });
  });

  return { register, onSubmitFilter };
}
