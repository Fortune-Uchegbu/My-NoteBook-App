import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { Home, Input, ViewNote, NotFound, ErrorElem } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorElem />,
        children: [
            {
                index: true, //default page at /
                element: <Home />
            },{
                path: 'note/:id',  //dynamic route for specific notes
                element: <ViewNote />
            },{
                path: 'note/:id/edit',
                element: <Input choice={'edit'} />
            },{
                path: 'note/new',
                element: <Input choice={'new'} />
            },{
                path: "*",
                element: <NotFound /> //custom 404 element
            }
        ],
    },
]);

export default router;