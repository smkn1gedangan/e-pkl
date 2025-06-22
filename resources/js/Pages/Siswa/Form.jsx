import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TitlePage from "@/Components/TitlePage";
import { Alert } from "@/Helpers/Alert";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useGetProvince, useGetRegencies } from "@/services/api_call";
import { Head, useForm } from "@inertiajs/react";
import { ArrowLeft, ClipboardList, Edit, Plus, QuoteIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Form = ({
    jurusans,
    tahunAjarans,
    pembimbing_sekolahs,
    isEdit,
    user,
    tempats,
    dataSiswas,
}) => {
    const { data: provinceData } = useGetProvince();
    const [provinceId, setProvinceId] = useState("35");
    const { data: regenciesData } = useGetRegencies(provinceId);
    const { data, setData, errors, post, processing, reset, put } = useForm({
        nisn: isEdit ? user?.data_siswa.nisn : "",
        email: isEdit ? user.email : "",
        tempat_lahir: isEdit ? user.tempat_lahir : "",
        tanggal_lahir: isEdit ? user.tanggal_lahir : "",
        tahunAjaran_id: isEdit ? user?.tahun_ajaran?.id : "",
        jurusan_id: isEdit ? user?.jurusan?.id : "",
        pembimbing_sekolah_id: isEdit ? user.pb_skl?.id : "",
        tempat_id: isEdit ? user.tempat?.id : "",
        kontak: isEdit ? user.kontak : "",
        password: "",
        password_confirmation: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("siswa.update", user.id), {
                onSuccess: (sccs) => {
                    if (sccs.props.auth?.flash.success) {
                        toast.success(`${sccs.props.auth.flash?.success}`);
                    } else {
                        toast.error(`${sccs.props.auth.flash?.error}`);
                    }
                },
            });
        } else {
            post(route("siswa.store"), {
                onSuccess: (sccs) => {
                    if (sccs.props.auth?.flash.success) {
                        setData("email", "");
                        setData("tahunAjaran_id", "");
                        setData("jurusan_id", "");
                        setData("tempat_lahir", "");
                        setData("pembimbing_sekolah_id", "");
                        setData("tempat_id", "");
                        setData("kontak", "");
                        setData("password", "");
                        setData("password_confirmation", "");
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
            <Head title="Tambah Siswa" />
            <ToastContainer className={`w-96`} />

            <TitlePage
                title={"Siswa"}
                quote={`${
                    isEdit ? "edit " : "tambah"
                }  data siswa , sistem rekap kegiatan pkl secara digital`}
                nameRoute={"Kembali Ke list"}
                onClick={() => (window.location.href = route("siswa.index"))}
                icon={<ClipboardList />}
            ></TitlePage>
            <div className="p-2">
                <form onSubmit={handleSubmit} className="p-4 md:p-8">
                    <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2 p-2">
                        <div className="col-span-1 space-y-3">
                            <div className="">
                                <InputLabel value={"Siswa Ter Data"} />
                                <select
                                    onChange={(e) =>
                                        setData("nisn", e.target.value)
                                    }
                                    value={data.nisn}
                                    disabled={isEdit}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option value="">default</option>
                                    {dataSiswas.length > 0 &&
                                        dataSiswas.map((ds) => (
                                            <option key={ds.id} value={ds.nisn}>
                                                {ds.nama} | {ds.nisn}
                                            </option>
                                        ))}
                                </select>

                                <InputError
                                    message={errors.nisn}
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
                            <div className="">
                                <InputLabel value={"Tempat Lahir"} />
                                <select
                                    onChange={(e) =>
                                        setProvinceId(e.target.value)
                                    }
                                    value={provinceId}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1 "
                                >
                                    {provinceData &&
                                        provinceData.map((province) => (
                                            <option
                                                key={province.id}
                                                value={province.id}
                                            >
                                                {province.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            {provinceId !== "" && (
                                <div className="">
                                    <select
                                        onChange={(e) =>
                                            setData(
                                                "tempat_lahir",
                                                e.target.value
                                            )
                                        }
                                        value={data.tempat_lahir}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    >
                                        <option value="">Default</option>
                                        {regenciesData &&
                                            regenciesData.map((reg) => (
                                                <option
                                                    key={reg.id}
                                                    value={reg.name}
                                                >
                                                    {reg.name}
                                                </option>
                                            ))}
                                    </select>

                                    <InputError
                                        message={errors.tempat_lahir}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-span-1 space-y-3">
                            <div>
                                <InputLabel
                                    className="text-white"
                                    htmlFor="tanggal_lahir"
                                    value="Tanggal Lahir"
                                />

                                <TextInput
                                    id="tanggal_lahir"
                                    type="date"
                                    value={data.tanggal_lahir}
                                    className="mt-1 block w-full"
                                    autoComplete="tanggal_lahir"
                                    onChange={(e) =>
                                        setData("tanggal_lahir", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.tanggal_lahir}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <InputLabel value={"Pembimbing Dari Sekolah"} />
                                <select
                                    onChange={(e) =>
                                        setData(
                                            "pembimbing_sekolah_id",
                                            e.target.value
                                        )
                                    }
                                    value={data.pembimbing_sekolah_id}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option value="">Default</option>

                                    {pembimbing_sekolahs.length > 0 &&
                                        pembimbing_sekolahs.map((skl) => (
                                            <option key={skl.id} value={skl.id}>
                                                {skl.name}
                                            </option>
                                        ))}
                                </select>

                                <InputError
                                    message={errors.pembimbing_sekolah_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <InputLabel value={"Tempat Du/Di"} />
                                <select
                                    onChange={(e) =>
                                        setData("tempat_id", e.target.value)
                                    }
                                    value={data.tempat_id}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                                >
                                    <option value="">Default</option>

                                    {tempats.length > 0 &&
                                        tempats.map((tempat) => (
                                            <option
                                                key={tempat.id}
                                                value={tempat.id}
                                            >
                                                {tempat.nama}
                                            </option>
                                        ))}
                                </select>

                                <InputError
                                    message={errors.tempat_id}
                                    className="mt-2"
                                />
                            </div>

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
                                    <InputLabel value={" Password (wajib)"} />
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
                                        value={" Konfirmasi (wajib) Password"}
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
                                <span className="block">
                                    {processing
                                        ? "Proses..."
                                        : isEdit
                                        ? "Ubah"
                                        : "Tambah"}
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
