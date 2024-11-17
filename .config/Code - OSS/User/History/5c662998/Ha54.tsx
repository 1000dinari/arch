import { Button, Container, Stack } from '@chakra-ui/react'
import Navbar from './components/Navbar'

function App() {

  return (
    <Stack h="100vh">
      <Navbar />
      <Container>
        {/* <TodoForm />
        <TodoList /> */}
      </Container>
    </Stack>
  )
}

export default App
