import { useRouteError, isRouteErrorResponse } from "react-router-dom"

export const ErrorElem = () => {
    const error = useRouteError();
    if(isRouteErrorResponse(error) && error.status === 404) {
        return (
            <div className="text-center">
                <p>Sorry! Page not found.</p>
                <p>Please check if you entered the right url.</p>
            </div>
        )
    }
  return (
    <div className="h-dvh flex items-center justify-center">
        <p>Sorry! Something went wrong in the app. Please reload.</p>
    </div>
  )
}
