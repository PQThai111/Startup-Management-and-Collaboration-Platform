import { createContext, useContext } from 'react';
import { Project } from '../types/project.type';

export const ProjectContext = createContext<{
  project: Project | undefined;
  isMember: boolean;
}>({
  project: undefined,
  isMember: false,
});

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      'useProjectContext must be used within ProjectContext.Provider',
    );
  }
  return context;
};
