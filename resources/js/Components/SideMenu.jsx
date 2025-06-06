import { AlertConfirm } from "@/Helpers/Alert";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Book,
    BookCopy,
    Calendar,
    Castle,
    Check,
    CheckCircle2,
    Edit,
    IdCard,
    Image,
    LayoutIcon,
    LogOut,
    User,
    UserPen,
    Users,
} from "lucide-react";
import { useEffect } from "react";

const SideMenu = ({ children, ...props }) => {
    const { auth, ptCount, siswaCount } = usePage().props;
    const routes = [
        {
            id: 1,
            nama: "Dashbaord",
            route: route("dashboard"),
            icon: <LayoutIcon />,
            isLink: true,
            rolePermision: [
                "admin",
                "pembimbing_sekolah",
                "pembimbing_pt",
                "siswa",
            ],
        },
        {
            id: 20,
            nama: "Register User",
            route: route("regis.index"),
            icon: <IdCard />,
            rolePermision: ["admin"],
            isLink: true,
            isAlert: true,
            alert: siswaCount,
        },
        {
            id: 100,
            nama: auth.role === "admin" ? "Ajuan Tempat" : "Ajukan Tempat",
            route:
                auth.role === "admin"
                    ? route("pengajuanTempat.index")
                    : route("pengajuanTempat.create"),
            icon: <CheckCircle2 />,
            rolePermision: ["siswa", "admin"],
            isLink: true,
            isAlert: true,
            alert: auth.role === "admin" ? ptCount : 0,
        },
        {
            id: 25,
            nama: "Slider",
            route: route("gambar.index"),
            icon: <Image />,
            rolePermision: ["admin"],
            isLink: true,
        },
        {
            id: 5,
            nama: "Jurusan",
            route: route("jurusan.index"),
            icon: <Book />,
            rolePermision: ["admin"],
            isLink: true,
        },
        {
            id: 3,
            nama: "Tahun Ajaran",
            route: route("tahunAjaran.index"),
            icon: <Calendar />,
            rolePermision: ["admin"],
            isLink: true,
        },
        {
            id: 4,
            nama: "Tempat Du/Di",
            route: route("tempat.index"),
            icon: <Castle />,
            rolePermision: ["admin"],
            isLink: true,
        },
        {
            id: 2,
            nama: "Pembimbing",
            route: route("pembimbing.index"),
            icon: <UserPen />,
            rolePermision: ["admin"],
            isLink: true,
        },
        {
            id: 10,
            nama: "Siswa",
            route: route("siswa.index"),
            icon: <User />,
            rolePermision: ["admin", "pembimbing_pt", "pembimbing_sekolah","siswa"],
            isLink: true,
        },
        {
            id: 11,
            nama: "Jurnal",
            route: route("rekap.index"),
            icon: <BookCopy />,
            isLink: true,
            rolePermision: [
                "siswa",
                "admin",
                "pembimbing_pt",
                "pembimbing_sekolah",
            ],
        },

        {
            id: 6,
            nama: "Edit Akun",
            route: route("profile.edit"),
            icon: <Edit />,
            isLink: true,
            rolePermision: [
                "siswa",
                "pembimbing_pt",
                "pembimbing_sekolah",
                "admin",
            ],
        },
        {
            id: 7,
            nama: "Logout",
            icon: <LogOut />,
            isLink: false,
        },
    ];
    const handleLogout = (e) => {
        e.preventDefault();

        AlertConfirm(
            "Anda Akan Logout!",
            "warning",

            () => {
                router.post(route("logout"));
            },
            "Ya , Logout"
        );
    };

    return (
        <>
            {routes.map((route) => (
                <li key={route.id}>
                    {route.isLink ? (
                        route.rolePermision?.includes(auth?.role) && (
                            <Link
                                as="button"
                                href={route.route}
                                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-slate-800 hover:bg-stone-300 group"
                            >
                                <span className="">{route.icon}</span>
                                <span className="ms-3 hidden sm:text-xs md:text-base sm:block">
                                    {route.nama}
                                </span>
                                {route.isAlert && route.alert !== 0 && (
                                    <span className="rounded-full w-6 h-6 ms-0 sm:ms-3  bg-red-700 text-white animate-pulse">
                                        {route.alert}
                                    </span>
                                )}
                            </Link>
                        )
                    ) : (
                        <div
                            onClick={handleLogout}
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-slate-800 hover:bg-stone-300 group cursor-pointer"
                        >
                            <span className="">{route.icon}</span>
                            <span className="ms-3 hidden sm:text-xs sm:block md:text-base">
                                {route.nama}
                            </span>
                        </div>
                    )}
                </li>
            ))}
        </>
    );
};

export default SideMenu;
