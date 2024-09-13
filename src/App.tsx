import './App.module.css'
import CardsContainer from './components/cardsContainer'
import Layout from './components/layout'
import Navbar from './components/navbar'

function App() {
  return (
    <Layout>
      <Navbar />
      {/* <h1>aca va cards container</h1> */}
      <CardsContainer/>
    </Layout>
  )
}

export default App
