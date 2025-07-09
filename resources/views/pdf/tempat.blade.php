<!DOCTYPE html>
<html>
<head>
    <title>{{ $tempat->nama }}</title>
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
        <table style="margin-top: 1rem;">
            <tbody>
                <tr>
                    <td align="left" style="padding: 0.5rem 3rem;" class="label">     
                        Nama Tempat Du/Di       
                    </td>
                    <td align="left" style="padding: 0.5rem 3rem;">
                        <div>{{ $tempat->nama }}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 0.5rem 3rem;" class="label">     
                        Kontak       
                    </td>
                    <td align="left" style="padding: 0.5rem 3rem;">
                        <div>{{ $tempat->kontak }}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 0.5rem 3rem;" class="label">     
                        Bidang Usaha 
                    </td>
                    <td align="left" style="padding: 0.5rem 3rem;">
                        <div>{{ $tempat->bidang_usaha }}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 0.5rem 3rem;" class="label">     
                        Lokasi     
                    </td>
                    <td align="left" style="padding: 0.5rem 3rem;">
                        <div>{{ $tempat->lokasi }}
                            </div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 0.5rem 3rem;" class="label">     
                        Nama Pembimbing       
                    </td>
                    <td align="left" style="padding: 0.5rem 3rem;">
                        <div>{{ $tempat->user?->name ?? "Belum Diisi"}}</div>
                    </td>
                </tr>
                <tr>
                    <td align="left" style="padding: 0.5rem 3rem;" class="label">     
                        Siswa     
                    </td>
                    <td align="left" style="padding: 0.5rem 3rem;">
                        @foreach ($tempat->siswas as $s)
                            <div>{{ $s->name ?? "Belum Diisi" }} <br>
                            - <span style="font-weight: bold;">Jurusan: &nbsp;</span> {{ $s->jurusan->nama ?? "Belum Diisi" }} <br>
                            - <span style="font-weight: bold;">Nisn: &nbsp;</span>{{ $s->dataSiswa->nisn ?? "Belum Diisi" }} <br>
                        </div>
                        @endforeach
                    </td>
                </tr>
            </tbody>
        </table>
      </div>

</body>
</html>
