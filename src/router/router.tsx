import {
  LoaderFunctionArgs,
  createBrowserRouter,
  redirect
} from 'react-router-dom'
import App from '@/App'
import Login from '@/pages/Login'
import Error from '@/pages/Erros'
import { get } from '@/util/local'

const loginAction = async ({ request }: LoaderFunctionArgs) => {
  const data = await request.formData()
  console.log(data)
}

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    loader: async () => {
      // auth for login
      if (get('sessionId') == null) {
        return redirect('/login')
      }
    }
    // children: [
    //   {
    //     path: 'login',
    //     action: loginAction,
    //     loader: loginLoader,
    //     element: <Login />
    //   }
    // ]
  },
  {
    path: 'login',
    action: loginAction,
    element: <Login />
  }
])

export default AppRouter
