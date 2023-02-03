import * as React from 'react';
import { createRoot } from 'react-dom/client'; //react 18 
// import { render } from 'react-dom'; //react 17
import App from './App';


// const root = document.getElementById('root'); // <- This is the correct method call for React version 17
// render(
//     <App />,
//   root
// );
const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(<App />);
