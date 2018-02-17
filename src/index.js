import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';
import IndexRouter from './routes/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <IndexRouter />, document.getElementById("root")
);
registerServiceWorker();
