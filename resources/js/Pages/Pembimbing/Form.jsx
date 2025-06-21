import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TitlePage from "@/Components/TitlePage";
import { Alert } from "@/Helpers/Alert";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { ArrowLeft, ClipboardList, Edit, Plus, QuoteIcon } from "lucide-react";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Form = ({ jurusans, tahunAjarans, tempats, isEdit, user }) => {
    const { data, setData, errors, post, processing, reset, put } = useForm({
        name: isEdit ? user.name : "",
        email: isEdit ? user.email : "",
        password: "",
        tahunAjaran_id: isEdit ? user?.tahun_ajaran?.id : "",
        jurusan_id: isEdit ? user?.jurusan?.id : "",
        kontak: isEdit ? user.kontak : "",
        password_confirmation: "",
        role: isEdit ? user?.roles[0]?.name : "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("pembimbing.update", user.id), {
                onSuccess: (sccs) => {
                    if (sccs.props.auth?.flash.success) {
                        toast.success(`${sccs.props.auth.flash?.success}`);
                    } else {
                        toast.error(`${sccs.props.auth.flash?.error}`);
                    }
                },
            });
        } else {
            post(route("pembimbing.store"), {
                onSuccess: (sccs) => {
                    if (sccs.props.auth?.flash.success) {
                        setData("email", "");
                        setData("jurusan_id", "");
                        setData("kontak", "");
                        setData("name", "");
                        setData("password", "");
                        setData("password_confirmation", "");
                        setData("role", "");
                        setData("tahunAjaran_id", "");
                        toast.success(`${sccs.props.auth.flash?.success}`);
                    } else {
                        toast.error(`${sccs.props.auth.flash?.error}`);
                    }
                },
            });
        }
    };
    return (
        <AuthenticatedLayout>
            <Head title="Tambah Pembimbing" />
            <ToastContainer className={`w-96`} />
            <TitlePage
                title={"Pembimbing"}
                quote={`${
                    isEdit ? "edit " : "tambah"
                }  data pembimbing ,sistem rekap kegiatan pkl secara digital`}
                nameRoute={"Kembali Ke list"}
                onClick={() =>
                    (window.location.href = route("pembimbing.index"))
                }
                icon={<ClipboardList />}
            ></TitlePage>
            <div className="p-2">
                {" "}
                <form onSubmit={handleSubmit} className="p-4 md:p-8">
                    <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2 p-2">
                        <div className="col-span-1 space-y-3">
                            <div className="">
                                <InputLabel value={" Nama (wajib)"} />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <InputLabel value={" Email (wajib)"} />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <InputLabel value={"Tahun Ajaran"} />
                                <select
                                    onChange={(e) =>
                                        setData(
                                            "tahunAjaran_id",
                                            e.target.value
                                        )
                                    }
                                    value={data.tahunAjaran_id}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option value="">Default</option>

                                    {tahunAjarans.length > 0 &&
                                        tahunAjarans.map((ta) => (
                                            <option key={ta.id} value={ta.id}>
                                                {ta.tahun}
                                            </option>
                                        ))}
                                </select>

                                <InputError
                                    message={errors.tahunAjaran_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <InputLabel value={"Jurusan"} />
                                <select
                                    onChange={(e) =>
                                        setData("jurusan_id", e.target.value)
                                    }
                                    value={data.jurusan_id}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
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

                                <InputError
                                    message={errors.jurusan_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1 space-y-3">
                            {isEdit ? (
                                <div className="">
                                    <InputLabel
                                        value={`Role (Tidak Bisa Diubah Karena Keambiguan Data Ketika Diubah)`}
                                    />
                                    <TextInput
                                        id="role"
                                        type="text"
                                        name="role"
                                        disabled={isEdit}
                                        value={data.role}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.role}
                                        className="mt-2"
                                    />
                                </div>
                            ) : (
                                <div className="">
                                    <InputLabel value={"Role (Wajib)"} />
                                    <select
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                        value={data.role}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                    >
                                        <option disabled value="">
                                            Default
                                        </option>
                                        <option value="pembimbing_pt">
                                            Pembimbing Pt
                                        </option>
                                        <option value="pembimbing_sekolah">
                                            Pembimbing Sekolah
                                        </option>
                                    </select>

                                    <InputError
                                        message={errors.role}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                            <div className="">
                                <InputLabel value={" Kontak (wajib)"} />
                                <TextInput
                                    id="kontak"
                                    type="text"
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
                            {!isEdit && (
                                <div className="">
                                    <InputLabel
                                        value={" Password (wajib / Kata Bebas)"}
                                    />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                            {!isEdit && (
                                <div className="">
                                    <InputLabel
                                        value={" Konfirmasi Password (wajib)"}
                                    />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-span-1">
                            {" "}
                            <PrimaryButton
                                type="submit"
                                className="gap-2"
                                disabled={processing}
                            >
                                {isEdit ? <Edit /> : <Plus />}
                                <span className="hidden sm:block">
                                    {processing
                                        ? "Proses..."
                                        : isEdit
                                        ? "Ubah Pembimbing"
                                        : "Tambah Pembimbing"}
                                </span>
                            </PrimaryButton>
                        </div>
                    </div>
                </form>{" "}
            </div>
        </AuthenticatedLayout>
    );
};

export default Form;
