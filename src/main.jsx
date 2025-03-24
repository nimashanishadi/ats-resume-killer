import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import BlogPage from './pages/BlogPage.jsx';
import Contact from './pages/Contact.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ScanResult from './pages/ScanResult.jsx';
import UserOutput from './Components/Customeroutput/UserOutput/UserOutput.jsx';
import { Provider } from 'react-redux';  // Import Provider
import Store from './store/store';  // Import the store
import Pricing from "./../src/Components/pricing/pricing.jsx";

// Set up your router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/scanresult",
    element: <ScanResult />,
  },
  {
    path: "/user-output",
    element: <UserOutput />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
]);

// Wrap the RouterProvider with the Provider to make Redux store available
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>  {/* Wrap RouterProvider with Provider */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
