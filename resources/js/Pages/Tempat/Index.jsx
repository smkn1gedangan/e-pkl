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
import Filter from "@/Components/Filter";
import { OptionSorting } from "@/Components/Option";
import Table from "@/Components/Table";
const Index = () => {
    const { tempats, pembimbings, flash, filters } = usePage().props;
    const [createModal, setCreateModal] = useState(false);
    const [sortModal, setSortModal] = useState(false);
    const [editModal, seteditModal] = useState(null);
    const { data, setData, errors, post, processing, reset, put, setError } =
        useForm({
            nama: "",
            kontak: "",
            lokasi: "",
            bidang_usaha: "",
            pembimbing_id: "",
        });
    const { data: dataSearch, setData: setDataSearch } = useForm({
        search: filters?.search ?? "",
        sort_by: filters?.sort_by ?? "",
        sort_order: filters?.sort_order ?? "",
    });
    const handleDelete = (e, id, nama) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Menghapus Du/Di ${nama}`;
        const cb = () =>
            router.delete(route("tempat.destroy", id), {
                onSuccess: (sccs) => {
                    Alert(`${sccs.props.auth.flash?.success}`);
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleStore = (e) => {
        e.preventDefault();
        post(route("tempat.store"), {
            onSuccess: (sccs) => {
                if (sccs.props.auth?.flash?.success) {
                    setCreateModal(false);
                    Alert(`${sccs.props.auth?.flash?.success}`);
                } else {
                    Alert(`${sccs.props.auth?.flash?.error}`, "error", 4000);
                    setCreateModal(false);
                    reset();
                }
            },
        });
    };

    const handleEdit = (e, id) => {
        e.preventDefault();
        setError("bidang_usaha", "");
        setError("kontak", "");
        setError("lokasi", "");
        setError("nama", "");
        const filtered = tempats.data.find((tempat) => tempat.id === id);
        if (filtered) {
            console.log(filtered)
            setData("nama", filtered.nama);
            setData("kontak", filtered.kontak);
            setData("lokasi", filtered.lokasi);
            setData("bidang_usaha", filtered.bidang_usaha);
            setData("pembimbing_id", filtered.user?.id ?? "");
            seteditModal(filtered);
        }
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("tempat.update", editModal.id), {
            onSuccess: (sccs) => {
                if (sccs.props.auth?.flash?.error) {
                    seteditModal(null);
                    Alert(`${sccs.props.auth?.flash?.error}`, "error", 4000);
                } else {
                    Alert(`${sccs.props.auth?.flash?.success}`);
                    seteditModal(null);
                    reset();
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
        if (update.sort_by !== "") params.sort_by = update.sort_by;
        if (update.sort_by !== "" && update.sort_order !== "")
            params.sort_order = update.sort_order;

        router.get(route("tempat.index"), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="Tempat Du/Di" />

            <TitlePage
                nameRoute={"Tambah Tempat"}
                quote={
                    "list tempat du/di sistem rekap kegiatan pkl secara digital"
                }
                title={"tempat Du/Di"}
                onClick={() => {
                    setCreateModal(true);
                    setData("nama", "");
                    setData("lokasi", "");
                    setData("kontak", "");
                    setData("bidang_usaha", "");
                    setData("pembimbing_id", "");
                }}
            ></TitlePage>
            <Filter
                sortModal={sortModal}
                value={dataSearch.search}
                onChange={handleSearchChange}
                setSortModal={setSortModal}
            />
            <div className="p-2">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table
                        headers={[
                            { nama: "#" },
                            { nama: "Nama PT" },
                            { nama: "Kontak" },
                            { nama: "Bidang Usaha" },
                            { nama: "Lokasi" },
                            { nama: "Nama pembimbing" },
                            { nama: "Opsi" },
                        ]}
                    >
                        <tbody>
                            {tempats.data.length > 0 ? (
                                tempats.data.map((tempat, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b  border-gray-200"
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + tempats.from}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            {tempat.nama}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {tempat.kontak}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {tempat.bidang_usaha}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {tempat.lokasi ?? ""}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {`${
                                                tempat.user?.name ??
                                                "Belum Diisi"
                                            }`}
                                        </td>

                                        <td className="px-4 text-center py-4 flex justify-center gap-2">
                                            <div
                                                onClick={(e) =>
                                                    handleEdit(e, tempat.id)
                                                }
                                                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                            >
                                                <Edit />
                                            </div>
                                            <Modal
                                                show={
                                                    editModal?.id === tempat.id
                                                }
                                                onClose={() =>
                                                    seteditModal(null)
                                                }
                                            >
                                                <div className="relative bg-white rounded-lg shadow-sm ">
                                                    <TitleModal
                                                        icon={<X />}
                                                        title={`Edit Du/Di ${tempat.nama}`}
                                                        onClick={() =>
                                                            seteditModal(
                                                                !editModal
                                                            )
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
                                                                        "Kontak"
                                                                    }
                                                                />
                                                                <TextInput
                                                                    id="kontak"
                                                                    type="text"
                                                                    name="kontak"
                                                                    value={
                                                                        data.kontak
                                                                    }
                                                                    className="mt-1 block w-full"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "kontak",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.kontak
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <InputLabel
                                                                    value={
                                                                        "Bidang Usaha"
                                                                    }
                                                                />
                                                                <TextInput
                                                                    id="bidang_usaha"
                                                                    type="text"
                                                                    name="bidang_usaha"
                                                                    value={
                                                                        data.bidang_usaha
                                                                    }
                                                                    className="mt-1 block w-full"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "bidang_usaha",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.bidang_usaha
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <InputLabel
                                                                    value={
                                                                        "Lokasi Du/Di"
                                                                    }
                                                                />
                                                                <TextInput
                                                                    id="lokasi"
                                                                    type="text"
                                                                    name="lokasi"
                                                                    value={
                                                                        data.lokasi
                                                                    }
                                                                    className="mt-1 block w-full"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "lokasi",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.lokasi
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <InputLabel
                                                                    value={
                                                                        "Pilih Pembimbing"
                                                                    }
                                                                />
                                                                <select
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "pembimbing_id",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    value={
                                                                        data.pembimbing_id
                                                                    }
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                                                >
                                                                    <option value="">
                                                                        Default
                                                                    </option>

                                                                    {pembimbings.length >
                                                                        0 &&
                                                                        pembimbings.map(
                                                                            (
                                                                                pb
                                                                            ) => (
                                                                                <option
                                                                                    key={
                                                                                        pb.id
                                                                                    }
                                                                                    value={
                                                                                        pb.id
                                                                                    }
                                                                                >
                                                                                    {`${
                                                                                        pb.name
                                                                                    } - ${
                                                                                        pb
                                                                                            ?.tempat_yang_dibimbing
                                                                                            ?.nama ??
                                                                                        "belum membimbing"
                                                                                    }`}
                                                                                </option>
                                                                            )
                                                                        )}
                                                                </select>

                                                                <InputError
                                                                    message={
                                                                        errors.pembimbing_id
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
                                                            {processing
                                                                ? "Proses..."
                                                                : "Ubah Data"}
                                                        </PrimaryButton>
                                                    </form>
                                                </div>
                                            </Modal>
                                            <div
                                                onClick={(e) =>
                                                    handleDelete(
                                                        e,
                                                        tempat.id,
                                                        tempat.nama
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
                                        Tidak ada Tempat Du/Di Di tambahkan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                {tempats.data.length > 0 && (
                    <Pagination datas={tempats}></Pagination>
                )}
            </div>
            <Modal
                show={createModal}
                onClose={() => setCreateModal(!createModal)}
            >
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <TitleModal
                        icon={<X />}
                        title={"Tambah Tempat Du/Di"}
                        onClick={() => setCreateModal(!createModal)}
                    ></TitleModal>
                    <form onSubmit={handleStore} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <InputLabel value={"Nama Tempat"} />
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
                                <InputLabel value={"Kontak"} />
                                <TextInput
                                    id="kontak"
                                    type="number"
                                    name="kontak"
                                    value={data.kontak}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("kontak", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.kontak}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel value={"Bidang Usaha"} />
                                <TextInput
                                    id="bidang_usaha"
                                    type="text"
                                    name="bidang_usaha"
                                    value={data.bidang_usaha}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("bidang_usaha", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.bidang_usaha}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel value={"Lokasi Du/Di"} />
                                <TextInput
                                    id="lokasi"
                                    type="text"
                                    name="lokasi"
                                    value={data.lokasi}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("lokasi", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.lokasi}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel value={"Pilih Pembimbing"} />
                                <select
                                    onChange={(e) =>
                                        setData("pembimbing_id", e.target.value)
                                    }
                                    value={data.pembimbing_id}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option value="">Default</option>

                                    {pembimbings.length > 0 &&
                                        pembimbings.map((pb) => (
                                            <option key={pb.id} value={pb.id}>
                                                {`${pb.name} - ${
                                                    pb?.tempat_yang_dibimbing
                                                        ?.nama ??
                                                    "belum membimbing"
                                                }`}
                                            </option>
                                        ))}
                                </select>

                                <InputError
                                    message={errors.pembimbing_id}
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
                                {processing ? "Proses..." : "Tambah Tempat"}
                            </span>
                        </PrimaryButton>
                    </form>
                </div>
            </Modal>
            <Modal show={sortModal} onClose={() => setSortModal(!sortModal)}>
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <TitleModal
                        icon={<X />}
                        title={"Filter Tempat"}
                        onClick={() => {
                            setSortModal(!sortModal);
                        }}
                    ></TitleModal>
                    <OptionSorting
                        dataSearch={dataSearch}
                        handleSearchChange={handleSearchChange}
                        datas={[
                            { name: "Default", value: "" },
                            { name: "Nama", value: "nama" },
                            { name: "Kontak", value: "kontak" },
                            { name: "Bidang Usaha", value: "bidang_usaha" },
                            { name: "Lokasi", value: "Lokasi" },
                            { name: "Nama Pembimbing", value: "pembimbing_id" },
                        ]}
                    />
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
