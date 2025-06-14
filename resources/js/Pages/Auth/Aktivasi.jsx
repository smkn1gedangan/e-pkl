import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import TitleModal from "@/Components/TitleModal";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Aktivasi() {
    const { auth } = usePage().props;
    const [panduan, setPanduan] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        nisn: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("aktivasi"), {
            onSuccess: () => {
                reset();
            },
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
                        <div className="">
                            <InputLabel
                                className="text-white"
                                htmlFor="nisn"
                                value="Nomor Aktivasi Akun"
                            />

                            <TextInput
                                id="nisn"
                                type="text"
                                name="nisn"
                                value={data.nisn}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("nisn", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.nisn}
                                className="mt-2 bg-red-50 text-center p-1 rounded-md inline-block"
                            />
                        </div>
                        <div className="mt-4 block">
                            <label className="flex items-center">
                                <p className="rounded-md text-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    have an account?{" "}
                                    <Link
                                        className="text-white hover:text-gray-900 underline"
                                        href={route("login")}
                                    >
                                        Login
                                    </Link>
                                </p>
                            </label>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <label className="flex items-center">
                                <div
                                    onClick={() => setPanduan(!panduan)}
                                    className="inline-flex items-center rounded-md border border-transparent  px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out bg-black hover:bg-gray-700 focus:bg-gray-700  text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                >
                                    Panduan
                                </div>
                            </label>
                            <PrimaryButton
                                className="ms-4 bg-gradient-to-br from-emerald-700 to-sky-700  hover:bg-emerald-800 border border-white focus:border-emerald-400"
                                disabled={processing}
                            >
                                Aktivasi Akun
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <Modal show={panduan} onClose={() => setPanduan(!panduan)}>
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <TitleModal
                        icon={<X />}
                        title={"Panduan Aktivasi Akun"}
                        onClick={() => {
                            setPanduan(!panduan);
                        }}
                    ></TitleModal>
                    <div className="p-4 text-slate-900">
                        <p className="lowercase">
                            Untuk menjaga keamanan dan validitas data, aktivasi
                            akun diperlukan agar pihak pengembang atau admin
                            sekolah dapat memastikan bahwa pengguna yang
                            mendaftar benar-benar merupakan siswa aktif SMKN 1
                            Gedangan.
                        </p>
                        <p className="font-bold">
                            Contoh Aktivasi (no induk + no jurusan)
                        </p>
                        <p>Jika kamu memiliki no induk = 1201</p>
                        <p>dan memiliki no induk = 0001.001</p>

                        <p className="font-bold">
                            Maka Penulisan Aktivasi Adalah 12010001.001
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
