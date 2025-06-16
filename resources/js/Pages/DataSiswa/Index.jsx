import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TitlePage from "@/Components/TitlePage";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Edit, Plus, Trash, X } from "lucide-react";
import Pagination from "@/Components/Pagination";
import { Alert, AlertConfirm } from "@/Helpers/Alert";
import Filter from "@/Components/Filter";
import TitleModal from "@/Components/TitleModal";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import { OptionSorting } from "@/Components/Option";
import Table from "@/Components/Table";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useTypeImportSiswa } from "@/state/Zustand";
import { toast, ToastContainer } from "react-toastify";
const Index = () => {
    const { siswas, auth, filters, dataSiswas } = usePage().props;
    const [createModal, setCreateModal] = useState(false);
    const [editModal, seteditModal] = useState(null);
    const [sortModal, setSortModal] = useState(false);
    const { type, setType } = useTypeImportSiswa();

    const { data, setData, processing, errors, post, put, reset, setError } =
        useForm({
            induk: "",
            jurusan: "",
            nama: "",
            file: "",
        });
    const { data: dataSearch, setData: setDataSearch } = useForm({
        search: filters?.search ?? "",
        sort_by: filters?.sort_by ?? "",
        sort_order: filters?.sort_order ?? "",
        kode: filters?.kode ?? "",
        aktivasi: filters?.aktivasi ?? "",
    });
    const handleDelete = (e, id, nama) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Mengapus Registrasi User ${nama}`;
        const cb = () =>
            router.delete(route("data_siswa.destroy", id), {
                onSuccess: (sccs) => {
                    if (sccs.props.auth?.flash?.success) {
                        toast.success(`${sccs.props.auth.flash?.success}`);
                    } else {
                        toast.error(`${sccs.props.auth.flash?.error}`);
                    }
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleEdit = (e, id) => {
        e.preventDefault();
        const filtered = siswas.data.find((siswa) => siswa.id === id);
        if (filtered) {
            setError("induk", "");
            setError("jurusan", "");
            setError("nama", "");
            setData("nama", filtered.nama);
            setData("jurusan", filtered.jurusan);
            setData("induk", filtered.induk);
            seteditModal(filtered);
        }
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("data_siswa.update", editModal.id), {
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
        if (update.kode !== "") params.kode = update.kode;
        if (update.aktivasi !== "") params.aktivasi = update.aktivasi;

        router.get(route("data_siswa.index"), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };
    const handleExport = (e) => {
        e.preventDefault();
        AlertConfirm(
            `Apakah anda yakin ingin export data siswa`,
            "question",
            () => {
                window.location.href = route(
                    "data_siswa.export",
                    {
                        search: dataSearch.search,
                        sort_by: dataSearch.sort_by,
                        sort_order: dataSearch.sort_order,
                        kode: dataSearch.kode,
                        aktivasi: dataSearch.aktivasi,
                    },
                    true
                );
                toast.success(`sukses meng export data ke excel`);
            },
            "Ya, Export!"
        );
    };
    const handleStore = (e) => {
        e.preventDefault();
        if (type === "import") {
            post(route("data_siswa.import"), {
                forceFormData: true,
                onSuccess: (sccs) => {
                    if (sccs.props.auth.flash.success) {
                        toast.success(`${sccs.props.auth.flash?.success}`);
                        setCreateModal(false);
                        reset();
                    } else {
                        toast.error(`${sccs.props.auth.flash?.error}`);
                        setCreateModal(false);
                    }
                },
            });
        } else {
            post(route("data_siswa.store"), {
                onSuccess: (sccs) => {
                    if (sccs.props.auth.flash.success) {
                        toast.success(`${sccs.props.auth.flash?.success}`);
                        setCreateModal(false);
                        reset();
                    } else {
                        toast.error(`${sccs.props.auth.flash?.error}`);
                        setCreateModal(false);
                    }
                },
            });
        }
    };
    return (
        <AuthenticatedLayout>
            <Head title="User Terdata" />
            <ToastContainer className={`w-96`} />
            <TitlePage
                nameRoute={`Tambah Siswa`}
                quote={"List User yang Terdata Saat Ini"}
                title={`User`}
                onClick={() => setCreateModal(!createModal)}
            >
                <SecondaryButton
                    className="bg-blue-700 text-white"
                    onClick={(e) => handleExport(e)}
                >
                    Export
                </SecondaryButton>
            </TitlePage>
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
                            { nama: "No Nisn" },
                            { nama: "Nama" },
                            { nama: "Opsi" },
                        ]}
                    >
                        <tbody>
                            {siswas?.data.length > 0 ? (
                                siswas?.data.map((siswa, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            siswa.isActive
                                                ? "bg-blue-700 text-white border     border-white"
                                                : "bg-white border-b  border-gray-200"
                                        }`}
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + siswas?.from}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            {siswa.nisn ?? "Belum Diisi"}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {siswa.nama ?? "Belum Diisi"}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            {auth.role === "admin" && (
                                                <div className=" flex justify-center gap-2">
                                                    <div
                                                        onClick={(e) =>
                                                            handleEdit(
                                                                e,
                                                                siswa.id
                                                            )
                                                        }
                                                        className={`${
                                                            siswa.isActive
                                                                ? " text-white"
                                                                : "font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                                        }`}
                                                    >
                                                        <Edit />
                                                    </div>
                                                    <Modal
                                                        show={
                                                            editModal?.id ===
                                                            siswa.id
                                                        }
                                                        onClose={() =>
                                                            seteditModal(null)
                                                        }
                                                    >
                                                        <div className="relative bg-white rounded-lg shadow-sm ">
                                                            <TitleModal
                                                                icon={<X />}
                                                                title={`Edit ${siswa.nama}`}
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
                                                                className="p-4 md:p-5 space-y-5"
                                                            >
                                                                <div className="">
                                                                    <InputLabel
                                                                        value={
                                                                            "No Induk"
                                                                        }
                                                                    />
                                                                    <TextInput
                                                                        id="induk"
                                                                        type="text"
                                                                        name="induk"
                                                                        value={
                                                                            data.induk
                                                                        }
                                                                        className="mt-1 block w-full border border-gray-300 px-4 py-1.5"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "induk",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.induk
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <InputLabel
                                                                        value={
                                                                            "No Jurusan"
                                                                        }
                                                                    />
                                                                    <TextInput
                                                                        id="jurusan"
                                                                        type="text"
                                                                        name="jurusan"
                                                                        value={
                                                                            data.jurusan
                                                                        }
                                                                        className="mt-1 block w-full border border-gray-300 px-4 py-1.5"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "jurusan",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.jurusan
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="">
                                                                    <InputLabel
                                                                        value={
                                                                            "Nama"
                                                                        }
                                                                    />
                                                                    <TextInput
                                                                        id="nama"
                                                                        type="text"
                                                                        name="nama"
                                                                        value={
                                                                            data.nama
                                                                        }
                                                                        className="mt-1 block w-full border border-gray-300 px-4 py-1.5"
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
                                                                    />
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
                                                                            : "Ubah Register Siswa"}
                                                                    </span>
                                                                </PrimaryButton>
                                                            </form>
                                                        </div>
                                                    </Modal>
                                                    <div
                                                        onClick={(e) =>
                                                            handleDelete(
                                                                e,
                                                                siswa.id,
                                                                siswa.nama
                                                            )
                                                        }
                                                        className={`${
                                                            siswa.isActive
                                                                ? "hidden"
                                                                : "font-medium text-red-800 hover:text-red-700 transition-all cursor-pointer"
                                                        }`}
                                                    >
                                                        <Trash />
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="p-2 text-sm font-medium text-center"
                                        colSpan={3}
                                    >
                                        Tidak ada Registrasi Akun Di tambahkan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                {siswas?.data.length > 0 && (
                    <Pagination datas={siswas}></Pagination>
                )}
            </div>
            <Modal show={sortModal} onClose={() => setSortModal(!sortModal)}>
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <TitleModal
                        icon={<X />}
                        title={"Filter Dan Sorting Data User"}
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
                            { name: "Nisn", value: "nisn" },
                        ]}
                    />
                    <div className="p-4 md:p-5">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                            Filter Data User
                        </h3>
                        <div className="grid gap-4 md:mt-3 grid-cols-1">
                            <div className="">
                                <InputLabel value={"Kode Jurusan"} />
                                <select
                                    onChange={(e) => handleSearchChange(e)}
                                    value={dataSearch.kode}
                                    id="kode"
                                    name="kode"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                                >
                                    <option value="">Default</option>
                                    {dataSiswas.length > 0 &&
                                        dataSiswas.map((ta) => (
                                            <option
                                                key={ta.kode}
                                                value={ta.kode}
                                            >
                                                {ta.kode}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="">
                                <InputLabel value={"Aktivasi"} />
                                <select
                                    onChange={(e) => handleSearchChange(e)}
                                    value={dataSearch.aktivasi}
                                    id="aktivasi"
                                    name="aktivasi"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                                >
                                    <option value="">Default</option>
                                    <option value="true">Sudah</option>
                                    <option value="false">Belum</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                show={createModal}
                onClose={() => setCreateModal(!createModal)}
            >
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <TitleModal
                        icon={<X />}
                        title={"Tambah User Yang Terdata"}
                        onClick={() => {
                            setCreateModal(!createModal);
                        }}
                    ></TitleModal>
                    <div className="gap-2 flex justify-center mt-4">
                        <SecondaryButton
                            onClick={() => setType("import")}
                            className={`${
                                type === "import" &&
                                "bg-blue-700 hover:bg-blue-500 focus:border-white focus:bg-blue-700 active:bg-blue-400 text-white"
                            } `}
                        >
                            Import
                        </SecondaryButton>
                        <SecondaryButton
                            onClick={() => setType("create")}
                            className={`${
                                type === "create" &&
                                "bg-blue-700 hover:bg-blue-500 focus:border-white focus:bg-blue-700 active:bg-blue-400 text-white"
                            } `}
                        >
                            Buat Manual
                        </SecondaryButton>
                    </div>
                    <form
                        onSubmit={handleStore}
                        className="p-4 md:p-5 space-y-4"
                    >
                        {type === "create" && (
                            <>
                                <div className="">
                                    <InputLabel value={"No Induk"} />
                                    <TextInput
                                        id="induk"
                                        type="text"
                                        name="induk"
                                        value={data.induk}
                                        className="mt-1 block w-full border border-gray-300 px-4 py-1.5"
                                        onChange={(e) =>
                                            setData("induk", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.induk} />
                                </div>
                                <div className="">
                                    <InputLabel value={"No Jurusan"} />
                                    <TextInput
                                        id="jurusan"
                                        type="text"
                                        name="jurusan"
                                        value={data.jurusan}
                                        className="mt-1 block w-full border border-gray-300 px-4 py-1.5"
                                        onChange={(e) =>
                                            setData("jurusan", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.jurusan} />
                                </div>
                                <div className="">
                                    <InputLabel value={"Nama"} />
                                    <TextInput
                                        id="nama"
                                        type="text"
                                        name="nama"
                                        value={data.nama}
                                        className="mt-1 block w-full border border-gray-300 px-4 py-1.5"
                                        onChange={(e) =>
                                            setData("nama", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.nama} />
                                </div>
                            </>
                        )}
                        {type === "import" && (
                            <div className="space-y-4">
                                <InputError
                                    message={"Contoh Format Di Excel"}
                                />
                                <img src="./img/sampleUser.png" alt="" />
                                <div>
                                    <InputLabel value={"Pilih File"} />
                                    <TextInput
                                        id="file"
                                        type="file"
                                        accept=".xlsx,.xls"
                                        name="file"
                                        className="mt-1 block w-full border border-gray-300 px-4 py-1.5"
                                        onChange={(e) =>
                                            setData("file", e.target.files[0])
                                        }
                                    />
                                    <InputError message={errors.file} />
                                </div>
                            </div>
                        )}
                        <PrimaryButton
                            type="submit"
                            className="gap-2"
                            disabled={processing}
                        >
                            <Plus />
                            <span className="hidden sm:block">
                                {processing ? "Proses..." : "Tambah Registrasi"}
                            </span>
                        </PrimaryButton>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
