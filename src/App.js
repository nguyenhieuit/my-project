import './App.css';
import Heading from './component/layout/Heading';
import Footer from './component/layout/Footer';
import { useLocation } from 'react-router-dom';
import Menuleft from './component/layout/Menuleft';
import Account from './component/member/Account';
import MyProduct from './component/member/edit_product/MyProduct';
import MenuAcc from './component/layout/MenuAcc';
import { UserContext } from './UserContext';
import { useState } from 'react';
// import Test from './Test';

function App(props) {
  let params1=useLocation();
  // console.log(params1)
  const [context, setContext]=useState()

  return (
    <UserContext.Provider value={[context, setContext]}>
      <Heading/>
      <section>
        <div className='container'>
          <div className='row col-sm-12'>
            <div className='col-sm-3'>
              {params1['pathname'].includes("Account")||params1['pathname'].includes("MyProduct")||params1['pathname'].includes("AddProduct")||params1['pathname'].includes("EditProduct") ? <MenuAcc /> : <Menuleft />}
            </div>
            <div className='col-sm-9 padding-right'>
              {props.children}
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </UserContext.Provider>
  );
}

export default App;
