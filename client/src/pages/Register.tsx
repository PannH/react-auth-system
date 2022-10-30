import RegisterForm from "../components/RegisterForm";
import {
   QueryClient,
   QueryClientProvider
} from 'react-query'
import '../styles/Register.css'

function Register() {

   const queryClient = new QueryClient();

   return (
      <QueryClientProvider client={queryClient}>
         <main>
            <RegisterForm/>
         </main>
      </QueryClientProvider>
   )

}

export default Register;