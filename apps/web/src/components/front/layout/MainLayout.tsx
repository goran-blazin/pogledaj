import {ReactElement} from 'react';
import {styled} from '@mui/material';

type ContentWrapperTypes = {
  children: ReactElement;
};

const MainContentWrapper = styled('div')((theme) => ({
  backgroundColor: theme.theme.mainContentWrapperTheme.backgroundColor,
}));

function MainLayout({children}: ContentWrapperTypes) {
  return <MainContentWrapper className="main-content-wrapper">{children}</MainContentWrapper>;
}

export default MainLayout;
