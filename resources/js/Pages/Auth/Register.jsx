import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Alert } from "@/Helpers/Alert";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
    const { jurusans, tahunAjarans, auth, siswa } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        nisn: siswa?.nisn ?? "",
        email: "",
        kontak: "",
        jurusan_id: "",
        tahunAjaran_id: "",
        "g-recaptcha-response": "",
        password: "",
        password_confirmation: "",
    });
    const [checked, setChecked] = useState(false);
    const submit = (e) => {
        e.preventDefault();

        post(route("register.store"), {
            onSuccess: (sccs) => {
                if (sccs.props.auth.flash?.success) {
                    Alert(`${sccs.props.auth.flash?.success}`,"success",5000);
                    reset();
                } else {
                    Alert(`${sccs.props.auth.flash?.error}`, "error", 4000);
                }
            },
        });
    };

    return (
        <div
            style={{ background: "url(/header2.avif)" }}
            className="flex justify-center items-center min-h-screen w-full"
        >
            <Head title="Register" />
            <div className="h-full mt-4 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 w-11/12 ">
                <div className="border-b rounded-b-[150%] h-auto p-2 border-b-black bg-blue-600">
                    <a className="flex w-full justify-center " href="/">
                        <img
                            src="/img/logo.png"
                            className="w-20 h-20 border rounded-full border-black object-cover p-4 bg-white"
                            alt=""
                        />
                    </a>
                </div>
                <div className="w-full mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg">
                    {auth.flash?.success ? (
                        <div
                            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
                            role="alert"
                        >
                            <span className="font-medium lowercase">
                                Registrasi Akun Untuk {siswa.nama} Telah
                                Berhasil!
                            </span>{" "}
                        </div>
                    ) : (
                        ""
                    )}
                    <form className="grid grid-cols-2 gap-2" onSubmit={submit}>
                        <div className="col-span-2 md:col-span-1  space-y-4">
                            <div className="">
                                <InputLabel className="text-white" value={"Nama"} />
                                <select
                                    onChange={(e) =>
                                        setData("nisn", e.target.value)
                                    }
                                    value={data.nisn}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option disabled key={siswa.id} value={siswa.nisn}>
                                        {siswa.nama} | {siswa.nisn}
                                    </option>
                                </select>

                                <InputError
                                    message={errors.nisn}
                                    className="mt-2"
                                />
                            </div>

                            <div className="">
                                <InputLabel
                                    className="text-white"
                                    htmlFor="email"
                                    value="Email"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    className="text-white"
                                    htmlFor="kontak"
                                    value="kontak"
                                />

                                <TextInput
                                    id="kontak"
                                    kontak="kontak"
                                    value={data.kontak}
                                    className="mt-1 block w-full"
                                    autoComplete="kontak"
                                    onChange={(e) =>
                                        setData("kontak", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.kontak}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    className="text-white"
                                    value={"Tahun Ajaran"}
                                />
                                <select
                                    onChange={(e) =>
                                        setData(
                                            "tahunAjaran_id",
                                            e.target.value
                                        )
                                    }
                                    value={data.tahunAjaran_id}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option disabled value="">
                                        Default
                                    </option>

                                    {tahunAjarans?.length > 0 &&
                                        tahunAjarans?.map((ta) => (
                                            <option key={ta.id} value={ta.id}>
                                                {ta.tahun}
                                            </option>
                                        ))}
                                </select>

                                <InputError
                                    message={errors.tahunAjaran_id}
                                    className="mt-2 bg-red-50 text-center p-1 rounded-md inline-block"
                                />
                            </div>
                        </div>
                        <div className="col-span-2 md:col-span-1 space-y-4">
                            <div>
                                <InputLabel
                                    className="text-white"
                                    value={"Jurusan"}
                                />
                                <select
                                    onChange={(e) =>
                                        setData("jurusan_id", e.target.value)
                                    }
                                    value={data.jurusan_id}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option disabled value="">
                                        Default
                                    </option>

                                    {jurusans?.length > 0 &&
                                        jurusans?.map((jurusan) => (
                                            <option
                                                key={jurusan.id}
                                                value={jurusan.id}
                                            >
                                                {jurusan.nama}
                                            </option>
                                        ))}
                                </select>

                                <InputError
                                    message={errors.jurusan_id}
                                    className="mt-2 bg-red-50 text-center p-1 rounded-md inline-block"
                                />
                            </div>
                            <div className="">
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
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="">
                                <InputLabel
                                    className="text-white"
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <ReCAPTCHA
                                className="g-recaptcha mt-5 md:mt-2"
                                onChange={(token) =>
                                    setData("g-recaptcha-response", token)
                                }
                                sitekey={import.meta.env.VITE_SITE_KEY}
                            ></ReCAPTCHA>
                            <InputError
                                message={errors["g-recaptcha-response"]}
                                className="mt-2"
                            />
                            <div className="bg-white p-2 inline-block rounded-md">
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={checked}
                                        onChange={(e) => setChecked(!checked)}
                                    />
                                    <span className="text-slate-900 ms-2 text-sm">
                                        Saya Benar Benar Yakin Bahwa Saya Adalah
                                        Siswa / Siswi Smkn 1 Gedangan
                                    </span>
                                </label>
                            </div>
                            <div className="w-full mt-3 flex justify-end items-center">
                                <Link
                                    href={route("login")}
                                    className="rounded-md text-sm text-gray-50 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Already registered?
                                </Link>

                                <PrimaryButton
                                    className="ms-4 bg-gradient-to-br from-emerald-700 to-sky-700  hover:bg-emerald-800 border border-white focus:border-emerald-400"
                                    disabled={processing || !checked}
                                >
                                    Register
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
