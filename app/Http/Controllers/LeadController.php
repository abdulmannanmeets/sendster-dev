<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LeadController extends Controller
{
    public $columnsVerifyDefault = [
        'list_id' => true,
        'name' => true,
        'email' => true,
        'created_at' => true,
    ];
    public $columnsLeadDefault = [
        'id' => true,
        'list_id' => true,
        'name' => true,
        'email' => true,
        'extra_fields' => true,
        'source' => true,
        'verified' => true,
        'valid' => true,
        'created_at' => true,
    ];

    public $columnsDefault = [];

    public function __construct(Request $request)
    {
        $this->columnsDefault = $request['verify'] ? $this->columnsVerifyDefault : $this->columnsLeadDefault;
    }

    public function init(Request $request)
    {

        if (isset($request['columnsDef']) && is_array($request['columnsDef'])) {
            foreach ($request['columnsDef'] as $field) {
                $columnsDefault[$field] = true;
            }
        }

        // get all raw data
        $alldata = $this->getJsonDecode($request);

        $data = [];
        // internal use; filter selected columns only from raw data
        foreach ($alldata as $d) {
            $data[] = $this->filterArray($d, $this->columnsDefault);
        }

        // filter by general search keyword
        if (isset($request['search']['value']) && $request['search']['value']) {
            $data = $this->arraySearch($data, $request['search']['value']);
        }

        // count data
        $totalRecords = $totalDisplay = count($data);

        // sort
        if (isset($request['order'][0]['column']) && $request['order'][0]['dir']) {
            $column = $request['order'][0]['column'];
            $dir    = $_REQUEST['order'][0]['dir'];
            usort($data, function ($a, $b) use ($column, $dir) {
                $a = array_slice($a, $column, 1);
                $b = array_slice($b, $column, 1);
                $a = array_pop($a);
                $b = array_pop($b);

                if ($dir === 'asc') {
                    return $a > $b ? 1 : -1;
                }

                return $a < $b ? 1 : -1;
            });
        }

        // pagination length
        if (isset($request['length'])) {
            $data = array_splice($data, $request['start'], $request['length']);
        }

        $data = $this->reformat($data);

        $result = [
            'recordsTotal'    => $totalRecords,
            'recordsFiltered' => $totalDisplay,
            'data'            => $data,
        ];

        return $result;
    }

    public function filterArray($array, $allowed = [])
    {
        return array_filter(
            $array,
            function ($val, $key) use ($allowed) { // N.b. $val, $key not $key, $val
                return isset($allowed[$key]) && ($allowed[$key] === true || $allowed[$key] === $val);
            },
            ARRAY_FILTER_USE_BOTH
        );
    }

    public function filterKeyword($data, $search, $field = '')
    {
        $filter = '';
        if (isset($search['value'])) {
            $filter = $search['value'];
        }
        if (!empty($filter)) {
            if (!empty($field)) {
                if (strpos(strtolower($field), 'date') !== false) {
                    // filter by date range
                    $data = $this->filterByDateRange($data, $filter, $field);
                } else {
                    // filter by column
                    $data = array_filter($data, function ($a) use ($field, $filter) {
                        return (boolean) preg_match("/$filter/i", $a[$field]);
                    });
                }

            } else {
                // general filter
                $data = array_filter($data, function ($a) use ($filter) {
                    return (boolean) preg_grep("/$filter/i", (array) $a);
                });
            }
        }

        return $data;
    }

    public function filterByDateRange($data, $filter, $field)
    {
        // filter by range
        if (!empty($range = array_filter(explode('|', $filter)))) {
            $filter = $range;
        }

        if (is_array($filter)) {
            foreach ($filter as &$date) {
                // hardcoded date format
                $date = date_create_from_format('m/d/Y', stripcslashes($date));
            }
            // filter by date range
            $data = array_filter($data, function ($a) use ($field, $filter) {
                // hardcoded date format
                $current = date_create_from_format('m/d/Y', $a[$field]);
                $from    = $filter[0];
                $to      = $filter[1];
                if ($from <= $current && $to >= $current) {
                    return true;
                }

                return false;
            });
        }

        return $data;
    }

    public function getJsonDecode($request): mixed
    {
        if($request['email_type'] == "Verified") {
            return Lead::where([[DB::raw("md5(list_id)"), "=", $request['list_id']], ['verified', '=', 1], ["confirmed", "=", 1]])->select("list_id", "name", "email", "created_at")->get()->toArray();
        } else if($request['email_type'] == "Unverified") {
            return Lead::where([[DB::raw("md5(list_id)"), "=", $request['list_id']], ['verified', '=', 0], ["confirmed", "=", 1]])->select("list_id", "name", "email", "created_at")->get()->toArray();
        }

        return Lead::where([[DB::raw("md5(list_id)"), "=", $request['list_id']], ["confirmed", "=", 1]])->select("id", "list_id", "name", "email", "extra_fields", "source", "verified as valid", "created_at")->get()->toArray();
    }

    /**
     * @param  array  $data
     *
     * @return array
     */
    public function reformat($data): array
    {
        return array_map(function ($item) {
            if(isset($item['id'])) {
                $item['id'] = md5($item['id']);
            }
            $item['list_id'] = md5($item['list_id']);
            $item['created_at'] = changeDateTime($item['created_at']);

            return $item;
        }, $data);
    }

    public function arraySearch($array, $keyword)
    {
        return array_filter($array, function ($a) use ($keyword) {
            return (boolean) preg_grep("/$keyword/i", (array) $a);
        });
    }
}
