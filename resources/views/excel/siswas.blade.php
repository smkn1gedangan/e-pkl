<table>
    <thead>
    <tr>
        <th colspan="15" style="font-weight: bold; text-transform: uppercase;" align="center">Data Absensi Smkn 1 Gedangan</th>
    </tr>
    <tr>
        <th align="center" style="font-weight: bold;" >No</th>
        <th align="center" style="font-weight: bold;" width="25">Nama</th>
        <th align="center" style="font-weight: bold;" width="25">Nisn</th>
        <th align="center" style="font-weight: bold;" width="25">Email</th>
        <th align="center" style="font-weight: bold;" width="25">TTL</th>
        <th align="center" style="font-weight: bold;" width="25">Kontak</th>
        <th align="center" style="font-weight: bold;" width="25">Jurusan</th>
        <th align="center" style="font-weight: bold;" width="25">Tahun Ajaran</th>
        <th align="center" style="font-weight: bold;" width="25">Tempat</th>
        <th align="center" style="font-weight: bold;" width="25">Pembimbing Pt</th>
        <th align="center" style="font-weight: bold;" width="25">Pembimbing Sekolah</th>
        <th align="center" style="font-weight: bold;" width="25">Judul Laporan</th>
        <th align="center" style="font-weight: bold;">Jumlah Jurnal</th>
        <th align="center" style="font-weight: bold;">Nilai</th>
    </tr>
    </thead>
    <tbody>
    @foreach($siswas as $s)
        <tr>
            <td align="center">{{ $loop->iteration }}</td>
            <td align="center" width="25">{{ $s["name"] }}</td>
            <td align="center" width="25">{{ $s["dataSiswa"]?->nisn }}</td>
            <td align="center" width="25">{{ $s["email"] }}</td>
            <td align="center" width="25">{{ $s["tempat_lahir"] ." ," .$s["tanggal_lahir"] }}</td>
            <td align="center" width="25">{{ $s["kontak"] }}</td>
            <td align="center" width="25">{{ $s["jurusan"]->nama ?? "Belum Diisi" }}</td>
            <td align="center" width="25">{{ $s["tahunAjaran"]->tahun ??"Belum Diisi" }}</td>
            <td align="center" width="25">{{ $s["tempat"]->nama ?? "Belum Ada" }}</td>
            <td align="center" width="25">{{ $s["tempat"]->user->name ?? "Belum Ada" }}</td>
            <td align="center" width="25">{{ $s["pbSkl"]->name ?? "Belum Ada" }}</td>
            <td align="center" width="25">{{ $s["laporan"]->judul ?? "Belum Ada" }}</td>
            <td align="center">{{ $s->jurnals_count ?? 0 }}</td>
            <td align="center">
                @if(count($s["nilai"]) > 0)
                    @foreach ( $s["nilai"] as $n )
                        {{ $n->nilai}} ,
                    @endforeach
                @endif
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
