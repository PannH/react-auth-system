import useCookie from '../hooks/useCookie';
import '../styles/Home.css';

function Home() {

   // Cookie hooks
   const usernameCookie = useCookie('user_username');
   const passwordCookie = useCookie('user_password');

   const isLoggedIn = !!usernameCookie.value && !!passwordCookie.value;

   // JSX
   return (
      <main className='home'>
         <div className='container'>
            <div className='greetings'>
               <h1>👋 Hello, there!</h1>
               { isLoggedIn
                  ? <h2>You are connected as <span className='username'>@{usernameCookie.value}</span>.</h2>
                  : <h2>You are not connected yet.</h2> }
            </div>
            { isLoggedIn
               ? <div className='button-container'><button>Sign out</button></div>
               : <div className='button-container'><button>Register</button><button>Log in</button></div> }
         </div>
      </main>
   )

}

export default Home;