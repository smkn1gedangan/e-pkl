import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";
import TitlePage from "@/Components/TitlePage";
import { Alert } from "@/Helpers/Alert";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTypeAjuanTempat } from "@/state/Zustand";
import { Head, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, ClipboardList, Plus, QuoteIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Form = () => {
    const { auth, tempats, pengajuanTempats } = usePage().props;
    const { type, setType } = useTypeAjuanTempat();
    const { data, setData, errors, post, processing, reset, put } = useForm({
        nama: "",
        kontak: "",
        bidang_usaha: "",
        alasan: "",
        lokasi: "",
        user_id: auth.user.id,
        is: type,
        checked: false,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pengajuanTempat.store"), {
            onSuccess: (sccs) => {
                if (sccs.props.auth?.flash.success) {
                    reset();
                    Alert(`${sccs.props.auth?.flash.success}`);
                } else {
                    Alert(`${sccs.props.auth.flash?.error}`, "error", 4000);
                }
            },
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="Pengajuan Tempat" />
            {pengajuanTempats.some((p) => p.user_id === auth.user.id) ? (
                <h1 className="text-center text-2xl mt-8 font-medium capitalize text-slate-900">
                    Anda Telah Mengajukan Tempat Magang, Tunggu Keputusan Dari
                    Pihak Sekolah , Jika Diterima , Pihak Sekolah Akan
                    Menghubungi Anda Melalui No Wa / Secara Langsung
                </h1>
            ) : (
                <>
                    <h1 className="text-center text-2xl mt-8 font-medium capitalize text-slate-900">
                        Saya Ingin Mengajukan Tempat Magang
                    </h1>
                    <p className="mt-1 text-sm font-normal text-gray-700 text-center">
                        Anda Bisa Memilih Antara Memilih Tempat Yang Di Sediakan
                        Oleh Sekolah Atau Buat Data Sendiri
                    </p>
                    <div className="gap-2 flex justify-center mt-4">
                        <SecondaryButton
                            onClick={() => setType("siswa")}
                            className={`${
                                type === "siswa" &&
                                "bg-blue-700 hover:bg-blue-500 focus:border-white focus:bg-blue-700 active:bg-blue-400 text-white"
                            } `}
                        >
                            Buat Sendiri
                        </SecondaryButton>
                        <SecondaryButton
                            onClick={() => setType("sekolah")}
                            className={`${
                                type === "sekolah" &&
                                "bg-blue-700 hover:bg-blue-500 focus:border-white focus:bg-blue-700 active:bg-blue-400 text-white"
                            } `}
                        >
                            Dari Sekolah
                        </SecondaryButton>
                    </div>
                    <div className="p-2">
                        {" "}
                        <form onSubmit={handleSubmit} className="p-4 md:p-8">
                            {type === "sekolah" && (
                                <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2 p-2">
                                    <div className="col-span-1 space-y-3">
                                        <div className="">
                                            {" "}
                                            <InputLabel value={"Nama Tempat"} />
                                            <select
                                                onChange={(e) => {
                                                    const nama = e.target.value;
                                                    const selectInput =
                                                        tempats.find(
                                                            (tp) =>
                                                                tp.nama === nama
                                                        );
                                                    if (selectInput) {
                                                        const select = {
                                                            ...selectInput,
                                                            user_id:
                                                                data.user_id,
                                                            alasan: data.alasan,
                                                        };
                                                        setData(select);
                                                    } else {
                                                        setData("alasan", "");
                                                        setData(
                                                            "bidang_usaha",
                                                            ""
                                                        );
                                                        setData("kontak", "");
                                                        setData("lokasi", "");
                                                    }
                                                }}
                                                value={data.nama}
                                                id="nama"
                                                name="nama"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 mt-1 "
                                            >
                                                <option value="">
                                                    Tidak Dipilih
                                                </option>
                                                {tempats.length > 0 &&
                                                    tempats.map((tempat) => (
                                                        <option
                                                            key={tempat.id}
                                                            value={tempat.nama}
                                                        >
                                                            {tempat.nama} -{" "}
                                                            {
                                                                tempat.bidang_usaha
                                                            }
                                                            -{" "}
                                                            {tempat.lokasi ??
                                                                "Lokasi Belum Ditambahkan"}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <InputLabel value={"Alasan"} />
                                        <Textarea
                                            id="alasan"
                                            type="text"
                                            name="alasan"
                                            value={data.alasan}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "alasan",
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Uraikan Alasan Kamu Kesana`}
                                        ></Textarea>
                                        <InputError
                                            message={errors.alasan}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            )}
                            {type === "siswa" && (
                                <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2 p-2">
                                    <div className="col-span-1 space-y-3">
                                        <div className="">
                                            <InputLabel
                                                value={
                                                    "Nama Tempat / Pt / Usaha"
                                                }
                                            />
                                            <TextInput
                                                id="nama"
                                                type="text"
                                                name="nama"
                                                value={data.nama}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "nama",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.nama}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="">
                                            <InputLabel value={" Kontak Pt"} />
                                            <TextInput
                                                id="kontak"
                                                type="text"
                                                name="kontak"
                                                value={data.kontak}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "kontak",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.kontak}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1 space-y-3">
                                        <div className="">
                                            <InputLabel
                                                value={"Bidang Usaha"}
                                            />
                                            <TextInput
                                                id="bidang_usaha"
                                                type="text"
                                                name="bidang_usaha"
                                                value={data.bidang_usaha}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "bidang_usaha",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.bidang_usaha}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="">
                                            <InputLabel
                                                value={"Lokasi Tempat Magang"}
                                            />
                                            <TextInput
                                                id="lokasi"
                                                type="text"
                                                name="lokasi"
                                                value={data.lokasi}
                                                className="mt-1 block w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "lokasi",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.lokasi}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <InputLabel value={"Alasan"} />
                                        <Textarea
                                            id="alasan"
                                            type="text"
                                            name="alasan"
                                            value={data.alasan}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "alasan",
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Uraikan Alasan Kamu Kesana`}
                                        ></Textarea>
                                        <InputError
                                            message={errors.alasan}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="p-2 space-y-4">
                                <div className="mt-4 block">
                                    <label className="flex items-center">
                                        <Checkbox
                                            checked={data.checked}
                                            onChange={(e) =>
                                                setData(
                                                    "checked",
                                                    !data.checked
                                                )
                                            }
                                        />
                                        <span className="text-slate-900 ms-2 text-sm">
                                            Saya Benar Benar Yakin Bahwa Tempat
                                            Tersebut Memang Cocok Untuk Saya Dan
                                            Saya Akan Menanggung Resiko Apapun
                                            Di Tempat Tersebut
                                        </span>
                                    </label>
                                </div>
                                <div className="col-span-2">
                                    {" "}
                                    <PrimaryButton
                                        type="submit"
                                        className="gap-2"
                                        disabled={(processing, !data.checked)}
                                    >
                                        <Plus />
                                        <span className="hidden sm:block">
                                            {processing
                                                ? "Proses..."
                                                : "Ajukan Tempat"}
                                        </span>
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>{" "}
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
};

export default Form;
