import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { Note, Home, Input } from "./pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true, //default page at /
                element: <Home />
            },
            {
                path: 'note/input',
                element: <Input />
            },
            {
                path: 'note/:noteId',  //dynamic route for specific notes
                element: <Note />
            },
        ],
    },
]);