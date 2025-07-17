<?php

namespace App\Http\Controllers;

use App\Exports\SnippetExport;
use App\Models\Snippet;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class SnippetController extends Controller
{
    function index(Request $request)
    {
        if ($request['snippet_type'] == 'get') return self::get_all();
        elseif ($request['snippet_type'] == 'create') return self::create_snippet($request);
        elseif ($request['snippet_type'] == 'edit') return self::edit_snippet($request);
        elseif ($request['snippet_type'] == 'delete') return self::delete_snippet($request);
        elseif ($request['snippet_type'] == 'get_only_content') return self::get_only_content($request);

    }

    function create_snippet($request)
    {
        $request->validate([
            'snippet_title' => ['required', 'string']
        ]);

        $snippets = new Snippet();
        $snippets->title = $request['snippet_title'];
        $snippets->content = $request['snippet_content'];
        $snippets->save();

        $message = array(
            'id' => md5($snippets->id),
            'created_at' => $snippets->created_at->format('d F Y')
        );

        return array(
            'status' => 1,
            'value_message' => $message,
            'message' => 'Snippet created successfully'
        );
    }

    function edit_snippet($request)
    {
        $request->validate([
            'snippet_id' => 'required',
            'snippet_title' => 'required',
        ]);

        $get_all = self::get_all(false)['message'];

        foreach($get_all as $key => $value) {
            if($request['snippet_id'] === md5($value['id'])) {
                $id = $get_all[$key]['id'];
                $find_data = Snippet::find($id);
                $find_data->title = $request['snippet_title'];
                $find_data->content = $request['snippet_content'];
                $find_data->save();

                $find_data->touch();
                break;
            }
        }

        return array(
            'status' => 1,
            'value_message' => '',
            'message' => "Snippet updated successfully"
        );
    }

    function delete_snippet($request)
    {
        $request->validate([
            'id' => 'required'
        ]);

        $explode_id = $request['id'];
        $status = Snippet::whereIn(DB::raw('md5(id)'), $explode_id)->delete();

        return array(
            'status' => $status,
        );
    }

    function get_only_content($request)
    {
        $content = Snippet::where(DB::raw('MD5(id)'), "=", $request['id'])->get('content');

        return json_encode(array(
                'status' => 1,
                'content' => $content
        ));
    }

    function get_all($is_md5 = true)
    {
        $encode = Snippet::orderBy('id', 'desc')->get()->toArray();

        foreach ($encode as $id => $value) {
            $encode[$id]['id'] = $is_md5 ? md5($value['id']) : $value['id'];
            $encode[$id]['created_at'] = changeDateTime($value['created_at']);
        }

        return array(
            'status' => 1,
            'message' => $encode
        );
    }

    function upload_tiny(Request $request)
    {
        $request->validate(([
            'file' => 'required'
        ]));

        $status = 0;
        $name = "";
        $url = "";

        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $files = $request->file('file');
            $name = $files->getClientOriginalName();
            $extension = $files->getClientOriginalExtension();

            $temp_name = str_replace("." . $extension, "", $name);
            $name = $temp_name . "_" . time() . "." . $extension;
            $status = $files->storeAs('tiny', $name, 'public');
            $url = get_option('install_url') . '/tiny_upload/' . $name;
        }
        return array(
            'status' => $status,
            'name' => $name,
            'location' => $url
        );
    }

    function replaceSnippetShortcode($body = "")
    {
        preg_match('#[snippet (.+?)]#is', $body, $matches);
        $matches = array_unique(array_filter($matches, function($key) { return $key % 2 != 0;}, ARRAY_FILTER_USE_KEY));
        $all_snippet = self::get_all()['message'];
        foreach($all_snippet as $key => $value) {
            if(in_array($value['id'], $matches)) {
               $body = str_replace("[snippet ".$value['id']."]", $value['content'], $body);
            }
        }
        return $body;
    }
}
