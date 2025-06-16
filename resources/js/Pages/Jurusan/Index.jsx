import React, { useState } from "react";
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
import { Alert, AlertConfirm } from "@/Helpers/Alert";
import Filter from "@/Components/Filter";
import Table from "@/Components/Table";
import { toast, ToastContainer } from "react-toastify";
const Index = () => {
    const { jurusans, filters } = usePage().props;
    const [createModal, setCreateModal] = useState(false);
    const [editModal, seteditModal] = useState(false);
    const { data, setData, errors, post, processing, reset, put } = useForm({
        nama: "",
        isActive: "tidak",
    });
    const { data: dataSearch, setData: setDataSearch } = useForm({
        search: filters.search ?? "",
    });
    const handleDelete = (e, id, nama) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Menghapus Jurusan ${nama}`;
        const cb = () =>
            router.delete(route("jurusan.destroy", id), {
                onSuccess: (sccs) => {
                    toast.success(`${sccs.props.auth.flash?.success}`);
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleStore = (e) => {
        e.preventDefault();
        post(route("jurusan.store"), {
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
        const filtered = jurusans.data.find((jurusan) => jurusan.id === id);
        if (filtered) {
            setData("nama", filtered.nama);
            setData("isActive", filtered.isActive);
            seteditModal(filtered);
        }
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("jurusan.update", editModal.id), {
            onSuccess: (sccs) => {
                if (sccs.props.auth.flash?.success) {
                    toast.success(`${sccs.props.auth.flash?.success}`);
                    reset();
                    seteditModal(null);
                } else {
                    toast.success(`${sccs.props.auth.flash?.error}`);
                    seteditModal(null);
                }
            },
        });
    };
    const handleSearchChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const update = {
            ...dataSearch,
            [name]: value,
        };
        setDataSearch(update);
        const params = {};
        if (update.search !== "") params.search = update.search;

        router.get(route("jurusan.index"), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="Jurusan" />
            <ToastContainer className={`w-96`} />

            <TitlePage
                nameRoute={"Tambah Jurusan"}
                quote={"list jurusan sistem rekap kegiatan pkl secara digital"}
                title={"Jurusan"}
                onClick={() => {
                    setCreateModal(true);
                    setData("nama", "");
                }}
            ></TitlePage>
            <Filter
                isFilter={false}
                value={dataSearch.search}
                onChange={handleSearchChange}
            />
            <div className="p-2">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table
                        headers={[
                            { nama: "#" },
                            { nama: "Nama Jurusan" },
                            { nama: "Keaktifan" },
                            { nama: "Opsi" },
                        ]}
                    >
                        <tbody>
                            {jurusans.data.length > 0 ? (
                                jurusans.data.map((jurusan, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b  border-gray-200"
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + jurusans.from}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            {jurusan.nama}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {jurusan.isActive === "aktif"
                                                ? "Aktif"
                                                : "Tidak Aktif"}
                                        </td>

                                        <td className="px-4">
                                            <div className="flex justify-center gap-2">
                                                <div
                                                    onClick={(e) =>
                                                        handleEdit(
                                                            e,
                                                            jurusan.id
                                                        )
                                                    }
                                                    className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                                >
                                                    <Edit />
                                                </div>
                                                <Modal
                                                    show={
                                                        editModal?.id ===
                                                        jurusan.id
                                                    }
                                                    onClose={() =>
                                                        seteditModal(null)
                                                    }
                                                >
                                                    <div className="relative bg-white rounded-lg shadow-sm ">
                                                        <TitleModal
                                                            icon={<X />}
                                                            title={`Edit Jurusan ${jurusan.nama}`}
                                                            onClick={() =>
                                                                seteditModal(
                                                                    !editModal
                                                                )
                                                            }
                                                        ></TitleModal>
                                                        <form
                                                            onSubmit={
                                                                handleUpdate
                                                            }
                                                            className="p-4 md:p-5"
                                                        >
                                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                                <div className="col-span-2">
                                                                    <InputLabel
                                                                        value={
                                                                            "Nama Jurusan"
                                                                        }
                                                                    />
                                                                    <TextInput
                                                                        id="nama"
                                                                        type="text"
                                                                        name="nama"
                                                                        value={
                                                                            data.nama
                                                                        }
                                                                        className="mt-1 block w-full"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "nama",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.nama
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                <div className="col-span-2">
                                                                    <InputLabel
                                                                        value={
                                                                            "Keaktifan"
                                                                        }
                                                                    />
                                                                    <select
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "isActive",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        value={
                                                                            data.isActive
                                                                        }
                                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                    >
                                                                        <option
                                                                            value={
                                                                                "aktif"
                                                                            }
                                                                        >
                                                                            Aktif
                                                                        </option>
                                                                        <option
                                                                            value={
                                                                                "tidak"
                                                                            }
                                                                        >
                                                                            Tidak
                                                                            Aktif
                                                                        </option>
                                                                    </select>

                                                                    <InputError
                                                                        message={
                                                                            errors.isActive
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
                                                                <span className="hidden sm:block">
                                                                    {processing
                                                                        ? "Proses..."
                                                                        : "Ubah Jurusan"}
                                                                </span>
                                                            </PrimaryButton>
                                                        </form>
                                                    </div>
                                                </Modal>
                                                <div
                                                    onClick={(e) =>
                                                        handleDelete(
                                                            e,
                                                            jurusan.id,
                                                            jurusan.nama
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
                                        colSpan={3}
                                    >
                                        Tidak ada Jurusan Di tambahkan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                {jurusans.data.length > 0 && (
                    <Pagination datas={jurusans}></Pagination>
                )}
            </div>
            <Modal
                show={createModal}
                onClose={() => setCreateModal(!createModal)}
            >
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <TitleModal
                        icon={<X />}
                        title={"Tambah Jurusan"}
                        onClick={() => {
                            setCreateModal(!createModal);
                        }}
                    ></TitleModal>
                    <form onSubmit={handleStore} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <InputLabel value={"Nama Jurusan"} />
                                <TextInput
                                    id="nama"
                                    type="text"
                                    name="nama"
                                    value={data.nama}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.nama}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel value={"Keaktifan"} />
                                <select
                                    onChange={(e) =>
                                        setData("isActive", e.target.value)
                                    }
                                    value={data.isActive}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option value={"aktif"}>Aktif</option>
                                    <option value={"tidak"}>Tidak Aktif</option>
                                </select>

                                <InputError
                                    message={errors.isActive}
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
                            <span className="hidden sm:block">
                                {processing ? "Proses..." : "Tambah Jurusan"}
                            </span>
                        </PrimaryButton>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
