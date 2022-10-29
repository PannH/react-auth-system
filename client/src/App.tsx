import './styles/App.css'
import RegisterForm from './components/RegisterForm'
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {

   const queryClient = new QueryClient();

   return (
      <QueryClientProvider client={queryClient}>
         <main>
            <RegisterForm/>
         </main>
      </QueryClientProvider>
   )

}

export default App
