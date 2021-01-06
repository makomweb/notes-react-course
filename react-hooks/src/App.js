import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';

const App = props => {
  const context = useContext(AuthContext);
  return context.isAuth ? <Ingredients /> : <Auth />;
};

export default App;
