import react from 'react';
import ReactDom from 'react-dom';

console.log('这是内部上下文');
ReactDom.render(React.createElement('div', null, 'main'), document.getElementById('main'));