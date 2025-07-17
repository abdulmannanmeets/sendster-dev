<?php

namespace App\Exports;

use App\Models\Smtp;
use Maatwebsite\Excel\Concerns\FromCollection;

class SmtpExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Smtp::all();
    }
}
