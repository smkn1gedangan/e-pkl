import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <div
            style={{ background: "url(./header2.avif)" }}
            className="flex justify-center items-center min-h-screen w-full"
        >
            <Head title="Forgot Password" />

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
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-2 mt-4 text-center">
                        {status}
                    </div>
                )}
                <div className="mb-4 text-sm text-gray-50 p-4 text-center">
                    Lupa kata sandi? Tidak masalah. Cukup beri tahu kami alamat
                    email Anda dan kami akan mengirimkan tautan untuk menyetel
                    ulang kata sandi yang akan memungkinkan Anda memilih kata
                    sandi baru.
                </div>
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg ">
                    <form onSubmit={submit}>
                        <InputLabel value={"Email"} className="text-white" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2 bg-red-50 p-1 text-center" />

                        <div className="mt-4 flex items-center justify-end">
                            <PrimaryButton
                                className="ms-4 bg-gradient-to-br from-emerald-700 to-sky-700  hover:bg-emerald-800 border border-white focus:border-emerald-400"
                                disabled={processing}
                            >
                                Email Password Reset Link
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
