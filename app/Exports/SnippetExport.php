<?php

namespace App\Exports;

use App\Models\Snippet;
use Maatwebsite\Excel\Concerns\FromCollection;

class SnippetExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Snippet::all();
    }
}
