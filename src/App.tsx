import Content from './containers/Content'
import Header from './containers/Header'
import ConcreteCalculator from './screens/ConcreteCalculator'

export default function App() {
  return (
    <>
      <Header />
      <Content>
        <ConcreteCalculator />
      </Content>
    </>
  )
}
