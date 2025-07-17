<?php

namespace App\Exports;

use App\Models\ListC;
use Maatwebsite\Excel\Concerns\FromCollection;

class ListExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ListC::all();
    }
}
