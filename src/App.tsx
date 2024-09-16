import CardsContainer from './components/cardsContainer'
import ErrorPage from './components/errorPage';
import Layout from './components/layout'
import Navbar from './components/navbar'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CardsContainer />,
  },
  {
    path: "/trash-bin",
    element: <div>trash-bin</div>,
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);


function App() {
  return (
    <Layout>
      <Navbar />
      <RouterProvider router={router} />
    </Layout>
  )
}

export default App
