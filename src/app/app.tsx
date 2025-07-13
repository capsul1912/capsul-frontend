import { useRoutes } from "react-router-dom"
import { routes } from "./routes"

export const App: React.FC = () => {
  // useClerkAxiosInterceptor()
  return <div>{useRoutes(routes)}</div>
}
