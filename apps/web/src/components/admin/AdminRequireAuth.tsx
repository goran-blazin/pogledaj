import React, {FC} from 'react';
import LoginWrapper from './adminAuth/LoginWrapper';

const AdminRequireAuth: FC<{children: React.ReactElement}> = ({children}) => {
  // const userIsLogged = useLoginStatus(); // Your hook to get login status
  const userIsLogged = false;

  if (!userIsLogged) {
    return <LoginWrapper />;
  } else {
    return children;
  }
};

export default AdminRequireAuth;
