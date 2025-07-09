<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SessionDeleted extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'session:prune-custom';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Session Deleted automaticly';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $lifetime = config('session.lifetime'); // dalam menit

        $expiredTimestamp = now()->subMinutes($lifetime)->timestamp;

        $deleted = DB::table("sessions")->where("last_activity","<",$expiredTimestamp)->delete();

        Log::channel("deleteSession")->info("Sesi dihapus Pada " . now()->format("d-m-Y h-i-s"));

        $this->info("{$deleted} expired session(s) deleted.");
    }
}
