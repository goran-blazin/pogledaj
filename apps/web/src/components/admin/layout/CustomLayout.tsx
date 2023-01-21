// in src/Layout.js
import {Layout} from 'react-admin';
// import {LayoutProps} from 'ra-ui-materialui/src/layout/Layout';
import {CustomMenu} from './CustomMenu';

// cannot import LayoutProps type due to tsc unable to compile
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CustomLayout = function (props) {
  return <Layout {...props} menu={CustomMenu} />;
};
