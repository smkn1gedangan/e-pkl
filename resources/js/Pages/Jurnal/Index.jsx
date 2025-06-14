import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TitlePage from "@/Components/TitlePage";
import Modal from "@/Components/Modal";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Check, Edit, Plus, Trash, X } from "lucide-react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import TitleModal from "@/Components/TitleModal";
import { Alert, AlertConfirm } from "@/Helpers/Alert";
import Filter from "@/Components/Filter";
import Table from "@/Components/Table";
import { OptionSorting } from "@/Components/Option";
import Textarea from "@/Components/Textarea";
const Index = () => {
    const { jurnals, auth, user, filters } = usePage().props;
    const [createModal, setCreateModal] = useState(false);
    const [sortModal, setSortModal] = useState(false);
    const [resizeImg, setResizeImg] = useState(null);
    const [img, setImg] = useState(null);
    const { data, setData, errors, post, processing, reset, put } = useForm({
        keterangan: "",
        kegiatan: "",
        photo: null,
    });
    const { data: dataSearch, setData: setDataSearch } = useForm({
        search: filters?.search ?? "",
        sort_by: filters?.sort_by ?? "",
        sort_order: filters?.sort_order ?? "",
        keterangan: filters?.keterangan ?? "",
        marking: filters?.marking ?? "",
        start_date: filters?.start_date ?? "",
        end_date: filters?.end_date ?? "",
    });
    const handleDelete = (e, id) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Menghapus Jurnal Milik ${auth.user.name}`;
        const cb = () =>
            router.delete(route("rekap.destroy", id), {
                onSuccess: (sccs) => {
                    Alert(`${sccs.props.auth.flash?.success}`);
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleStore = (e) => {
        e.preventDefault();
        post(route("rekap.store"), {
            onSuccess: (sccs) => {
                if (sccs.props.auth.flash.success) {
                    Alert(`${sccs.props.auth.flash.success}`);
                    setCreateModal(false);
                    setImg(null);
                    reset();
                } else {
                    Alert(`${sccs.props.auth.flash.error}`, "error", 4000);
                    setCreateModal(false);
                }
            },
        });
    };

    const handleMarkJurnal = (e, id) => {
        e.preventDefault();
        router.put(route("nilai.update", id), {
            mark: true,
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
        if (update.marking !== "") params.marking = update.marking;
        if (update.keterangan !== "") params.keterangan = update.keterangan;
        if (update.start_date !== "") params.start_date = update.start_date;
        if (update.start_date !== "" && update.end_date !== "")
            params.end_date = update.end_date;

        router.get(route("rekap.index"), params, {
            preserveState: true,
            preserveScroll: true,
        });
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
            <Head title="Jurnal" />
            <TitlePage
                nameRoute={`${auth.role === "siswa" ? "Tambah Jurnal" : ""}`}
                quote={`${
                    auth.role === "siswa" && user
                        ? `Pembimbing Sekolah : ${
                              user?.user.pb_skl?.name ?? "Belum Diisi"
                          } Pembimbing PT ${
                              user?.user.tempat?.user?.name ?? "Belum Diisi"
                          } Dari Pt ${user?.user.tempat?.nama ?? "Belum Diisi"}
                `
                        : "jurnal sistem rekap kegiatan pkl secara digital"
                }`}
                title={`Jurnal Milik ${auth.user.name}`}
                onClick={() => {
                    setCreateModal(true);
                    setData("kegiatan", "");
                    setData("keterangan", "");
                    setData("photo", "");
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
                            { nama: "Nama" },
                            { nama: "Keterangan" },
                            { nama: "Kegiatan" },
                            { nama: "Photo" },
                            { nama: "Dibuat Pada" },
                            { nama: "Mark" },
                            { nama: "Opsi" },
                        ]}
                    >
                        <tbody>
                            {jurnals.data.length > 0 ? (
                                jurnals.data.map((jurnal, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b  border-gray-200"
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + jurnals.from}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            {jurnal.user.name}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {jurnal.keterangan}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {jurnal.kegiatan}
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
                                                    className="w-12 rounded-md h-12 object-cover object-center"
                                                    src={`./storage/${jurnal.photo}`}
                                                    alt=""
                                                />
                                                <Modal
                                                    show={
                                                        resizeImg?.id ===
                                                        jurnal.id
                                                    }
                                                    onClose={() =>
                                                        setResizeImg(null)
                                                    }
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
                                                        <div className="p-2 flex justify-center">
                                                            <img
                                                                className="max-w-sm rounded-md h-auto object-cover object-center"
                                                                src={`./storage/${jurnal.photo}`}
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
                                                    jurnal.created_at
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
                                        <td className="px-4 text-center py-4 cursor-pointer">
                                            {jurnal.mark ? (
                                                auth.role === "siswa" ? (
                                                    <p className="text-blue-700">
                                                        Dilihat
                                                    </p>
                                                ) : (
                                                    <div className="flex justify-center text-blue-700">
                                                        <Check />
                                                    </div>
                                                )
                                            ) : auth.role === "siswa" ? (
                                                <p className="text-red-700">
                                                    Belum Dilihat
                                                </p>
                                            ) : (
                                                <div
                                                    onClick={(e) =>
                                                        handleMarkJurnal(
                                                            e,
                                                            jurnal.id
                                                        )
                                                    }
                                                    className="flex justify-center text-red-700"
                                                >
                                                    < X />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 text-center py-4 ">
                                            {auth.role === "siswa" && (
                                                <div
                                                    onClick={(e) =>
                                                        handleDelete(
                                                            e,
                                                            jurnal.id
                                                        )
                                                    }
                                                    className="font-medium text-red-800 hover:text-red-700 transition-all cursor-pointer flex justify-center gap-2"
                                                >
                                                    <Trash />
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
                                        Tidak ada Jurnal Di tambahkan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                {jurnals.data.length > 0 && (
                    <Pagination datas={jurnals}></Pagination>
                )}
            </div>
            <Modal
                show={createModal}
                onClose={() => setCreateModal(!createModal)}
            >
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <TitleModal
                        icon={<X />}
                        title={"Tambah Jurnal"}
                        onClick={() => {
                            setCreateModal(!createModal);
                        }}
                    ></TitleModal>
                    <form onSubmit={handleStore} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <InputLabel value={"Keterangan"} />
                                <select
                                    onChange={(e) =>
                                        setData("keterangan", e.target.value)
                                    }
                                    value={data.keterangan}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option disabled value="">
                                        Default
                                    </option>
                                    <option value="hadir">Hadir</option>
                                    <option value="sakit">Sakit</option>
                                    <option value="izin">Izin</option>
                                </select>

                                <InputError
                                    message={errors.keterangan}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel value={"Kegiatan"} />
                                <Textarea
                                    id="kegiatan"
                                    value={data.kegiatan}
                                    onChange={(e) =>
                                        setData("kegiatan", e.target.value)
                                    }
                                    name="kegiatan"
                                    placeholder={`Deskripsikan Kegiatn Anda`}
                                />
                                <InputError
                                    message={errors.kegiatan}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel value={"Bukti Photo"} />
                                <TextInput
                                    id="photo"
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    className="mt-1 block w-full border border-gray-300 px-4 py-1.5"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setData("photo", file);
                                        setImg(file);
                                    }}
                                />
                                <InputError
                                    message={errors.photo}
                                    className="mt-2"
                                />
                            </div>
                            {img ? (
                                <img
                                    className={`h-28 mt-4 w-28 object-center object-cover`}
                                    src={URL.createObjectURL(img)}
                                    alt={"No file Store"}
                                />
                            ) : (
                                <div className="w-28 h-28 text-center grid place-content-center bg-gray-200 mt-4">
                                    <p className="font-medium  text-xs text-slate-900">
                                        No File Uploaded
                                    </p>
                                </div>
                            )}
                        </div>
                        <PrimaryButton
                            type="submit"
                            className="gap-2"
                            disabled={processing}
                        >
                            <Plus />
                            <span className="hidden sm:block">
                                {processing ? "Proses..." : "Tambah Jurnal"}
                            </span>
                        </PrimaryButton>
                    </form>
                </div>
            </Modal>
            <Modal show={sortModal} onClose={() => setSortModal(!sortModal)}>
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <TitleModal
                        icon={<X />}
                        title={"Filter Dan Sorting Jurnal Siswa"}
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
                            { name: "Keterangan", value: "keterangan" },
                            { name: "kegiatan", value: "kegiatan" },
                            { name: "Dibuat Pada", value: "created_at" },
                        ]}
                    />
                    <div className="p-4 md:p-5">
                        {auth.role !== "siswa" && (
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                Filter Jurnal
                            </h3>
                        )}
                        <div className="grid gap-4 mb-4 grid-cols-1">
                            <div className="">
                                <InputLabel value={"Marking"} />
                                <select
                                    onChange={(e) => handleSearchChange(e)}
                                    value={dataSearch.marking}
                                    id="marking"
                                    name="marking"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                                >
                                    <option value="">Default</option>
                                    <option value={"true"}>Dilihat</option>
                                    <option value={"false"}>Belum Dilihat</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid gap-4 mb-4 grid-cols-1">
                            <div className="">
                                <InputLabel value={"Keterangan"} />
                                <select
                                    onChange={(e) => handleSearchChange(e)}
                                    value={dataSearch.keterangan}
                                    id="keterangan"
                                    name="keterangan"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-stone-500 focus:border-stone-500 block w-full p-2.5 "
                                >
                                    <option value="">Default</option>
                                    <option value="hadir">Hadir</option>
                                    <option value="sakit">Sakit</option>
                                    <option value="izin">Izin</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="">
                                <InputLabel value={"Waktu Mulai"} />
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={dataSearch.start_date}
                                    className="mt-1 block w-full border border-gray-300 px-4 py-1.5"
                                    onChange={(e) => {
                                        handleSearchChange(e);
                                    }}
                                />
                            </div>

                            {dataSearch.start_date !== "" && (
                                <div className="">
                                    <InputLabel value={"Waktu Berakhir"} />
                                    <TextInput
                                        id="end_date"
                                        type="date"
                                        name="end_date"
                                        value={dataSearch.end_date}
                                        className="mt-1 block w-full border border-gray-300 px-4 py-1.5"
                                        onChange={(e) => {
                                            handleSearchChange(e);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
