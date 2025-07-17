<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\ListC;
use App\Models\MailSendingReport;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DashboardController extends Controller
{
    function index(Request $request)
    {
        if ($request->type == "delete") {
            return self::deleteMail($request);
        }
        $composed = MailSendingReport::distinct('attempt')->count();
        $delivered = MailSendingReport::whereIn('status', [1, 2])->count();
        $seen = MailSendingReport::where('status', '=', 2)->count();
        $subscribers = Lead::where([["subs_id", "!=", '0'], ["confirmed", "=", 1]])->count();
        $report = MailSendingReport::distinct()->orderByDesc('id')->take(10)->get("attempt")->toArray();

        $report_data = [];

        foreach ($report as $key => $value) {
            $attempt_id = $value['attempt'];
            $latest_mail = MailSendingReport::select('id', 'created_at', 'subject', 'body')
                ->where('attempt', '=', $attempt_id)
                ->orderByDesc('id')
                ->first();

            if (!$latest_mail) {
                continue; // Skip if no mail found
            }

            $report_data[$key] = [
                'id' => md5($latest_mail->id),
                'created_at' => changeDateTime($latest_mail->created_at, 'd-m-Y H:i:s'),
                'subject' => $latest_mail->subject,
                'body' => $latest_mail->body,
                'attempt' => $attempt_id,
                'sent' => MailSendingReport::where("attempt", '=', $attempt_id)->whereIn('status', [1, 2, 5])->count(),
            ];

            $bounces = MailSendingReport::where("attempt", '=', $attempt_id)->where('status', 5)->count();
            $opened = MailSendingReport::where([["attempt", '=', $attempt_id], ["status", '=', 2]])->count();
            $unseen = $report_data[$key]['sent'] - $opened;

            $report_data[$key]['bounces'] = ($report_data[$key]['sent'] > 0) ?
                $bounces . " (" . number_format(($bounces / $report_data[$key]['sent']) * 100, 0) . "%)" :
                "0 (0%)";

            $report_data[$key]['opened'] = ($report_data[$key]['sent'] > 0) ?
                $opened . " (" . number_format(($opened / $report_data[$key]['sent']) * 100, 0) . "%)" :
                "0 (0%)";

            $report_data[$key]['unopened'] = ($report_data[$key]['sent'] > 0) ?
                $unseen . " (" . number_format(($unseen / $report_data[$key]['sent']) * 100, 0) . "%)" :
                "0 (0%)";
        }
        $third_day_record = self::getThirtyDayData($request);
        return [
            "composed" => number_format($composed),
            "delivered" => number_format($delivered),
            "seen" => number_format($seen),
            "subscribers" => number_format($subscribers),
            "report" => $report_data,
            "thiry_day_record" => $third_day_record
        ];
    }

    function error(Request $request)
    {
        if ($request['type'] == "delete_all" || $request['type'] == "delete_from_list") {
            return self::deleteMail($request);
        }
        $data = getTableData($request, 'mail_sending_reports', ["status" => 0], ['status' => 5]);
        $report = $data['data'];
        foreach ($report as $key => $value) {
            $list_id = json_decode($value['list_id'], true);
            $report[$key]['id'] = md5($value['id']);
            $list_id = (gettype($list_id) == "string") ? [md5((int)$list_id)] : $list_id;
            $list_data = ListC::whereIn(DB::raw("md5(id)"), $list_id)->pluck('id', 'title')->map(function ($id) {
                return md5($id);
            })->toArray();
            $report[$key]['list_id'] = $list_data;
            $report[$key]['list_id'] = array($list_data, $value['attempt']);
            $report[$key]['created_at'] = changeDateTime($report[$key]['created_at'], 'd-m-Y H:i:s');
        }
        return [
            'recordsTotal' => $data['recordsTotal'],
            'recordsFiltered' => $data['recordsFiltered'],
            'data' => $report
        ];
    }

    function getThirtyDayData($request)
    {
        $is_search = $request['search'] ?? false;
        $start_date = date('Y-m-d 00:00:00', strtotime($request['startDate'] ?? '-29 days'));
        $end_date = date('Y-m-d 23:59:59', strtotime($request['endDate'] ?? 'now'));
        $difference = $request['difference'] ?? 29;
        $last_thirty_days = [];

        for ($i = $difference; $i >= 0; $i--) {
            $date = date('Y-m-d', strtotime($end_date . "-$i days"));
            $last_thirty_days[$date] = ['sent' => 0, 'opens' => 0, 'unsubs' => 0];
        }

        $reports = MailSendingReport::whereBetween('created_at', [$start_date, $end_date])
            ->whereIn('status', [1, 2, 3])
            ->select(DB::raw('DATE(created_at) as date'), 'status')
            ->get();

        foreach ($reports as $report) {
            $date = $report->date;
            $status = $report->status;
            if (isset($last_thirty_days[$date])) {
                if ($status == 1 || $status == 2 || $status == 3) {
                    $last_thirty_days[$date]['sent']++;
                    if ($status == 2 || $status == 3) {
                        $last_thirty_days[$date]['opens']++;
                    }
                    if ($status == 6) {
                        $last_thirty_days[$date]['unsubs']++;
                    }
                }
            }
        }

        $last_thirty_days = array_map(function ($date, $stats) {
            return ['date' => date('d M Y', strtotime($date))] + $stats;
        }, array_keys($last_thirty_days), $last_thirty_days);

        return array_values($last_thirty_days);
    }

    function history(Request $request)
    {
        $request->validate([
            'type' => ['required']
        ]);

        $existingColumns = Schema::getColumnListing('mail_sending_reports');
        $columns = [];
        foreach ($request->input('columns') as $key => $value) {
            if (!empty($value['data']) && in_array($value['data'], $existingColumns)) {
                $columns[] = $value['data'];
            }
        }

        $requet_type = $request->input('type');

        if ($requet_type == "delete") {
            return self::deleteMail($request);
        }

        $query = DB::table('mail_sending_reports')->select('attempt');
        if ($request->has('type') && $request->input('type') == "seen") {
            $query->where('status', '=', 2);
        }
        if ($request->has('type') && $request->input('type') == "sent") {
            $query->where('status', '=', 1);
        }

        $query->selectRaw('attempt as id')
            ->selectRaw('GROUP_CONCAT(DISTINCT campaign_id) as campaign_id')
            ->selectRaw('GROUP_CONCAT(DISTINCT subject) as subject')
            ->selectRaw('GROUP_CONCAT(DISTINCT status) as status')
            ->selectRaw('created_at')
            ->selectRaw('COUNT(*) as sent')
            ->selectRaw('SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) as opened')
            ->selectRaw('COUNT(*) - SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) as unopened')
            ->selectRaw('0 as clicked')
            ->selectRaw('SUM(CASE WHEN status = 6 THEN 1 ELSE 0 END) as unsubscribed')
            ->selectRaw('SUM(CASE WHEN status = 5 THEN 1 ELSE 0 END) as bounced')
            ->groupBy('attempt');

        // Apply searching if a search term is provided
        if ($request->has('search')) {
            $search = $request->input('search')['value'];

            if (strlen($search) > 0) {
                $query->where(function ($query) use ($columns, $search) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'like', '%' . $search . '%');
                    }
                });
            }
        }

        // Get the total count of all records
        $recordsFiltered = DB::table(DB::raw("({$query->toSql()}) as sub"))->mergeBindings($query)->count();

        // Pagination
        $length = $request->input('length') ?? 10;
        $start = $request->input('start') ?? 0;
        $query->skip($start)->take($length);

        // Sorting
        $orderColumn = $request->has('columnFilter') ? $request->input('columnFilter') : 'id';
        $orderDirection = isset($request->input('order')[0]['dir']) ? $request->input('order')[0]['dir'] : 'desc';
        $query->orderBy($orderColumn, $orderDirection);

        // Get the count of filtered records
        $recordsTotal = DB::table(DB::raw("({$query->toSql()}) as sub"))->mergeBindings($query)->count();
        $history_data = $query->get()->toArray();

        return [
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
            'data' => $history_data,
        ];
    }

    function deleteMail($request)
    {
        if ($request['type'] == "delete_all") {
            $is = DB::table('mail_sending_reports')->delete();
        } else {
            $id = $request['id'];
            $is = MailSendingReport::whereIn('attempt', $id)->delete();
        }
        return [
            'status' => $is
        ];
    }

    function deleteFromList($request)
    {
        $status = Lead::where("email", "=", $request['email'])->whereIn(DB::raw("md5(id)"), $request['id'])->delete();
        return ['status' => $status];
    }
}
