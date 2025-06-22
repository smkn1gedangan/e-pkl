<!DOCTYPE html>
<html>
<head>
    <title>Data Siswa</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 14px;
        }
        .row {
            display: flex;
            margin-bottom: 6px;
        }
        .label {
            width: 200px;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div>
        <h1 style="text-align: center;">SMKN 1 GEDANGAN</h1>
        <img src="{{ public_path("img/logo.png") }}" style="position: relative;left:50%;transform: translateX(-50%);" width="80" alt="Icon Smknega">
        <table style="margin-top: 1rem;">
            <tbody>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Nama Siswa       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $siswa->name }}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Email       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $siswa->email }}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Kontak       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $siswa->kontak }}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Tempat , Tanggal Lahir       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $siswa->tempat_lahir }},
                            {{ $siswa->tanggal_lahir }}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Jurusan       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $siswa->jurusan?->nama ?? "Belum Diisi"}}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Tahun Ajaran       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $siswa->tahun_ajaran?->tahun?? "Belum Diisi"}}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Tempat Pkl       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $siswa->tempat?->nama ?? "Belum Diisi"}}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Pembimbing Pkl       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $siswa->tempat?->user?->name ?? "Belum Diisi"}}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Jumlah Jurnal       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $siswa->jurnals_count ?? "Belum Pernah" }}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Jumlah Hadir Pkl       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $hadirs ?? "Belum Pernah" }}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Jumlah Sakit Saat Pkl       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $sakits ?? "Belum Pernah" }}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 1rem 3rem;" class="label">     
                        Jumlah Izin Saat Pkl       
                    </td>
                    <td align="left" style="padding: 1rem 3rem;">
                        <div>{{ $izins ?? "Belum Pernah" }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>

</body>
</html>
