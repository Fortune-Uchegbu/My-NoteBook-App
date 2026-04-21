import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { Note, Home } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true, //default page at /
                element: <Home />
            },
            {
                path: 'note/:id',  //dynamic route for specific notes
                element: <Note />,
                children: [
                    {
                        index: true, //default page at note/:id
                        element: <Note choice = {'view'} />
                    },
                    {
                        path: 'edit', //edit note
                        element: <Note choice={'edit'} />
                    },
                    {
                        path: 'new', //create new note
                        element: <Note choice={'new'} />
                    }
                ],
            },
        ],
    },
]);

export default router;