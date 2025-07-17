<?php

namespace App\Http\Controllers;

use App\Models\Segments;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Segment extends Controller
{
    public function index(Request $request)
    {
        if ($request->type == "get") {
            return $this->getAll();
        }

        if ($request->type == "get_details") {
            return $this->getDetails($request);
        }

        if ($request->type == "create" || $request->type == "update") {
            return $this->createAndUpdate($request);
        }

        if ($request->type == "delete") {
            return $this->deleteSegment($request);
        }
    }

    public function getAll($is_md5 = true)
    {
        $segments = Segments::orderBy('id', 'desc')->get()->toArray();
        foreach ($segments as $key => $value) {
            $segments[$key]['id']  = $is_md5 ? md5($value['id']) : $value['id'];
            $segments[$key]['created_at'] = changeDateTime($value['created_at']);
            $segments[$key]['subscribers'] = count(self::getCustomers(md5($value['id'])));
            unset($segments[$key]['segment_data']);
        }

        return $segments;
    }

    public function getDetails($request)
    {
        $request->validate([
            "id" => "required"
        ]);

        $segments_data = Segments::where(DB::raw("md5(id)"), "=", $request->id)->first();
        $data = $this->getCustomers($request->id);
        return array(
            "title" => $segments_data->title,
            "segment_data" => $segments_data->segment_data,
            "data" => $data,
        );
    }

    public function createAndUpdate($request)
    {
        $request->validate([
            "id" => ["required"],
            "title" => ["required"],
            "segment_data" => ["required", "array"],
        ]);

        $id = $request->id;

        if ($request->type == "create") {
            $id = Segments::insertGetId([
                "title" => $request->title,
                "segment_data" => json_encode($request->segment_data),
            ]);
            $id = md5($id);
        } else if ($request->type == "update") {
            $update = Segments::where(DB::raw("md5(id)"), $request->id)->update([
                "title" => $request->title,
                "segment_data" => json_encode($request->segment_data),
            ]);
        }
        $data = self::getCustomers($id);
        return array(
            "status" => 1,
            "message" => array(
                "title" => $request->title,
                "segment_data" => $request->segment_data,
                "data" => $data,
                "update" => $update ?? 0
            )
        );
    }

    public function getCustomers($id)
    {
        $data = Segments::where(DB::raw("md5(id)"), $id)->first();
        $data = json_decode($data->segment_data);
        $leads_table = DB::table('leads');

        foreach ($data as $conditionSet) {
            $leads_table->where(function ($query) use ($conditionSet) {
                $orConditions = $conditionSet->and->or;

                foreach ($orConditions as $condition) {
                    $column = $condition->condition;
                    $operator = $condition->middle_condition;
                    $value = $condition->last_condition;

                    switch ($operator) {
                        case 'is':
                            $query->where($column, $value);
                            break;
                        case 'is_not':
                            $query->where($column, '!=', $value);
                            break;
                        case 'contains':
                            $query->where($column, 'LIKE', '%' . $value . '%');
                            break;
                        case 'does_not_contain':
                            $query->where($column, 'NOT LIKE', '%' . $value . '%');
                            break;
                        case 'starts_with':
                            $query->where($column, 'LIKE', $value . '%');
                            break;
                        case 'ends_with':
                            $query->where($column, 'LIKE', '%' . $value);
                            break;
                        case 'does_not_starts_with':
                            $query->where($column, 'NOT LIKE', $value . '%');
                            break;
                        case 'does_not_ends_with':
                            $query->where($column, 'NOT LIKE', '%' . $value);
                            break;
                        default:
                            break;
                    }
                }
            });
        }

        $leads_table_data = $leads_table->where('is_error', '!=', 1)->get();

        if($leads_table_data) {
            $leads_table_data = $leads_table_data->toArray();
            for($i=0; $i<count($leads_table_data); $i++) {
                $leads_table_data[$i]->id = md5($leads_table_data[$i]->id);
                $leads_table_data[$i]->list_id = md5((int) $leads_table_data[$i]->list_id);
                $leads_table_data[$i]->created_at = changeDateTime($leads_table_data[$i]->created_at);
            }
        } else {
            $leads_table_data = [];
        }

        return $leads_table_data;
    }

    function deleteSegment($request)
    {
        $status = Segments::whereIn(DB::raw('md5(id)'), $request['ids'])->delete();
        return [
            'status' => $status
        ];
    }
}
