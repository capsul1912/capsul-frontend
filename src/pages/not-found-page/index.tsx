import { CompassIcon, HomeIcon2, MicroscopeIcon, NavigationIcon, SearchIcon2 } from "@/shared/icons"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
  // Helper Hooks
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#f0f1f2] px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative mx-auto text-center">
        <div className="-ml-20 -mt-20 absolute top-0 left-0">
          <MicroscopeIcon className="h-20 w-20 text-muted-foreground opacity-20" />
        </div>
        <div className="-mb-20 -mr-20 absolute right-0 bottom-0">
          <CompassIcon className="h-20 w-20 text-muted-foreground opacity-20" />
        </div>
        <div className="inline-flex items-center justify-center rounded-full bg-primary p-4">
          <SearchIcon2 className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="mt-6 font-bold text-3xl text-foreground tracking-tight sm:text-4xl">{t("page-not-found-text")}</h1>
        <p className="mt-4 text-muted-foreground">{t("page-not-found-description")}</p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            {t("go-to-main-page")}
          </Link>
          <HomeIcon2 className="h-8 w-8 text-muted-foreground" />
          <NavigationIcon className="h-10 w-10 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
