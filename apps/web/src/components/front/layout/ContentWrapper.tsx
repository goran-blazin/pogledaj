import {ReactElement} from 'react';

type ContentWrapperTypes = {
  children: ReactElement;
  padding?: boolean;
};

function ContentWrapper({children, padding}: ContentWrapperTypes) {
  return <div className={`content-wrapper${padding ? ' inner-padding' : ''}`}>{children}</div>;
}

export default ContentWrapper;
