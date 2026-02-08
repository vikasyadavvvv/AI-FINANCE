import { Link } from "react-router-dom"
import { PROTECTED_ROUTES } from "@/routes/common/routePath"

const Logo = ({ url }: { url?: string }) => {
  return (
    <Link
      to={url || PROTECTED_ROUTES.OVERVIEW}
      className="flex items-center gap-2"
    >
      <div className="h-20 w-auto overflow-hidden flex items-center mt-10">
        <img
          src="/FinyliticX..png"
          alt="Finlytics X Logo"
          className="h-40 w-auto object-cover"
        />
      </div>
    </Link>
  )
}

export default Logo
