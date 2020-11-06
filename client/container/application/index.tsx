import React,{
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import Layout from '../../component/layout';

export const GlobalState = createContext({
  hideMenu:  false,
  setHideMenu: (() => {
    /* null */
  }) as Dispatch<SetStateAction<boolean>>,
});

const { Provider } = GlobalState;
export default function({ children, ...rest }: any) {
  console.log(children, rest, 66666);
  const [hideMenu, setHideMenu] = useState(false);
  const value = {
    hideMenu, setHideMenu,
  };
  return (
    <Provider value={value}>
      <Layout {...rest}>
        {children}
      </Layout>
    </Provider>
  );
}