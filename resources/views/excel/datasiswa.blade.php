<table>
    <thead>
    <tr>
        <th colspan="5" style="font-weight: bold;" align="center">Data Absensi Smkn 1 Gedangan</th>
    </tr>
    <tr>
        <th align="center" style="font-weight: bold;" colspan="3">Nomor</th>
        <th align="center" colspan="2" style="font-weight: bold;" rowspan="2">Nama</th>
        <th rowspan="2" style="font-weight: bold;" align="center" colspan="1">Aktivasi</th>
    </tr>
    <tr>
        <th align="center" style="font-weight: bold;" width="25">No</th>
        <th align="center" style="font-weight: bold;" width="25">Induk</th>
        <th align="center" style="font-weight: bold;" width="25">Jurusan</th>
    </tr>
    </thead>
    <tbody>
    @foreach($datas as $data)
        <tr>
            <td align="center" width="25">{{ $loop->iteration }}</td>
            <td align="center" width="25">{{ $data["induk"] }}</td>
            <td align="center" width="25">{{ $data["jurusan"] }}</td>
            <td align="center" colspan="2" width="25">{{ $data["nama"] }}</td>
            <td align="center" width="25">{{ $data["aktivasi"] }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
