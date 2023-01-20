// in src/Layout.js
import {Layout} from 'react-admin';
import {LayoutProps} from 'ra-ui-materialui/src/layout/Layout';
import {CustomMenu} from './CustomMenu';

export const CustomLayout = function (props: LayoutProps) {
  return <Layout {...props} menu={CustomMenu} />;
};
