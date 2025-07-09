import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Edit, Plus, Trash, X } from "lucide-react";
import Pagination from "@/Components/Pagination";
import { Alert, AlertConfirm } from "@/Helpers/Alert";
import Table from "@/Components/Table";
import TitlePage from "@/Components/TitlePage";
import { toast, ToastContainer } from "react-toastify";
const Index = () => {
    const { pengajuanTempats } = usePage().props;
    const handleDelete = (e, id, nama) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Menolak Usulan Tempat Dari ${nama}`;
        const cb = () =>
            router.delete(route("pengajuanTempat.destroy", id), {
                onSuccess: (sccs) => {
                    toast.success(`${sccs.props.auth.flash?.success}`);
                },
            });
        AlertConfirm(text, "warning", cb, "Ya , Tolak!");
    };
    const handleAccept = (e, id) => {
        e.preventDefault();
        const filtered = pengajuanTempats.data.find((pt) => pt.id === id);
        if (filtered) {
            const datas = {
                ...filtered,
                pembimbing_id: "",
            };
            const text = `Jika Disetujui , Tempat Du/Di akan Otomatis Terdaftar Dan User Akan Otomatis Ditempatkan Di Pt Tersebut.`;
            AlertConfirm(
                text,
                "question",
                () => {
                    router.put(route("pengajuanTempat.update", id), datas, {
                        onSuccess: (sccs) => {
                            if (sccs.props.auth.flash?.success) {
                                toast.success(
                                    `${sccs.props.auth.flash?.success}`
                                );
                            } else {
                                toast.error(`${sccs.props.auth.flash?.error}`);
                            }
                        },
                    });
                },
                "Ya Terima"
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pengajuan tempat" />
            <ToastContainer className={`w-96`} />

            <TitlePage
                quote={"list tempat yang diajukan oleh siswa "}
                title={"Pengajuan Tempat"}
            ></TitlePage>
            <div className="p-2">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table
                        headers={[
                            { nama: "#" },
                            { nama: "Nama Pemohon" },
                            { nama: "Kontak Pemohon" },
                            { nama: "Nama PT" },
                            { nama: "Kontak" },
                            { nama: "Bidang Usaha" },
                            { nama: "Lokasi" },
                            { nama: "Alasan" },
                            { nama: "Opsi" },
                        ]}
                    >
                        <tbody>
                            {pengajuanTempats.data.length > 0 ? (
                                pengajuanTempats.data.map((pt, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b  border-gray-200"
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + pengajuanTempats.from}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            {pt.user.name}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {pt.user.kontak}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {pt.nama}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {pt.kontak}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {pt.bidang_usaha}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {pt.lokasi}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {pt.alasan}
                                        </td>

                                        <td className="px-4 text-center py-4 ">
                                            <div className="flex justify-center gap-2">
                                                {" "}
                                                <div
                                                    onClick={(e) =>
                                                        handleAccept(e, pt.id)
                                                    }
                                                    className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                                >
                                                    <Edit />
                                                </div>
                                                <div
                                                    onClick={(e) =>
                                                        handleDelete(
                                                            e,
                                                            pt.id,
                                                            pt.user.name
                                                        )
                                                    }
                                                    className="font-medium text-red-800 hover:text-red-700 transition-all cursor-pointer"
                                                >
                                                    <Trash />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="p-2 text-sm font-medium text-center"
                                        colSpan={7}
                                    >
                                        Tidak ada Pengajuan Tempat Di tambahkan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                {pengajuanTempats.data.length > 0 && (
                    <Pagination datas={pengajuanTempats}></Pagination>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
