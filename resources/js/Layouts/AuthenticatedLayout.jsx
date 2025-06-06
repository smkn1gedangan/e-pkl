import SideMenu from "@/Components/SideMenu";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { List } from "lucide-react";

export default function AuthenticatedLayout({ children }) {
    const [openSideMenu, setOpenSideMenu] = useState(true);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 640px)");

        setOpenSideMenu(mediaQuery.matches);
        const handler = () => {
            setOpenSideMenu(mediaQuery.matches);
        };
        mediaQuery.addEventListener("change", handler);
        return () => {
            mediaQuery.removeEventListener("change", handler);
        };
    }, []);
    return (
        <div className="p-4 bg-stone-200">
            <button
                aria-controls="default-sidebar"
                type="button"
                onClick={() => setOpenSideMenu(!openSideMenu)}
                className="inline-flex items-center p-2 mt-2 ms-0 sm:ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            >
                <span className="sr-only">Open sidebar</span>
                <List />
            </button>

            <div className="flex gap-2">
                {" "}
                <Transition
                    show={openSideMenu}
                    enter="transition ease-out duration-200"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in duration-200"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                    className={`sm:block z-40 w-16 sm:w-64 min-h-auto transition-transform sm:translate-x-0`}
                    aria-label="Sidebar"
                >
                    <div className="h-full sm:p-3 py-4 overflow-y-auto">
                        <h1 className="text-center font-medium uppercase my-4 invisible sm:visible">
                            Main Menu
                        </h1>{" "}
                        <ul className="space-y-2 font-medium ">
                            <SideMenu />
                        </ul>
                    </div>
                </Transition>
                <div className="p-2 mt-2 min-h-screen rounded-md bg-white w-full shadow-md overflow-x-auto sm:overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}
