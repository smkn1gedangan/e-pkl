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
import Table from "@/Components/Table";
const Index = () => {
    const { gambars } = usePage().props;
    const [createModal, setCreateModal] = useState(false);
    const [img, setImg] = useState(null);
    const [editModal, seteditModal] = useState(false);
    const { data, setData, errors, post, processing, reset, put } = useForm({
        url: "",
    });

    const handleDelete = (e, id) => {
        e.preventDefault();
        const text = `Apakah Anda Yakin Ingin Menghapus Gambar Ini`;
        const cb = () =>
            router.delete(route("gambar.destroy", id), {
                onSuccess: (sccs) => {
                    Alert(`${sccs.props.auth.flash?.success}`);
                },
            });
        AlertConfirm(text, "warning", cb);
    };
    const handleStore = (e) => {
        e.preventDefault();
        post(route("gambar.store"), {
            onSuccess: (sccs) => {
                if (sccs.props.auth.flash?.success) {
                    Alert(`${sccs.props.auth.flash?.success}`);
                    reset();
                    setCreateModal(false);
                } else {
                    Alert(`${sccs.props.auth.flash?.error}`, "error", 4000);
                    setCreateModal(false);
                }
            },
        });
    };

    const handleEdit = (e, id) => {
        e.preventDefault();

        const filtered = gambars.data.find((gambar) => gambar.id === id);
        if (filtered) {
            setData("url", filtered.url);
            setImg(null);
            seteditModal(filtered);
        }
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        router.post(
            route("gambar.update", editModal.id),
            { url: data.url, _method: "put" },
            {
                forceFormData: true,
                onSuccess: (sccs) => {
                    if (sccs.props.auth.flash?.success) {
                        Alert(`${sccs.props.auth.flash?.success}`);
                        reset();
                        seteditModal(null);
                    } else {
                        Alert(`${sccs.props.auth.flash?.error}`, "error", 4000);
                        seteditModal(null);
                    }
                },
           
            }
        );
    };
    return (
        <AuthenticatedLayout>
            <Head title="Slider" />

            <TitlePage
                nameRoute={"Tambah Gambar"}
                quote={
                    "list gambar / slider akan digunakan pada halaman welcome"
                }
                title={"Gambar / Slider"}
                onClick={() => {
                    setCreateModal(true);
                    setData("url", "");
                    setImg(null);
                }}
            ></TitlePage>

            <div className="p-2">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table
                        headers={[
                            { nama: "#" },
                            { nama: "Gambar" },
                            { nama: "Opsi" },
                        ]}
                    >
                        <tbody>
                            {gambars.data.length > 0 ? (
                                gambars.data.map((gambar, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b  border-gray-200"
                                    >
                                        <td className="px-4 text-center py-4">
                                            {index + gambars.from}
                                        </td>

                                        <td className="px-4 py-4">
                                            <img
                                                className="w-32 h-32 object-cover object-center rounded-md left-1/2 -translate-x-1/2 relative"
                                                src={`./storage/${gambar.url}`}
                                                alt=""
                                                srcSet=""
                                            />
                                        </td>

                                        <td className="px-4 text-center py-4">
                                            <div className="flex justify-center gap-2 items-center">
                                                {" "}
                                                <div
                                                    onClick={(e) =>
                                                        handleEdit(e, gambar.id)
                                                    }
                                                    className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                                                >
                                                    <Edit />
                                                </div>
                                                <Modal
                                                    show={
                                                        editModal?.id ===
                                                        gambar.id
                                                    }
                                                    onClose={() =>
                                                        seteditModal(null)
                                                    }
                                                >
                                                    <div className="relative bg-white rounded-lg shadow-sm ">
                                                        <TitleModal
                                                            icon={<X />}
                                                            title={`Edit Gambar`}
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
                                                                            "Gambar"
                                                                        }
                                                                    />
                                                                    <TextInput
                                                                        id="url"
                                                                        type="file"
                                                                        name="url"
                                                                        className="mt-1 block w-full p-2 border border-gray-400"
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            const file =
                                                                                e
                                                                                    .target
                                                                                    ?.files[0];
                                                                            if (
                                                                                file
                                                                            ) {
                                                                                setImg(
                                                                                    file
                                                                                );
                                                                            }
                                                                            setData(
                                                                                "url",
                                                                                file
                                                                            );
                                                                        }}
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            errors.url
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                {img ? (
                                                                    <img
                                                                        className={`h-28 mt-4 w-28 object-center object-cover`}
                                                                        src={URL.createObjectURL(
                                                                            img
                                                                        )}
                                                                        alt={
                                                                            "No file Store"
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        className={`h-28 mt-4 w-28 object-center object-cover`}
                                                                        src={`./storage/${gambar.url}`}
                                                                        alt={
                                                                            "No file Store"
                                                                        }
                                                                    />
                                                                )}
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
                                                                        : "Ubah Gambar"}
                                                                </span>
                                                            </PrimaryButton>
                                                        </form>
                                                    </div>
                                                </Modal>
                                                <div
                                                    onClick={(e) =>
                                                        handleDelete(
                                                            e,
                                                            gambar.id
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
                                        Tidak ada Gambar Di tambahkan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                {gambars.data.length > 0 && (
                    <Pagination datas={gambars}></Pagination>
                )}
            </div>
            <Modal
                show={createModal}
                onClose={() => setCreateModal(!createModal)}
            >
                <div className="relative bg-white rounded-lg shadow-sm ">
                    <TitleModal
                        icon={<X />}
                        title={"Tambah Slider"}
                        onClick={() => {
                            setCreateModal(!createModal);
                        }}
                    ></TitleModal>
                    <form onSubmit={handleStore} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <InputLabel value={"Gambar"} />
                                <TextInput
                                    id="url"
                                    type="file"
                                    name="url"
                                    className="mt-1 block w-full p-2 border border-gray-400"
                                    onChange={(e) => {
                                        const file = e.target?.files[0];
                                        if (file) {
                                            setImg(file);
                                        }
                                        setData("url", file);
                                    }}
                                />
                                <InputError
                                    message={errors.url}
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
                                {processing ? "Proses..." : "Tambah Gambar"}
                            </span>
                        </PrimaryButton>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
