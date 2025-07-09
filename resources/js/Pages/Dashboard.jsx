import { BarChart, DoughnutChart, LineChart } from "@/Components/Chart";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import TitleModal from "@/Components/TitleModal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTypeDashbard } from "@/state/Zustand";
import { Head, useForm, usePage } from "@inertiajs/react";
import { debounce } from "lodash";
import { Info, Search, X } from "lucide-react";
import React, { use, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
    const { auth, rekapSiswa, rekapPb, statistik, userActives, users } =
        usePage().props;
    const isFirstRender = useRef(true);
    const { type: typeDb, setType: setTypeDb } = useTypeDashbard();
    const [modalJurnals, setModalJurnals] = useState(null);
    const [resizeImg, setResizeImg] = useState(null);
    const { data, setData, put } = useForm({
        isVisibilityJurnal: auth.user.isVisibilityJurnal,
    });
    const [panduan, setPanduan] = useState(false);
    const datas = [
        {
            name: "Pengajuan Tempat",
            data: statistik.pengajuanTempat,
            bg: "bg-[rgba(231,192,213,0.4)]",
        },
        {
            name: "Judul Laporan",
            data: statistik.laporan,
            bg: "bg-[rgba(196,192,213,0.4)]",
        },
        {
            name: "Slider / Gambar",
            data: statistik.slider,
            bg: "bg-[rgba(163,243,272,0.4)]",
        },
        {
            name: "Jurusan",
            data: statistik.jurusan,
            bg: "bg-[rgba(200,243,272,0.4)]",
        },
        {
            name: "Tahun Ajaran",
            data: statistik.tahunAjaran,
            bg: "bg-[rgba(297,212,291,0.4)]",
        },
        {
            name: "Jurnal",
            data: statistik.jurnal,
            bg: "bg-[rgba(231,192,110,0.4)]",
        },
    ];
    const handleShowJurnal = (e, id) => {
        e.preventDefault();
        const filtered = users.find((u) => u.id === id);
        if (filtered) {
            setModalJurnals(filtered);
        }
    };
    const handleResizeImg = (e, id) => {
        e.preventDefault();
        const filtered = modalJurnals?.jurnals.find((j) => j.id === id);
        if (filtered) {
            setResizeImg(filtered);
        }
    };
    useEffect(() => {
        let toastId;
        let toastIdFalse;

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (data.isVisibilityJurnal) {
            toastId = toast.loading("Mencari user aktif...");
        } else {
            toastIdFalse = toast.loading("Non aktifkan visibilitas akun...");
        }
        const debuncedSend = debounce(() => {
            put(route("dashboard.update", auth.user.id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.dismiss({ id: toastId });
                    toast.dismiss({ id: toastIdFalse });
                    toast.success("Update berhasil!");
                },
            });
        }, 3000);
        debuncedSend();
        return () => {
            debuncedSend.cancel();
        };
    }, [data.isVisibilityJurnal]);
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <ToastContainer className={"w-96"} />
            {auth.role === "siswa" && (
                <div
                    // style={{ background: "rgba(34, 27, 242,0.4)" }}
                    className="w-full flex justify-between items-center p-3"
                >
                    <span
                        onClick={() => setPanduan(true)}
                        className="inline-flex relative"
                    >
                        <Info className="animate-pulse" />
                    </span>
                    <Modal
                        show={panduan}
                        maxWidth="sm"
                        onClose={() => setPanduan(!panduan)}
                    >
                        <div className="relative bg-white rounded-lg shadow-sm ">
                            <TitleModal
                                icon={<X />}
                                title={"Panduan Visibilitas Akun"}
                                onClick={() => {
                                    setPanduan(!panduan);
                                }}
                            ></TitleModal>
                            <div className="p-4 text-slate-900">
                                <div className="capitalize space-y-4">
                                    <span>
                                        Visibilitas akun adalah fitur yang
                                        memungkinkan Anda untuk mengatur apakah
                                        jurnal Anda dapat dilihat oleh pengguna
                                        lain per <b>jurusan</b>, Jika pengguna
                                        lain mengaktifkan visibilitas akunnya,
                                        Anda dapat melihat jurnal yang mereka
                                        bagikan.
                                    </span>
                                    <hr />
                                    <span className="font-bold">
                                        Fitur ini bisa dijadikan referensi untuk
                                        mengisi jurnal-jurnal berikutnya tanpa
                                        melanggar hak privasi
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <label className="flex items-center cursor-pointer gap-2">
                        <InputLabel
                            className="mx-4"
                            value={"Visibility Account"}
                        />
                        <input
                            type="checkbox"
                            checked={data.isVisibilityJurnal}
                            value={data.isVisibilityJurnal}
                            onChange={() =>
                                setData(
                                    "isVisibilityJurnal",
                                    !data.isVisibilityJurnal
                                )
                            }
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600 "></div>
                    </label>
                </div>
            )}
            {auth.role === "siswa" && auth.user.isVisibilityJurnal === 1 && (
                <div className="flex justify-end pr-4">
                    <SecondaryButton
                        onClick={() => {
                            if (typeDb === "users") {
                                setTypeDb("grafik");
                            } else {
                                setTypeDb("users");
                            }
                        }}
                        className="bg-blue-800 text-white hover:bg-blue-700"
                    >
                        {typeDb === "users" ? "Dashboard" : "Cari Data"}
                    </SecondaryButton>
                </div>
            )}
            <h1 className="text-2xl font-bold mt-8 text-slate-900 text-center">
                Halo {auth.user?.name}, Semoga Hari mu Menyenangkan 🤗
            </h1>
            {typeDb === "users" && auth.user.isVisibilityJurnal === 1 ? (
                <div className="mt-8 overflow-x-auto">
                    {modalJurnals ? (
                        <>
                            <p className="text-center my-4">Jurnal Milik {modalJurnals?.name}</p>
                            <Table
                                headers={[
                                    { nama: "Keterangan" },
                                    { nama: "Kegiatan" },
                                    { nama: "Photo" },
                                    { nama: "Opsi" },
                                ]}
                            >
                                <tbody>
                                    {modalJurnals?.jurnals?.length > 0 ? (
                                        modalJurnals?.jurnals?.map(
                                            (u, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border`}
                                                >
                                                    <td className="px-4 text-center py-4">
                                                        {u.keterangan ===
                                                            "hadir" && (
                                                            <span className="bg-green-100 text-green-800 text-sm font-medium ring-2 me-2 px-2.5 py-0.5 rounded-md ring-green-500">
                                                                {u.keterangan}
                                                            </span>
                                                        )}
                                                        {u.keterangan ===
                                                            "sakit" && (
                                                            <span className="bg-blue-100 text-blue-800 text-sm font-medium ring-2 me-2 px-2.5 py-0.5 rounded-md ring-blue-500">
                                                                {u.keterangan}
                                                            </span>
                                                        )}
                                                        {u.keterangan ===
                                                            "izin" && (
                                                            <span className="bg-red-100 text-red-800 text-sm font-medium ring-2 ring-red-500 me-2 px-2.5 py-0.5 rounded-md">
                                                                {u.keterangan}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 text-center py-4">
                                                        {u.kegiatan}
                                                    </td>
                                                    <td className="px-4 text-center py-4">
                                                        <div className="flex justify-center items-center">
                                                            <img
                                                                onClick={(e) =>
                                                                    handleResizeImg(
                                                                        e,
                                                                        u.id
                                                                    )
                                                                }
                                                                loading="lazy"
                                                                className="w-12 rounded-md h-12 object-cover object-center"
                                                                src={`./storage/${u.photo}`}
                                                                alt="jurnal Photo"
                                                            />
                                                            <Modal
                                                                show={
                                                                    resizeImg?.id ===
                                                                    u.id
                                                                }
                                                                onClose={() =>
                                                                    setResizeImg(
                                                                        null
                                                                    )
                                                                }
                                                                maxWidth="md"
                                                            >
                                                                <div className="rounded-lg bg-white shadow-sm">
                                                                    <TitleModal
                                                                        icon={
                                                                            <X />
                                                                        }
                                                                        title={
                                                                            "Detail Foto"
                                                                        }
                                                                        onClick={() => {
                                                                            setResizeImg(
                                                                                null
                                                                            );
                                                                        }}
                                                                    ></TitleModal>
                                                                    <div className="p-6 flex justify-center">
                                                                        <img
                                                                            className="max-w-xs md:max-w-sm p-2 rounded-md h-auto object-cover object-center"
                                                                            src={`./storage/${u.photo}`}
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Modal>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 text-center py-4">
                                                        <div className="flex justify-center">
                                                            <span
                                                                onClick={(e) =>
                                                                    setModalJurnals(
                                                                        null
                                                                    )
                                                                }
                                                                className="bg-red-100 text-red-800 text-sm font-medium ring-2 ring-red-500 me-2 px-2.5 py-0.5 rounded-md cursor-pointer"
                                                            >
                                                                Back
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                className="py-4 text-center"
                                                colSpan={4}
                                            >
                                                Tidak Ada Jurnal Ditambahkan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </>
                    ) : (
                        <Table
                            headers={[
                                { nama: "No" },
                                { nama: "Nama" },
                                { nama: "Jurusan" },
                                { nama: "Nisn" },
                                { nama: "Opsi" },
                            ]}
                        >
                            <tbody>
                                {userActives?.data.length > 0 ? (
                                    userActives?.data.map((u, index) => (
                                        <tr key={index} className={`border`}>
                                            <td className="px-4 text-center py-4">
                                                {index + userActives.from}
                                            </td>
                                            <td className="px-4 text-center py-4">
                                                {u.name}
                                            </td>
                                            <td className="px-4 text-center py-4">
                                                {u.jurusan.nama}
                                            </td>
                                            <td className="px-4 text-center py-4">
                                                {u.datasiswa.nisn}
                                            </td>
                                            <td className="px-4 text-center py-4">
                                                <div className="flex justify-center">
                                                    <span
                                                        onClick={(e) =>
                                                            handleShowJurnal(
                                                                e,
                                                                u.id
                                                            )
                                                        }
                                                        className="bg-blue-100 text-blue-800 text-sm font-medium ring-2 ring-blue-500 me-2 px-2.5 py-0.5 rounded-md cursor-pointer"
                                                    >
                                                        Lihat
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="py-4 text-center"
                                            colSpan={4}
                                        >
                                            Tidak Ada User Yang Mengaktifkan
                                            Visibilitas Jurnal
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </div>
            ) : (
                <div className="flex justify-center mt-8">
                    {auth.role === "siswa" && (
                        <div className="w-4/5 sm:w-3/5 md:w-2/5 flex justify-center">
                            <DoughnutChart
                                datas={Object.values(rekapSiswa)}
                                labels={Object.keys(rekapSiswa)}
                            />
                        </div>
                    )}
                    {auth.role === "pembimbing_sekolah" && (
                        <div className="w-4/5">
                            <BarChart
                                datas={rekapPb.map(
                                    (item) => item.jurnals_count
                                )}
                                labels={rekapPb.map((item) => item.name)}
                            />
                        </div>
                    )}
                    {auth.role === "pembimbing_pt" && (
                        <div className="w-4/5">
                            <BarChart
                                datas={rekapPb.map(
                                    (item) => item.jurnals_count
                                )}
                                labels={rekapPb.map((item) => item.name)}
                            />
                        </div>
                    )}
                    {auth.role === "admin" && (
                        <div className="w-4/5">
                            <BarChart
                                labels={[
                                    "Tempat",
                                    "Siswa",
                                    "Pembimbing PT",
                                    "Pembimbing Sekolah",
                                ]}
                                datas={[
                                    statistik.tempat,
                                    statistik.siswa,
                                    statistik.pembimbingPt,
                                    statistik.pembimbingSekolah,
                                ]}
                            />
                            <div className="grid grid-cols-3 mt-2 md:mt-6 gap-2">
                                {datas.map((dt, index) => (
                                    <div
                                        key={index}
                                        className={`col-span-3 md:col-span-1 ${dt.bg} h-20 border-gray-600 border-dashed border p-2`}
                                    >
                                        <h1 className="text-black font-extrabold text-2xl text-center">
                                            {dt.data}
                                        </h1>
                                        <p className="text-center">{dt.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Dashboard;
