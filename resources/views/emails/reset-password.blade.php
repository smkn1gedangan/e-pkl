<x-mail::message>

halo {{ $nama }}, {{ config("app.name") }} menerima permintaan untuk mereset password akun ini.
<img src="{{ public_path("img/logo.png") }}" alt="logo smknega">

<x-mail::button :url="$url">
Klik Disini Untuk Reset Password
</x-mail::button>

<p>Jika button tidak bisa di klik , klik link dibawah ini</p>
<a class="text-xs" href="$url">$url</a>

<p class="text-xs">Jika Anda tidak meminta reset ini, abaikan saja email ini.</p> <br>
Terima Kasih<br>
{{ config('app.name') }}
</x-mail::message>
