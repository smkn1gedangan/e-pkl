import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TitlePage from "@/Components/TitlePage";
import Modal from "@/Components/Modal";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Edit, Plus, Trash, X } from "lucide-react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import TitleModal from "@/Components/TitleModal";
import Swal from "sweetalert2";
import { Alert, AlertConfirm } from "@/Helpers/Alert";
import Table from "@/Components/Table";
import { toast, ToastContainer } from "react-toastify";
const Index = () => {
    const { tahunAjarans } = usePage().props;
    const [createModal, setCreateModal] = useState(false);
    const [editModal, seteditModal] = useState(null);
    const { data, setData, errors, post, processing, reset, put } = useForm({
        tahun: "",
    });
    const handleDelete = (e, id, tahun) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Menghapus Tahun Ajaran ${tahun}`;
        const cb = () =>
            router.delete(route("tahunAjaran.destroy", id), {
                onSuccess: (sccs) => {
                    toast.success(`${sccs.props.auth.flash?.success}`);
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleStore = (e) => {
        e.preventDefault();
        post(route("tahunAjaran.store"), {
            onSuccess: (sccs) => {
                if (sccs.props.auth.flash?.success) {
                    toast.success(`${sccs.props.auth.flash?.success}`);
                    reset();
                    setCreateModal(false);
                } else {
                    toast.error(`${sccs.props.auth.flash?.error}`);

                    setCreateModal(false);
                }
            },
        });
    };

    const handleEdit = (e, id) => {
        e.preventDefault();
        const filtered = tahunAjarans.data.find((ta) => ta.id === id);
        if (filtered) {
            seteditModal(filtered);
            setData("tahun", filtered.tahun);
        }
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("tahunAjaran.update", editModal.id), {
            onSuccess: (sccs) => {
                if (sccs.props.auth.flash?.success) {
                    toast.success(`${sccs.props.auth.flash?.success}`);
                    reset();
                    seteditModal(null);
                } else {
                    toast.error(`${sccs.props.auth.flash?.error}`);
                    seteditModal(null);
                }
            },
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="Tahun Ajaran" />
            <ToastContainer className={`w-96`} />

            <TitlePage
                nameRoute={"Tambah Tahun Ajaran"}
                quote={
                    "list tahun ajaran sistem rekap kegiatan pkl secara digital"
                }
                title={"Tahun Ajaran"}
                onClick={() => {
                    setCreateModal(true);
                    setData("tahun", "");
                }}
            ></TitlePage>
            <div className="p-2">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table
                        headers={[
                            { nama: "#" },
                            { nama: "Tahun Ajaran" },
                            { nama: "Opsi" },
                        ]}
                    >
                        <tbody>
                            {tahunAjarans.data.length > 0 ? (
                                tahunAjarans.data.map((ta, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b  border-gray-200"
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + tahunAjarans.from}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            {ta.tahun}
                                        </td>

                                        <td className="px-4 text-center py-4 flex justify-center gap-2">
                                            <div
                                                onClick={(e) =>
                                                    handleEdit(e, ta.id)
                                                }
                                                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                            >
                                                <Edit />
                                            </div>
                                            <Modal
                                                show={editModal?.id === ta.id}
                                                onClose={() =>
                                                    seteditModal(null)
                                                }
                                            >
                                                <div className="relative bg-white rounded-lg shadow-sm ">
                                                    <TitleModal
                                                        icon={<X />}
                                                        title={`Edit Tahun Ajaran ${ta.tahun}`}
                                                        onClick={() =>
                                                            seteditModal(null)
                                                        }
                                                    ></TitleModal>
                                                    <form
                                                        onSubmit={handleUpdate}
                                                        className="p-4 md:p-5"
                                                    >
                                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                                            <div className="col-span-2">
                                                                <InputLabel
                                                                    value={
                                                                        "Tahun Ajaran *contoh (2014 - 2015)"
                                                                    }
                                                                />
                                                                <TextInput
                                                                    id="tahun"
                                                                    type="text"
                                                                    name="tahun"
                                                                    value={
                                                                        data.tahun
                                                                    }
                                                                    className="mt-1 block w-full"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "tahun",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.tahun
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>

                                                        <PrimaryButton
                                                            type="submit"
                                                            className="gap-2"
                                                            disabled={
                                                                processing
                                                            }
                                                        >
                                                            <Edit />
                                                            <span className="block">
                                                                {processing
                                                                    ? "Proses..."
                                                                    : "Ubah Tahun Ajaran"}
                                                            </span>
                                                        </PrimaryButton>
                                                    </form>
                                                </div>
                                            </Modal>
                                            <div
                                                onClick={(e) =>
                                                    handleDelete(
                                                        e,
                                                        ta.id,
                                                        ta.tahun
                                                    )
                                                }
                                                className="font-medium text-red-800 hover:text-red-700 transition-all cursor-pointer"
                                            >
                                                <Trash />
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
                                        Tidak ada Tahun Ajaran Di tambahkan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                {tahunAjarans.data.length > 0 && (
                    <Pagination datas={tahunAjarans}></Pagination>
                )}
            </div>
            <Modal
                show={createModal}
                onClose={() => setCreateModal(!createModal)}
            >
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <TitleModal
                        icon={<X />}
                        title={"Tambah Tahun Ajaran"}
                        onClick={() => setCreateModal(!createModal)}
                    ></TitleModal>
                    <form onSubmit={handleStore} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <InputLabel
                                    value={"Tahun Ajaran *contoh (2014 - 2015)"}
                                />
                                <TextInput
                                    id="tahun"
                                    type="text"
                                    name="tahun"
                                    value={data.tahun}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("tahun", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.tahun}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <PrimaryButton
                            type="submit"
                            className="gap-2"
                            disabled={processing}
                        >
                            <Plus />
                            <span className="block">
                                {processing
                                    ? "Proses..."
                                    : "Tambah Tahun Ajaran"}
                            </span>
                        </PrimaryButton>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
