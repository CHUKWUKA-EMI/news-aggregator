import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { Provider } from 'react-redux';
import { store } from './state/store';
import NewsFeed from './components/Articles/NewsFeed';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <NewsFeed /> }]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    {process.env.NODE_ENV === 'development' ? (
      <>
        <RouterProvider router={router} />
        <Tooltip className="!bg-black" place="right" id="nav-tooltip" />
      </>
    ) : (
      <React.StrictMode>
        <RouterProvider router={router} />
        <Tooltip className="!bg-black" place="right" id="nav-tooltip" />
      </React.StrictMode>
    )}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
