import {ReactElement} from 'react';
import {styled} from '@mui/material';

type ContentWrapperTypes = {
  children: ReactElement;
};

const CenterContentWrap = styled('div')((theme) => ({
  maxWidth: '1600px',
  minHeight: '100vh',
  margin: '0 auto',
  position: 'relative',
  backgroundColor: theme.theme.mainContentWrapperTheme.backgroundColor,
  // border: `1px solid ${theme.theme.mainContentWrapperTheme.borderColor}`,
}));

function CenterContent({children}: ContentWrapperTypes) {
  return <CenterContentWrap className="main-content-wrapper">{children}</CenterContentWrap>;
}

export default CenterContent;
