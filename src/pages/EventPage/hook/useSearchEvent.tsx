import { createSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { projectSchema, ProjectSchema } from '../../../util/rules';
import { useEventQueryConfig } from '../../../hooks/useQueryConfig';
import path from '../../../constant/path';

type FormData = Pick<ProjectSchema, 'SearchTerm'>;
const nameSchema = projectSchema.pick(['SearchTerm']);

export default function useSearchEventStudent() {
  const queryConfig = useEventQueryConfig();
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
      pathname: path.newFeed,
      search: createSearchParams(config).toString(),
    });
  });

  return { register, onSubmitSearch };
}
