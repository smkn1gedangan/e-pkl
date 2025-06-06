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
const Index = () => {
    const { siswas, auth, filter, jurusans, tahunAjarans } = usePage().props;
    const [sortModal, setSortModal] = useState(false);
    const { data, put } = useForm({
        isAccept: true,
    });
    const { data: dataSearch, setData: setDataSearch } = useForm({
        search: filter?.search ?? "",
        sort_by: filter?.sort_by ?? "",
        sort_order: filter?.sort_order ?? "",
        tahunAjaran: filter?.tahunAjaran ?? "",
        jurusan: filter?.jurusan ?? "",
    });
    const handleDelete = (e, id, nama) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Tolak Registrasi User ${nama}`;
        const cb = () =>
            router.delete(route("regis.destroy", id), {
                onSuccess: (sccs) => {
                    if (sccs.props.auth?.flash?.success) {
                        Alert(`${sccs.props.auth?.flash?.success}`);
                    } else {
                        Alert(`${sccs.props.auth.flash?.error}`, "error", 4000);
                    }
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleUpdate = (e, id, nama) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Terima Registrasi User ${nama}`;
        const cb = () =>
            put(route("regis.update", id), {
                onSuccess: (sccs) => {
                    if (sccs.props.auth?.flash?.success) {
                        Alert(`${sccs.props.auth?.flash?.success}`);
                    } else {
                        Alert(`${sccs.props.auth.flash?.error}`, "error", 4000);
                    }
                },
            });
        AlertConfirm(text, "success", cb, "Ya, Terima");
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

        router.get(route("regis.index"), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="Registrasi User" />

            <TitlePage
                nameRoute={`Tambah Siswa`}
                quote={"List Registrasi User yang Belum di Terima"}
                title={`Data Registrasi User `}
                onClick={() => (window.location.href = route("siswa.create"))}
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
                            { nama: "Email" },
                            { nama: "Kontak" },
                            { nama: "Jurusan" },
                            { nama: "Tahun Ajaran" },
                            { nama: "Opsi" },
                        ]}
                    >
                        <tbody>
                            {siswas?.data.length > 0 ? (
                                siswas?.data.map((siswa, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b  border-gray-200"
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + siswas?.from}
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            {siswa.name}
                                        </td>
                                        <td className="px-4 text-center py-4">
                                            {siswa.email}
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
                                            {auth.role === "admin" && (
                                                <div className=" flex justify-center gap-2">
                                                    {" "}
                                                    <div
                                                        onClick={(e) =>
                                                            handleUpdate(
                                                                e,
                                                                siswa.id,
                                                                siswa.name
                                                            )
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
                        title={"Filter Dan Sorting Registrasi Siswa"}
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
                        ]}
                    />
                    <div className="p-4 md:p-5">
                        <h3 className="text-lg font-semibold text-gray-900 ">
                            Filter Registrasi User
                        </h3>
                        <div className="grid gap-4 md:mt-3 grid-cols-1">
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
                                            <option key={ta.id} value={ta.id}>
                                                {ta.tahun}
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
                                                value={jurusan.id}
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
