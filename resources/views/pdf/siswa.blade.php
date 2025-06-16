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
        <div class="row">
            <div class="label">Nama Calon Siswa</div>
            <div>{{ $siswa->name }}</div>
        </div>
        <div class="row">
            <div class="label">Email</div>
            <div>{{ $siswa->email }}</div>
        </div>
        <div class="row">
            <div class="label">Kontak</div>
            <div>{{ $siswa->kontak }}</div>
        </div>
        <div class="row">
            <div class="label">Tempat, Tanggal Lahir</div>
            <div>
                {{ $siswa->tempat_lahir }},
                {{ $siswa->tanggal_lahir }},
            </div>
        </div>
        <div class="row">
            <div class="label">Jurusan</div>
            <div>{{ $siswa->jurusan?->nama ?? "Belum Diisi"}}</div>
        </div>
      
        <div class="row">
            <div class="label">Tahun Ajaran</div>
            <div>{{ $siswa->tahun_ajaran?->tahun?? "Belum Diisi"}}</div>
        </div>
       
        <div class="row">
            <div class="label">Tempat Pkl</div>
            <div>{{ $siswa->tempat?->nama ?? "Belum Diisi"}}</div>
        </div>
        <div class="row">
            <div class="label">Pembimbing Pkl</div>
            <div>{{ $siswa->tempat?->user?->name ?? "Belum Diisi"}}</div>
        </div>
        <div class="row">
            <div class="label">Pembimbing Sekolah</div>
            <div>{{ $siswa->pb_skl?->name ?? "Belum Diisi" }}</div>
        </div>
      </div>

</body>
</html>
