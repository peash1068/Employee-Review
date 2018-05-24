import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';


import Layout from './Pages/Layout';

import Login from './Pages/Login';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Login />, document.getElementById('app'));

//ReactDOM.render(<Layout />, document.getElementById('app'));


registerServiceWorker();
