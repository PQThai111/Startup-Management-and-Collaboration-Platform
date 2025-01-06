import { createContext, useContext } from 'react';
import { Student } from '../types/student.type';

export const ProfileContext = createContext<{
  profile: Student | undefined;
}>({
  profile: undefined,
});

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error(
      'useProfileContext must be used within ProfileContext.Provider',
    );
  }
  return context;
};
