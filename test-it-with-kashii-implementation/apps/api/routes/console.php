<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment('Kashii: Observe -> Plan -> Act -> Collect Evidence -> Verify -> Classify -> Report -> Retest');
})->purpose('Display an inspiring quote');
