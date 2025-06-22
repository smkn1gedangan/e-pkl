import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };
    
    return (
        <div
            style={{ background: "url(./header2.avif)" }}
            className="flex justify-center items-center min-h-screen w-full"
        >
            {" "}
            <Head title="Log in" />
            <div className="h-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 w-11/12 sm:w-3/4 md:w-1/2 max-w-sm ">
                <div className="border-b rounded-b-[150%] h-auto p-2 border-b-black bg-blue-600">
                    <a className="flex w-full justify-center " href="/">
                        <img
                            src="../img/logo.png"
                            className="w-20 h-20 border rounded-full border-black object-cover p-4 bg-white"
                            alt=""
                        />
                    </a>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg ">
                    {auth?.flash?.error ? (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                            role="alert"
                        >
                            <span className="font-medium lowercase">
                                Gagal!
                            </span>{" "}
                            {auth?.flash?.error}
                        </div>
                    ) : (
                        ""
                    )}
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel
                                htmlFor="email"
                                className="text-white"
                                value="Email"
                            />

                            <TextInput
                                id="email"
                                type="text"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2 bg-red-50 text-center p-1 rounded-md inline-block"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                className="text-white"
                                htmlFor="password"
                                value="Password"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2 bg-red-50 text-center p-1 rounded-md inline-block"
                            />
                        </div>

                        <div className="mt-4 block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="text-white ms-2 text-sm">
                                    Remember me
                                </span>
                            </label>
                        </div>
                        <div className="mt-4 block">
                            <label className="flex items-center">
                                <p className="rounded-md text-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Don't have an account?{" "}
                                    <Link
                                        className="text-white hover:text-gray-900 underline"
                                        href={route("aktivasi")}
                                    >
                                        register
                                    </Link>
                                </p>
                            </label>
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="rounded-md text-sm text-gray-50 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <PrimaryButton
                                className="ms-4 bg-gradient-to-br from-emerald-700 to-sky-700  hover:bg-emerald-800 border border-white focus:border-emerald-400"
                                disabled={processing}
                            >
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
