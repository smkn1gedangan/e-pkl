import { BarChart, DoughnutChart, LineChart } from "@/Components/Chart";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTypeDashbard } from "@/state/Zustand";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

const Dashboard = () => {
    const { auth, rekapSiswa, rekapPb, statistik } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold mt-8 text-slate-900 text-center">
                Halo {auth.user?.name}, Semoga Hari mu Menyenangkan 🤗
            </h1>
            <div className="flex justify-center mt-8">
                {auth.role === "siswa" && (
                    <div className="w-4/5">
                        <BarChart
                            datas={Object.values(rekapSiswa)}
                            labels={Object.keys(rekapSiswa)}
                        />
                    </div>
                )}
                {auth.role === "pembimbing_sekolah" && (
                    <div className="w-4/5">
                        <BarChart datas={[rekapPb]} labels={["Jumlah Siswa"]} />
                    </div>
                )}
                {auth.role === "pembimbing_pt" && (
                    <div className="w-4/5">
                        <BarChart datas={[rekapPb]} labels={["Jumlah Siswa"]} />
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
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
