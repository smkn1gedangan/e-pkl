import { Head } from "@inertiajs/react";

export default function NotFound({ status }) {
    const title = {
        404: "404: Page Not Found",
        403: "403: Forbidden",
    }[status];

    const description = {
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    }[status];

    return (
        <div className="space-y-5">
            <Head title="Not Found Page"/>
            <h1 className="text-center font-extrabold text-3xl text-slate-900 mt-4">
                {title}
            </h1>
            <div className="text-center">{description}</div>
            <div className="w-full flex justify-center">
                <a href={route("welcome")} className="text-center">
                    <span className="text-blue-800">kembali</span> ke halaman
                    utama
                </a>
            </div>
        </div>
    );
}
