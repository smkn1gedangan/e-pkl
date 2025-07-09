<table>
    <thead>
    <tr>
        <th colspan="7" style="font-weight: bold; text-transform: uppercase;" align="center">Data jurnal Smkn 1 Gedangan</th>
    </tr>
    <tr>
        <th align="center" style="font-weight: bold;" >No</th>
        <th align="center" style="font-weight: bold;" width="25">Nama</th>
        <th align="center" style="font-weight: bold;" width="25">Keterangan</th>
        <th align="center" style="font-weight: bold;" width="25">Kegiatan</th>
        <th align="center" style="font-weight: bold;" width="25">Dibuat Pada</th>
        <th align="center" style="font-weight: bold;" width="25">Dlihat Pembimbing</th>
        <th align="center" style="font-weight: bold;" width="25">Tanda Tangan</th>
    </tr>
    </thead>
    <tbody>
    @foreach($siswas as $s)
        <tr>
            <td align="center">{{ $loop->iteration }}</td>
            <td align="center" width="25">{{ $s["user"]->name }}</td>
            <td align="center" width="25">{{ $s["keterangan"] }}</td>
            <td align="center" width="25">{{ $s["kegiatan"] }}</td>
            <td align="center" width="25">{{ Carbon\Carbon::parse($s["created_at"])->format("d-m-Y H:i:s") }}</td>
            <td align="center" width="25">{{ $s["dilihat"] ? "sudah":"belum" }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
