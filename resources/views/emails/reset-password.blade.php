<x-mail::message>

halo {{ $nama }}, {{ config("app.name") }} menerima permintaan untuk mereset password akun ini.

<x-mail::button :url="$url">
Klik Disini Untuk Reset Password
</x-mail::button>

<a href="$url">Jika button tidak bisa di klik , klik link ini</a>

Jika Anda tidak meminta reset ini, abaikan email saja ini. <br>
Thanks Smkn 1 Gedangan,<br>
{{ config('app.name') }}
</x-mail::message>
