import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TitlePage from "@/Components/TitlePage";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Edit, Eye, Plus, Trash, X } from "lucide-react";
import Pagination from "@/Components/Pagination";
import { Alert, AlertConfirm } from "@/Helpers/Alert";
import Modal from "@/Components/Modal";
import TitleModal from "@/Components/TitleModal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Filter from "@/Components/Filter";
import { OptionSorting } from "@/Components/Option";
import Table from "@/Components/Table";
import { toast, ToastContainer } from "react-toastify";
import SecondaryButton from "@/Components/SecondaryButton";
const Index = () => {
    const { siswas, auth, filters, jurusans, tahunAjarans, tempats } =
        usePage().props;
    const [errors, setErrors] = useState({});
    const [createNilaiModal, setCreateNilaiModal] = useState(null);
    const [showModal, setShowModal] = useState(null);
    const [sortModal, setSortModal] = useState(false);
    const { data, setData, processing, reset } = useForm({
        user_id: "",
        pembimbing_id: auth.user.id,
        nilai: 0,
        keterangan: "",
    });
    const { data: dataSearch, setData: setDataSearch } = useForm({
        search: filters?.search ?? "",
        sort_by: filters?.sort_by ?? "",
        sort_order: filters?.sort_order ?? "",
        tahunAjaran: filters?.tahunAjaran ?? "",
        jurusan: filters?.jurusan ?? "",
        tempat: filters?.tempat ?? "",
    });
    const handleDelete = (e, id, nama) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Menghapus User ${nama}`;
        const cb = () =>
            router.delete(route("siswa.destroy", id), {
                onSuccess: (sccs) => {
                    toast.success(`${sccs.props.auth.flash?.success}`);
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleCreateNilai = (e, id) => {
        e.preventDefault();
        const filtered = siswas.data.find((siswa) => siswa.id === id);
        if (filtered) {
            setCreateNilaiModal(filtered);
        }
    };
    const handleStore = (e) => {
        e.preventDefault();
        setCreateNilaiModal(null);
        AlertConfirm(
            "Nilai Yang Anda Inputkan Tidak Bisa Diubah Atau Dihapus, Pastikan Data Benar Benar Nilai Dari Kinerja Siswa Selama Pkl",
            "warning",
            () => {
                const datas = {
                    ...data,
                    user_id: createNilaiModal.id,
                };
                router.post(route("nilai.store"), datas, {
                    onSuccess: (sccs) => {
                        if (sccs.props.auth.flash?.success) {
                            toast.success(`${sccs.props.auth.flash?.success}`);
                            reset();
                            setCreateNilaiModal(null);
                        } else {
                            setCreateNilaiModal(null);
                            toast.error(`${sccs.props.auth.flash?.error}`);
                        }
                    },
                    onError: (e) => {
                        setErrors(e);
                        Alert(`${Object.values(e)}`, "error", 4000);
                    },
                });
            },
            "Ya Tambahkan Nilai"
        );
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
        if (update.jurusan !== "") params.jurusan = update.jurusan;
        if (update.tahunAjaran !== "") params.tahunAjaran = update.tahunAjaran;
        if (update.tempat !== "") params.tempat = update.tempat;

        router.get(route("siswa.index"), params, {
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
                    "siswa.export",
                    {
                        search: dataSearch.search,
                        sort_by: dataSearch.sort_by,
                        sort_order: dataSearch.sort_order,
                        jurusan: dataSearch.jurusan,
                        tahunAjaran: dataSearch.tahunAjaran,
                        tempat: dataSearch.tempat,
                    },
                    true
                );
                toast.success(`sukses meng export data siswa ke excel`);
            },
            "Ya, Export!"
        );
    };
    const handleShow = (e, id) => {
        e.preventDefault();
        const filtered = siswas.data.find((s) => s.id === id);
        if (filtered) {
            setShowModal(filtered);
        }
    };
    return (
        <AuthenticatedLayout>
            <Head title="Siswa" />
            <ToastContainer className={`w-96`} />

            <TitlePage
                nameRoute={`${auth.role == "admin" ? "Tambah Siswa" : ""}`}
                quote={"list siswa sistem rekap kegiatan pkl secara digital"}
                title={`Data Siswa Milik ${auth.user.name}  `}
                onClick={() => (window.location.href = route("siswa.create"))}
            >
                <SecondaryButton
                    className="bg-blue-700 text-white"
                    onClick={(e) => handleExport(e)}
                >
                    Export
                </SecondaryButton>
            </TitlePage>
            {auth.role !== "siswa" && (
                <Filter
                    sortModal={sortModal}
                    value={dataSearch.search}
                    onChange={handleSearchChange}
                    setSortModal={setSortModal}
                />
            )}
            <div className="p-2">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table
                        headers={[
                            { nama: "#" },
                            { nama: "Nama" },
                            { nama: "Nisn" },
                            { nama: "Email" },
                            { nama: "TTL" },
                            { nama: "Kontak" },
                            { nama: "Jurusan" },
                            { nama: "Tahun Ajaran" },
                            { nama: "Tempat" },
                            { nama: "Pb Pt" },
                            { nama: "Pb Sekolah" },
                            { nama: "Nilai" },
                            { nama: "Opsi" },
                        ]}
                    >
                        <tbody>
                            {siswas?.data.length > 0 ? (
                                siswas?.data.map((siswa, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b gap-1 border-gray-200"
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + siswas?.from}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            {siswa.name}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {siswa.data_siswa?.nisn}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {siswa.email}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {siswa?.tempat_lahir}
                                            ,&nbsp;&nbsp;
                                            {siswa?.tanggal_lahir}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {siswa.kontak ?? "Belum Diisi"}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {siswa.jurusan?.nama
                                                ? siswa.jurusan?.nama.slice(
                                                      0,
                                                      8
                                                  )
                                                : "Belum Diisi"}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {siswa.tahun_ajaran?.tahun
                                                ? siswa.tahun_ajaran?.tahun
                                                : "Belum Diisi"}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {siswa.tempat?.nama ??
                                                "Belum Diisi"}
                                        </td>
                                        <td
                                            className={`${
                                                siswa.nilai.some(
                                                    (n2) =>
                                                        n2.pembimbing?.id ===
                                                        siswa.tempat.user?.id
                                                ) && "bg-green-600 text-white"
                                            } px-4 text-center py-4`}
                                        >
                                            {siswa.tempat?.user?.name ??
                                                "Belum Diisi"}
                                        </td>
                                        <td
                                            className={`${
                                                siswa.nilai.some(
                                                    (n2) =>
                                                        n2.pembimbing?.id ===
                                                        siswa.pb_skl?.id
                                                ) && "bg-blue-600 text-white"
                                            } px-4 text-center py-4`}
                                        >
                                            {siswa.pb_skl?.name ??
                                                "Belum Diisi"}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {siswa.nilai.map((n2) => (
                                                <div key={n2.id}>
                                                    {n2.nilai}
                                                </div>
                                            ))}
                                        </td>

                                        <td className="px-4 text-center py-4 ">
                                            <div className="flex justify-center gap-2">
                                                {auth.role === "admin" && (
                                                    <>
                                                        <div
                                                            onClick={(e) =>
                                                                (window.location.href =
                                                                    route(
                                                                        "siswa.edit",
                                                                        siswa.id
                                                                    ))
                                                            }
                                                            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                                        >
                                                            <Edit />
                                                        </div>
                                                        <div
                                                            onClick={(e) =>
                                                                handleDelete(
                                                                    e,
                                                                    siswa.id,
                                                                    siswa.name
                                                                )
                                                            }
                                                            className="font-medium text-red-800 hover:text-red-700 transition-all cursor-pointer"
                                                        >
                                                            <Trash />
                                                        </div>
                                                    </>
                                                )}
                                                {(auth.role ===
                                                    "pembimbing_pt" ||
                                                    auth.role ===
                                                        "pembimbing_sekolah") && (
                                                    <>
                                                        <div
                                                            onClick={(e) =>
                                                                handleCreateNilai(
                                                                    e,
                                                                    siswa.id
                                                                )
                                                            }
                                                            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                                        >
                                                            <Edit />
                                                        </div>
                                                        <Modal
                                                            show={
                                                                createNilaiModal?.id ===
                                                                siswa.id
                                                            }
                                                            onClose={() =>
                                                                setCreateNilaiModal(
                                                                    null
                                                                )
                                                            }
                                                        >
                                                            <div className="relative bg-white rounded-lg shadow-sm ">
                                                                <TitleModal
                                                                    icon={<X />}
                                                                    title={
                                                                        "Nilai Akhir"
                                                                    }
                                                                    onClick={() =>
                                                                        setCreateNilaiModal(
                                                                            null
                                                                        )
                                                                    }
                                                                ></TitleModal>
                                                                <form
                                                                    onSubmit={
                                                                        handleStore
                                                                    }
                                                                    className="p-4 md:p-5"
                                                                >
                                                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                                                        <div className="col-span-2">
                                                                            <InputLabel
                                                                                value={
                                                                                    "Nilai"
                                                                                }
                                                                            />
                                                                            <TextInput
                                                                                id="nilai"
                                                                                type="number"
                                                                                min="0"
                                                                                max="100"
                                                                                name="nilai"
                                                                                value={
                                                                                    data.nilai
                                                                                }
                                                                                className="mt-1 block w-full"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "nilai",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                            <InputError
                                                                                message={
                                                                                    errors.nilai
                                                                                }
                                                                                className="mt-2"
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2">
                                                                            <InputLabel
                                                                                value={
                                                                                    "keterangan"
                                                                                }
                                                                            />
                                                                            <textarea
                                                                                id="keterangan"
                                                                                value={
                                                                                    data.keterangan
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "keterangan",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                                name="keterangan"
                                                                                rows="2"
                                                                                className="block p-2.5 w-full text-sm text-gray-900  rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-700 resize-none"
                                                                                placeholder="deskripsikan keterangan anda.."
                                                                            ></textarea>
                                                                            <InputError
                                                                                message={
                                                                                    errors.keterangan
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
                                                                        <Plus />
                                                                        <span className="hidden sm:block">
                                                                            {processing
                                                                                ? "Proses..."
                                                                                : "Tambahkan Nilai"}
                                                                        </span>
                                                                    </PrimaryButton>
                                                                </form>
                                                            </div>
                                                        </Modal>
                                                    </>
                                                )}
                                                <div
                                                    onClick={(e) =>
                                                        handleShow(e, siswa.id)
                                                    }
                                                    className="text-green-500 cursor-pointer"
                                                >
                                                    <Eye />
                                                </div>
                                                <Modal
                                                    show={
                                                        showModal?.id ===
                                                        siswa.id
                                                    }
                                                    onClose={() =>
                                                        setShowModal(null)
                                                    }
                                                >
                                                    <div className="relative bg-white rounded-lg shadow-sm ">
                                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                            <h3 className="text-lg font-semibold text-gray-900 ">
                                                                Data{" "}
                                                                {
                                                                    showModal?.name
                                                                }
                                                            </h3>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setShowModal(
                                                                        null
                                                                    )
                                                                }
                                                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                <X />
                                                                <span className="sr-only">
                                                                    Close modal
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <div className="grid gap-2 mb-4 grid-cols-1 p-4">
                                                                <h1 className="font-medium text-xl text-black">
                                                                    Data Siswa
                                                                </h1>
                                                                <div className="table ">
                                                                    <div className="table-row">
                                                                        <div className="table-cell pr-4 pt-2">
                                                                            <b>
                                                                                Nama
                                                                                Siswa
                                                                            </b>
                                                                        </div>
                                                                        <div className="table-cell">
                                                                            :{" "}
                                                                            {
                                                                                showModal?.name
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="table-row">
                                                                        <div className="table-cell pr-4 pt-2">
                                                                            <b>
                                                                                Tempat,
                                                                                Tanggal
                                                                                Lahir
                                                                            </b>
                                                                        </div>
                                                                        <div className="table-cell">
                                                                            :{" "}
                                                                            {
                                                                                showModal?.tempat_lahir
                                                                            }
                                                                            ,&nbsp;&nbsp;
                                                                            {
                                                                                showModal?.tanggal_lahir
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="table-row">
                                                                        <div className="table-cell pr-4 pt-2">
                                                                            <b>
                                                                                Kontak
                                                                            </b>
                                                                        </div>
                                                                        <div className="table-cell">
                                                                            :{" "}
                                                                            {
                                                                                showModal?.kontak
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="table-row">
                                                                        <div className="table-cell pr-4 pt-2">
                                                                            <b>
                                                                                Jurusan
                                                                            </b>
                                                                        </div>
                                                                        <div className="table-cell">
                                                                            :{" "}
                                                                            {
                                                                                showModal
                                                                                    ?.jurusan
                                                                                    ?.nama
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="table-row">
                                                                        <div className="table-cell pr-4 pt-2">
                                                                            <b>
                                                                                Tahun
                                                                                Ajaran
                                                                            </b>
                                                                        </div>
                                                                        <div className="table-cell">
                                                                            :{" "}
                                                                            {
                                                                                showModal
                                                                                    ?.tahun_ajaran
                                                                                    ?.tahun
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="table-row">
                                                                        <div className="table-cell pr-4 pt-2">
                                                                            <b>
                                                                                Tempat
                                                                                Pkl
                                                                            </b>
                                                                        </div>
                                                                        <div className="table-cell">
                                                                            :{" "}
                                                                            {
                                                                                showModal
                                                                                    ?.tempat
                                                                                    ?.nama
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="table-row">
                                                                        <div className="table-cell pr-4 pt-2">
                                                                            <b>
                                                                                Pembimbing
                                                                                Pkl
                                                                            </b>
                                                                        </div>
                                                                        <div className="table-cell">
                                                                            :{" "}
                                                                            {
                                                                                showModal
                                                                                    ?.tempat
                                                                                    ?.user
                                                                                    ?.name
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="table-row">
                                                                        <div className="table-cell pr-4 pt-2">
                                                                            <b>
                                                                                Pembimbing
                                                                                Sekolah
                                                                            </b>
                                                                        </div>
                                                                        <div className="table-cell">
                                                                            :{" "}
                                                                            {
                                                                                showModal
                                                                                    ?.pb_skl
                                                                                    ?.name
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="table-row">
                                                                        <div className="table-cell pr-4 pt-2">
                                                                            <b>
                                                                                Nilai
                                                                            </b>
                                                                        </div>
                                                                        <div className="table-cell">
                                                                            :{" "}
                                                                            {showModal?.nilai
                                                                                ?.map(
                                                                                    (
                                                                                        n
                                                                                    ) =>
                                                                                        n.nilai
                                                                                )
                                                                                .join(
                                                                                    " ,"
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {showModal?.id && (
                                                                    <a
                                                                        className="flex justify-center items-center rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-100 bg-gray-900 shadow-sm transition duration-150 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25 gap-2 cursor-pointer mt-4"
                                                                        href={route(
                                                                            "export_siswa",
                                                                            showModal?.id
                                                                        )}
                                                                    >
                                                                        <span className="block">
                                                                            Export
                                                                            to
                                                                            Pdf
                                                                        </span>
                                                                        <Plus />
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Modal>
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
                                        Tidak ada Siswa Di tambahkan
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
                        title={"Filter Dan Sorting Siswa"}
                        onClick={() => {
                            setSortModal(!sortModal);
                        }}
                    ></TitleModal>
                    <OptionSorting
                        dataSearch={dataSearch}
                        handleSearchChange={handleSearchChange}
                        datas={[
                            { name: "Default", value: "" },
                            { name: "Nama", value: "name" },
                            { name: "Email", value: "email" },
                            { name: "Ho Hp", value: "kontak" },
                            { name: "Jurusan", value: "jurusan_id" },
                            { name: "Tahun Ajaran", value: "tahunAjaran_id" },
                            { name: "Tempat Du/Di", value: "tempat_id" },
                        ]}
                    />

                    <div className="p-4 md:p-5">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                            Filter Data Siswa
                        </h3>
                        <div className="grid gap-4 mb-4 grid-cols-1">
                            <div className="">
                                <InputLabel value={"Tahun Ajaran"} />
                                <select
                                    onChange={(e) => handleSearchChange(e)}
                                    value={dataSearch.tahunAjaran}
                                    id="tahunAjaran"
                                    name="tahunAjaran"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                                >
                                    <option value="">Default</option>
                                    {tahunAjarans.length > 0 &&
                                        tahunAjarans.map((ta) => (
                                            <option
                                                key={ta.id}
                                                value={ta.tahun}
                                            >
                                                {ta.tahun}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="">
                                <InputLabel value={"Tempat"} />
                                <select
                                    onChange={(e) => handleSearchChange(e)}
                                    value={dataSearch.tempat}
                                    id="tempat"
                                    name="tempat"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                                >
                                    <option value="">Default</option>
                                    {tempats.length > 0 &&
                                        tempats.map((tempat) => (
                                            <option
                                                key={tempat.id}
                                                value={tempat.nama}
                                            >
                                                {tempat.nama}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="">
                                <InputLabel value={"Jurusan"} />
                                <select
                                    onChange={(e) => handleSearchChange(e)}
                                    value={dataSearch.jurusan}
                                    id="jurusan"
                                    name="jurusan"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                                >
                                    <option value="">Default</option>
                                    {jurusans.length > 0 &&
                                        jurusans.map((jurusan) => (
                                            <option
                                                key={jurusan.id}
                                                value={jurusan.nama}
                                            >
                                                {jurusan.nama}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
