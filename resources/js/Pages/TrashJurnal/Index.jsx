import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TitlePage from "@/Components/TitlePage";
import Modal from "@/Components/Modal";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ArchiveRestore, Edit, Plus, Trash, X } from "lucide-react";
import Pagination from "@/Components/Pagination";
import TitleModal from "@/Components/TitleModal";
import { Alert, AlertConfirm } from "@/Helpers/Alert";
import Table from "@/Components/Table";
import { toast, ToastContainer } from "react-toastify";
const Index = () => {
    const { trasheds } = usePage().props;
    const [resizeImg, setResizeImg] = useState(null);
    const handleDelete = (e, id) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Menghapus Jurnal Secara Permanent`;
        const cb = () =>
            router.delete(route("trashJurnal.destroy", id), {
                onSuccess: (sccs) => {
                    toast.success(`${sccs.props.auth.flash?.success}`);
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleRestore = (e, id) => {
        e.preventDefault();
        router.put(
            route("trashJurnal.update", id),
            {},
            {
                onSuccess: (sccs) => {
                    if (sccs.props.auth.flash?.success) {
                        toast.success(`${sccs.props.auth.flash?.success}`);
                    } else {
                        toast.error(`${sccs.props.auth.flash?.error}`);
                    }
                },
            }
        );
    };
    const handleResizeImg = (e, id) => {
        e.preventDefault();
        const filtered = jurnals.data.find((j) => j.id === id);
        if (filtered) {
            setResizeImg(filtered);
        }
    };
    return (
        <AuthenticatedLayout>
            <Head title="trash Jurnal" />
            <ToastContainer className={`w-96`} />

            <TitlePage
                quote={"list jurnal yang baru saja di hapus bisa di restore disini"}
                title={"Jurnal Dihapus"}
            ></TitlePage>
            <div className="p-2">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table
                        headers={[
                            { nama: "#" },
                            { nama: "Dibuat Pada" },
                            { nama: "Kegiatan" },
                            { nama: "Keterangan" },
                            { nama: "Photo" },
                            { nama: "Dihapus Pada" },
                            { nama: "Opsi" },
                        ]}
                    >
                        <tbody>
                            {trasheds.data.length > 0 ? (
                                trasheds.data.map((ts, index) => (
                                    <tr key={index} className={`border`}>
                                        <td className="px-4 text-center py-4">
                                            {index + trasheds.from}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            {(() => {
                                                const date = new Date(
                                                    ts.created_at
                                                );

                                                const day = String(
                                                    date.getDate()
                                                ).padStart(2, "0");
                                                const month = String(
                                                    date.getMonth() + 1
                                                ).padStart(2, "0");
                                                const year = date.getFullYear();
                                                return `${day}-${month}-${year}`;
                                            })()}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {ts.kegiatan}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {ts.keterangan === "hadir" && (
                                                <span className="bg-green-100 text-green-800 text-sm font-medium ring-2 me-2 px-2.5 py-0.5 rounded-md ring-green-500">
                                                    {ts.keterangan}
                                                </span>
                                            )}
                                            {ts.keterangan === "sakit" && (
                                                <span className="bg-blue-100 text-blue-800 text-sm font-medium ring-2 me-2 px-2.5 py-0.5 rounded-md ring-blue-500">
                                                    {ts.keterangan}
                                                </span>
                                            )}
                                            {ts.keterangan === "izin" && (
                                                <span className="bg-red-100 text-red-800 text-sm font-medium ring-2 ring-red-500 me-2 px-2.5 py-0.5 rounded-md">
                                                    {ts.keterangan}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            <div className="flex justify-center items-center">
                                                <img
                                                    onClick={(e) =>
                                                        handleResizeImg(
                                                            e,
                                                            jurnal.id
                                                        )
                                                    }
                                                    loading="lazy"
                                                    className="w-12 rounded-md h-12 object-cover object-center"
                                                    src={`./storage/${ts.photo}`}
                                                    alt="jurnal Photo"
                                                />
                                                <Modal
                                                    show={
                                                        resizeImg?.id === ts.id
                                                    }
                                                    onClose={() =>
                                                        setResizeImg(null)
                                                    }
                                                    maxWidth="md"
                                                >
                                                    <div className="rounded-lg bg-white shadow-sm">
                                                        <TitleModal
                                                            icon={<X />}
                                                            title={
                                                                "Detail Foto"
                                                            }
                                                            onClick={() => {
                                                                setResizeImg(
                                                                    null
                                                                );
                                                            }}
                                                        ></TitleModal>
                                                        <div className="p-6 flex justify-center">
                                                            <img
                                                                className="max-w-xs md:max-w-sm p-2 rounded-md h-auto object-cover object-center"
                                                                src={`./storage/${ts.photo}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {(() => {
                                                const date = new Date(
                                                    ts.deleted_at
                                                );
                                                const day = String(
                                                    date.getDate()
                                                ).padStart(2, "0");
                                                const month = String(
                                                    date.getMonth() + 1
                                                ).padStart(2, "0");
                                                const years =
                                                    date.getFullYear();
                                                return `${day}-${month}-${years}`;
                                            })()}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            <div className="flex justify-center item-center gap-2">
                                                <div
                                                    onClick={(e) =>
                                                        handleRestore(e, ts.id)
                                                    }
                                                    className={`font-medium text-blue-700 cursor-pointer`}
                                                >
                                                    <ArchiveRestore />
                                                </div>
                                                <div
                                                    onClick={(e) =>
                                                        handleDelete(e, ts.id)
                                                    }
                                                    className={`font-medium text-red-700 cursor-pointer`}
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
                                        colSpan={3}
                                    >
                                        Tidak ada Jurnal Di Hapus
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                {trasheds.data.length > 0 && (
                    <Pagination datas={trasheds}></Pagination>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
