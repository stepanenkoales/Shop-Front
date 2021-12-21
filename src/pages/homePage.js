import { Link } from 'react-router-dom'
import { routes } from '../config/routes'

export const HomePage = () => {
  return (
    <>
      <div>
        <h1>THIS IS HOMEPAGE</h1>
      </div>

      <div>some information</div>

      <div>
        <p>
          please <Link to={routes.login}>Login</Link>{' '}
        </p>
      </div>
    </>
  )
}
