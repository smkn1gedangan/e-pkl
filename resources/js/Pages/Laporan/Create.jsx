import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTypeAjuanTempat } from "@/state/Zustand";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import {
    ArrowLeft,
    ClipboardList,
    Download,
    Plus,
    QuoteIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Form = () => {
    const { auth, laporan, step, siswa } = usePage().props;
    const { data, setData, errors, post, processing, reset, put } = useForm({
        judul: laporan?.judul ?? "",
        user_id: auth.user.id,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("laporan.store"), {
            onSuccess: (sccs) => {
                if (sccs.props.auth?.flash.success) {
                    reset();
                    toast.success(`${sccs.props.auth.flash?.success}`);
                } else {
                    toast.error(`${sccs.props.auth.flash?.error}`);
                }
            },
        });
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        if (laporan !== null) {
            router.delete(route("laporan.destroy", laporan.id), {
                onSuccess: () => {
                    post(route("laporan.store"), {
                        onSuccess: (sccs) => {
                            if (sccs.props.auth?.flash.success) {
                                reset();
                                toast.success(
                                    `${sccs.props.auth.flash?.success}`
                                );
                            } else {
                                toast.error(`${sccs.props.auth.flash?.error}`);
                            }
                        },
                        onError: (e) => {
                            console.log(e);
                        },
                    });
                },
            });
        } else {
            post(route("laporan.store"), {
                onSuccess: (sccs) => {
                    if (sccs.props.auth?.flash.success) {
                        reset();
                        toast.success(`${sccs.props.auth.flash?.success}`);
                    } else {
                        toast.error(`${sccs.props.auth.flash?.error}`);
                    }
                },
                onError: (e) => {
                    console.log(e);
                },
            });
        }
    };
    return (
        <AuthenticatedLayout>
            <Head title="Pengajuan Tempat" />
            <ToastContainer className={`w-96`} />

            <h1 className="text-center text-2xl mt-8 font-medium capitalize text-slate-900">
                {step === null && "Saya Ingin Mengajukan Judul"}
                {step === 1 && "Judul Yang Anda Buat Di Tolak Pembimbing"}
                {step === 2 &&
                    "Tunggu Keputusan Dari Pihak Sekolah / Pembimbing"}
                {step === 3 && "Data Pribadi Saya Selama Magang"}
            </h1>
            <p className="mt-1 text-sm font-normal text-gray-700 text-center">
                {step === null &&
                    "Jika Diterima (accept) Oleh Pembimbing , Anda Akan Berada Di Tahap Selanjutnya"}
            </p>

            <ol className="p-3 overflow-x-auto flex items-center w-full text-sm font-medium text-center text-gray-900 sm:text-base">
                <li
                    className={`${
                        step === null &&
                        "bg-blue-700 px-4 py-1.5 text-white rounded-md"
                    } flex items-center`}
                >
                    <span
                        className={`${
                            step === null &&
                            "rounded-full bg-white text-black w-6 h-6 grid place-content-center"
                        } me-2`}
                    >
                        1
                    </span>
                    Judul
                </li>
                <div className="h-1 border border-b-black w-full mx-4"></div>
                <li
                    className={`${
                        step === 1 &&
                        "bg-blue-700 px-4 py-1.5 text-white rounded-md"
                    } flex items-center`}
                >
                    Revisi
                </li>
                <div className="h-1 border border-b-black w-full mx-4"></div>
                <li
                    className={`${
                        step === 2 &&
                        "bg-blue-700 px-4 py-1.5 text-white rounded-md"
                    } flex items-center`}
                >
                    <span
                        className={`${
                            step === 2 &&
                            "rounded-full bg-white text-black w-6 h-6 grid place-content-center"
                        } me-2`}
                    >
                        2
                    </span>
                    Konfirmasi
                </li>
                <div className="h-1 border border-b-black w-full mx-4"></div>
                <li
                    className={`${
                        step === 3 &&
                        "bg-blue-700 px-4 py-1.5 text-white rounded-md"
                    } flex items-center`}
                >
                    <span
                        className={`${
                            step === 3 &&
                            "rounded-full bg-white text-black w-6 h-6 grid place-content-center"
                        } me-2`}
                    >
                        3
                    </span>
                    Export
                </li>
            </ol>

            {step === null && (
                <>
                    <div className="p-2">
                        <form
                            onSubmit={handleSubmit}
                            className="p-4 md:p-8 space-y-4 grid grid-cols-2"
                        >
                            <div className="col-span-2 md:col-span-1">
                                <InputLabel value={"Judul"} />
                                <TextInput
                                    id="judul"
                                    type="text"
                                    name="judul"
                                    autoComplete="off"
                                    value={data.judul}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("judul", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.judul}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2">
                                {" "}
                                <SecondaryButton
                                    type="submit"
                                    className="gap-2 bg-blue-600 text-white focus:ring-2 focus:ring-blue-500"
                                    disabled={processing}
                                >
                                    <Plus />
                                    <span className="block">
                                        {processing
                                            ? "Proses..."
                                            : "Ajukan Judul"}
                                    </span>
                                </SecondaryButton>
                            </div>
                        </form>{" "}
                    </div>
                </>
            )}
            {step === 1 && (
                <>
                    <div className="p-2">
                        <form
                            onSubmit={handleUpdate}
                            className="p-4 md:p-8 space-y-4 grid grid-cols-2"
                        >
                            <div className="col-span-2 md:col-span-1">
                                <InputLabel value={"Perbarui Judul"} />
                                <TextInput
                                    id="judul"
                                    type="text"
                                    name="judul"
                                    autoComplete="off"
                                    value={data.judul}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("judul", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.judul}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2">
                                {" "}
                                <SecondaryButton
                                    type="submit"
                                    className="gap-2 bg-blue-600 text-white focus:ring-2 focus:ring-blue-500"
                                    disabled={processing}
                                >
                                    <Plus />
                                    <span className="block">
                                        {processing
                                            ? "Proses..."
                                            : "Ajukan Judul Baru"}
                                    </span>
                                </SecondaryButton>
                            </div>
                        </form>{" "}
                    </div>
                </>
            )}
            {step === 3 && (
                <>
                    <table>
                        <tbody>
                            <tr>
                                <td className="text-left py-2 px-4">
                                    Nama Siswa
                                </td>
                                <td className="text-left py-2 px-4">
                                    <div>{siswa?.name}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 px-4">
                                    Judul Laporan
                                </td>
                                <td className="text-left py-2 px-4">
                                    <div>{siswa?.laporan?.judul}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 px-4">Email</td>
                                <td className="text-left py-2 px-4">
                                    <div>{siswa?.email}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 px-4">Kontak</td>
                                <td className="text-left py-2 px-4">
                                    <div>{siswa?.kontak}</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 px-4">
                                    Tempat , Tanggal Lahir
                                </td>
                                <td className="text-left py-2 px-4">
                                    <div>
                                        {siswa?.tempat_lahir},
                                        {siswa?.tanggal_lahir}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 px-4">Jurusan</td>
                                <td className="text-left py-2 px-4">
                                    <div>
                                        {siswa?.jurusan?.nama ?? "Belum Diisi"}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 px-4">
                                    Tahun Ajaran
                                </td>
                                <td className="text-left py-2 px-4">
                                    <div>
                                        {siswa?.tahun_ajaran?.tahun ??
                                            "Belum Diisi"}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 px-4">
                                    Tempat Pkl
                                </td>
                                <td className="text-left py-2 px-4">
                                    <div>
                                        {siswa?.tempat?.nama ?? "Belum Diisi"}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 px-4">
                                    Pembimbing Pkl
                                </td>
                                <td className="text-left py-2 px-4">
                                    <div>
                                        {siswa?.tempat?.user?.name ??
                                            "Belum Diisi"}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 px-4">
                                    Pembimbing Sekolah
                                </td>
                                <td className="text-left py-2 px-4">
                                    <div>
                                        {siswa?.pb_skl?.name ?? "Belum Diisi"}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-6 flex justify-start flex-wrap gap-2">
                        <a
                            href={route("exportFormatlaporan")}
                            className="bg-blue-700 px-4 py-2 rounded-md ms-4 text-white flex justify-center gap-2 max-w-xs"
                        >
                            Export Format Laporan
                            <Download />
                        </a>
                        <a
                            href={route("exportLaporan")}
                            target="_blank"
                            className="bg-blue-700 px-4 py-2 rounded-md ms-4 text-white flex justify-center gap-2 max-w-xs"
                        >
                            Export Laporan
                            <Download />
                        </a>
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
};

export default Form;
