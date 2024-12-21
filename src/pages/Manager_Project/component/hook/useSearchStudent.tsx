import { createSearchParams, useNavigate } from 'react-router-dom';
import { useStudentQueryConfig } from '../../../../hooks/useQueryConfig';
import { projectSchema, ProjectSchema } from '../../../../util/rules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import path from '../../../../constant/path';

type FormData = Pick<ProjectSchema, 'SearchTerm'>;
const nameSchema = projectSchema.pick(['SearchTerm']);

export default function useSearchStudent() {
  const queryConfig = useStudentQueryConfig();
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
      pathname: path.all_management,
      search: createSearchParams(config).toString(),
    });
  });

  return { register, onSubmitSearch };
}
