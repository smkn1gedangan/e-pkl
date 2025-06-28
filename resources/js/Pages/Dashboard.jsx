import { BarChart, DoughnutChart, LineChart } from "@/Components/Chart";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTypeDashbard } from "@/state/Zustand";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

const Dashboard = () => {
    const { auth, rekapSiswa, rekapPb, statistik } = usePage().props;
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
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold mt-8 text-slate-900 text-center">
                Halo {auth.user?.name}, Semoga Hari mu Menyenangkan 🤗
            </h1>
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
                            datas={rekapPb.map((item) => item.jurnals_count)}
                            labels={rekapPb.map((item) => item.name)}
                        />
                    </div>
                )}
                {auth.role === "pembimbing_pt" && (
                    <div className="w-4/5">
                        <BarChart
                            datas={rekapPb.map((item) => item.jurnals_count)}
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
        </AuthenticatedLayout>
    );
};

export default Dashboard;
