<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\ListC;
use App\Models\Subscription;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubscriptionController extends Controller
{
    function index(Request $request)
    {
        if ($request['type'] == 'get') return self::get_all($request['get_type']);
        if ($request['type'] == 'get_setup') return self::get_setup($request['form_id']);
        elseif ($request['type'] == 'create') return self::create_form($request);
        elseif ($request['type'] == 'update') return self::update_form($request);
        elseif ($request['type'] == 'delete') return self::delete_form($request);
        elseif ($request['type'] == 'get_embed_form') return self::get_embed_form($request);
    }

    function create_form($request)
    {
        $request->validate([
            'form_name' => ['required', 'string'],
            'form_title' => ['required', 'string'],
            'select_list' => ['required', 'string'],
        ]);

        $subs = new Subscription();
        $subs->form_name = $request['form_name'];
        $subs->form_title = $request['form_title'];
        $subs->form_type = $request['form_type'];
        $subs->redirect_after_subs = json_encode($request['redirect_after_subs']);
        $subs->select_list = $request['select_list'];
        $subs->delay_time = $request['delay_time'];
        $subs->custom_inputs = json_encode($request['custom_inputs']);
        $subs->style = json_encode($request['style']);
        $subs->subscribe_button = $request['subscribe_button'];
        $subs->form_description = $request['form_description'];
        $subs->hide_after_subs = $request['hide_after_subs'];
        $status = $subs->save();

        $message = array(
            'id' => md5($subs->id),
            'created_at' => $subs->created_at->format('Y-m-D H:i:s')
        );

        return array(
            'status' => $status,
            'message' => $message
        );
    }

    function update_form($request)
    {
        $request->validate([
            'form_id' => 'required',
        ]);
        $status = 0;
        $message = "Lead updated successfully";

        $form_id = $request['form_id'];
        $id = self::validateAndReturnId($form_id, 0, "");
        $form = Subscription::find($id);
        if ($form) {
            $form->form_name = $request['form_name'];
            $form->form_title = $request['form_title'];
            $form->form_type = $request['form_type'];
            $form->redirect_after_subs = json_encode($request['redirect_after_subs']);
            $form->select_list = $request['select_list'];
            $form->delay_time = $request['delay_time'];
            $form->custom_inputs = json_encode($request['custom_inputs']);
            $form->style = json_encode($request['style']);
            $form->subscribe_button = $request['subscribe_button'];
            $form->form_description = $request['form_description'];
            $form->hide_after_subs = $request['hide_after_subs'];
            $form->updated_at = time();
            $status = $form->save();
            $form->touch();
        }

        return array(
            'status' => $status,
            'message' => $message
        );
    }

    function delete_form($request)
    {
        $request->validate([
            'id' => 'required'
        ]);

        Subscription::whereIn(DB::raw('md5(id)'), $request['id'])->delete();
        return self::get_all('form');
    }

    function get_all($get_type, $is_md5 = true)
    {
        $encode = ($get_type === 'list')
            ? ListC::orderBy('id', 'desc')->get()->toArray()
            : Subscription::orderBy('id', 'desc')->get()->toArray();

        $encode = array_map(function ($item) use ($is_md5) {
            $item['id'] = $is_md5 ? md5($item['id']) : $item['id'];
            $item['created_at'] = changeDateTime($item['created_at']);
            $item['total_leads'] = 0;

            return $item;
        }, $encode);

        $idList = array_column($encode, 'id');

        $leadCounts = Lead::whereIn('subs_id', $idList)
            ->where('confirmed', '=', 1)
            ->selectRaw('subs_id, COUNT(*) as count')
            ->groupBy('subs_id')
            ->get()
            ->keyBy('subs_id');

        foreach ($encode as &$item) {
            if ($leadCounts->has($item['id'])) {
                $item['total_leads'] = number_format($leadCounts[$item['id']]['count']);
            }
        }

        return array(
            'status' => 1,
            'message' => $encode
        );
    }

    function get_setup($form_id)
    {
        $status = 0;
        $message = array();
        $get_all = self::get_all("subs")['message'];
        foreach ($get_all as $key => $value) {
            if ($form_id == $value['id']) {
                $status = 1;
                $message = $value;
                break;
            }
        }

        return array(
            'status' => $status,
            'message' => $message
        );
    }

    function validateAndReturnId($list_id, $id, $is = "lead")
    {
        $int_id = 0;
        if ($is == "lead") {
            $lead = self::get_all($list_id, FALSE)['message'];
            foreach ($lead as $key => $value) {
                if (md5($value['id']) == $id) {
                    $int_id = $value['id'];
                    break;
                }
            }
        } else {
            $list = self::get_all("", false)['message'];
            foreach ($list as $key => $value) {
                if (md5($value['id']) == $list_id) {
                    $int_id = $value['id'];
                    break;
                }
            }
        }
        return $int_id;
    }

    function get_embed_form($request)
    {
        if (isset($request['embed'])) {
            $request->validate([
                'form_id' => 'required'
            ]);
        }
        $snippet_ob = new SnippetController();

        $input_field = "";
        $id = $request['form_id'];
        $setup_data = self::get_setup($id)['message'];
        $form_inputs = json_decode($setup_data['custom_inputs'], true);
        $style = json_decode($setup_data['style'], true);
        $button_text = $setup_data['subscribe_button'];
        $form_description = $snippet_ob->replaceSnippetShortcode($setup_data['form_description']);
        $form_inputs_field = "";
        $form_type = $setup_data['form_type'];
        $title = $setup_data['form_title'];
        $div_id = time() . $id;
        $div_id = $div_id . str_shuffle($div_id . 'sdfghjkvbnijh');
        $form_description = strlen($form_description > 0) ? '<div>' . $form_description . '</div>' : null;
        // $custom_css = $style['custom_css'] === null ? "" : $style['custom_css'];
        $custom_css = "";
        $custom_css = str_replace('.custom_mlr', '#sendster_contact_form_card_' . $div_id, $custom_css);

        // Generate the form inputs
        foreach ($form_inputs as $key => $value) {
            $label = $value['label'];
            $type = $value['type'];
            $placeholder = $value['placeholder'] ?? "";
            $default_value = $value['default'] ?? "";
            $name = isset($value['name']) ? $value['name'] : '';
            $required = $value['required'] == 'true' ? 'required="required"' : '';
            $label_required = $value['required'] == 'true' ? 'required' : '';
            if ($type == 'text' || $type == 'number' || $type == 'email' || $type == 'hidden') {
                $input_field .= $name . ',';
                $form_inputs_field .= '<div class="mb-6"><label class="form-label mb-3 ' . $label_required . '">' . $label . '</label>';
                $form_inputs_field .= '<input type="' . $type . '" class="form-control" ' . $required . ' placeholder="' . $placeholder . '" name="' . $name . '" value="' . $default_value . '"></div>';
            } else if ($type == "textarea") {
                $input_field .= $name . ',';
                $form_inputs_field .= '<div class="mb-6"><label class="form-label mb-3 ' . $label_required . '">' . $label . '</label>';
                $form_inputs_field .= '<textarea rows="7" class="form-control" ' . $required . ' name="' . $name . '" placeholder="' . $placeholder . '" value="' . $default_value . '" autocomplete="off"></textarea></div>';
            } else if ($type == "radio") {
                $input_field .= $name . ',';
                $form_inputs_field .= '<div class="mb-6"><label class="form-label mb-3 ' . $label_required . '">' . $label . '</label>';
                $form_inputs_field .= '<input type="radio" class="form-check-input" style="margin-left:1rem;" name="' . $name . '" ' . $required . ' value="' . $default_value . '"></div>';
            } else if ($type == 'checkbox') {
                $input_field .= $name . ',';
                $form_inputs_field .= '<div class="mb-6"><label class="form-label mb-3 ' . $label_required . '">' . $label . '</label>';
                $form_inputs_field .= '<input type="checkbox" class="form-check-input" style="margin-left:1rem;" name="' . $name . '" ' . $required . ' value="' . $default_value . '"></div>';
            }
        }
        $input_field = strlen($input_field) > 0 ? trim($input_field, ',') : '';
        $install_url = site_url();
        $action = $install_url . '/api/subscription_form';

        $form = !$form_type ? '
            <div class="card" id="sendster_contact_form_card_' . $div_id . '">
                <div class="card-body">
                    <div class="container">
                        <form class="form mb-15" method="post" action="' . $action . '" id="sendster_contact_form_' . $div_id . '">
                            <h1 class="fw-bolder text-dark mb-9 title">' . $title . '</h1>
                            ' . $form_description . '
                            <input type="hidden" name="form_id" value="' . $id . '">
                            ' . $form_inputs_field . '
                            <div class="mb-6">
                                <div class="error-msg d-none">Something went wrong.</div>
                                <div class="success-msg d-none">Something went wrong.</div>
                            </div>
                            <button type="submit" id="sendster_submit" class="btn" name="sendster_submit">
                                <span class="indicator-label">' . $button_text . '</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        ' : '
        <div id="sendster_contact_form_card_' . $div_id . '" class="modal">
            <div class="modal-content top-animation">
                <div class="modal-header">
                    <h2>' . $title . '</h2>
                    <span class="close">×</span>
                </div>
                <div class="modal-body">
                    <form class="form" method="post" action="' . $action . '" id="sendster_contact_form_' . $div_id . '">
                        ' . $form_description . '
                        <input type="hidden" name="form_id" value="' . $id . '">
                        ' . $form_inputs_field . '
                        <div class="mb-6">
                            <div class="error-msg d-none">Something went wrong.</div>
                            <div class="success-msg d-none">Something went wrong.</div>
                        </div>
                        <button type="submit" id="sendster_submit" class="btn" name="sendster_submit">
                            <span class="indicator-label">' . $button_text . '</span>
                            <span class="indicator-progress">Please wait...
                            <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    ';

        // Generate CSS code
        $style_code = !$form_type ? "
        <style>
        #sendster_contact_form_card_$div_id {background-color: " . $style['form_background_color'] . " !important; border-radius: 25px !important; padding: 20px 10px !important; max-width: inherit !important;}" : "
        <style>
        #sendster_contact_form_card_$div_id .modal-content{background-color: " . $style['form_background_color'] . " !important;}";
        $style_code .= "
        #sendster_contact_form_card_$div_id .d-none, #sendster_contact_form_card_$div_id.d-none{display: none !important}
        #sendster_contact_form_card_$div_id input, #sendster_contact_form_card_$div_id textarea{width: -webkit-fill-available !important}
        @media (min-width: 1200px) {#sendster_contact_form_card_$div_id .container {width: 1170px !important;}}
        @media (min-width: 992px) {#sendster_contact_form_card_$div_id .container {width: 970px !important;}}
        @media (min-width: 768px) {#sendster_contact_form_card_$div_id .container {width: 750px !important;}}
        #sendster_contact_form_card_$div_id .container {font-family: Poppins, Helvetica, sans-serif !important;padding-right: 15px !important;padding-left: 15px !important;margin-right: auto !important;margin-left: auto !important;}
        #sendster_contact_form_card_$div_id .form-group {margin-bottom: 1rem !important;}
        #sendster_contact_form_card_$div_id .mb-6 {margin-bottom: 1.5rem !important;}
        #sendster_contact_form_card_$div_id .form-control::placeholder {color: #a1a5b7}
        #sendster_contact_form_card_$div_id .form-control::-moz-placeholder {color: #a1a5b7;opacity: 1}
        #sendster_contact_form_card_$div_id .form-control:active,
        #sendster_contact_form_card_$div_id .form-control:focus {background-color: #eef3f7;border-color: #eef3f7;color: #5e6278;outline: none !important;box-shadow: none;transition: color .2s ease, background-color .2s ease}
        #sendster_contact_form_card_$div_id .form-control {padding: .525rem 1.5rem;font-size: 1.15rem;border-radius: 0.625rem;display: block;width: 100%;font-weight: 500;line-height: 1.5;background-clip: padding-box;border: 1px solid #e4e6ef;appearance: none;background-color: #f5f8fa;border-color: #f5f8fa;color: #5e6278;box-shadow: none;transition: color .2s ease, background-color .2s ease;}
        #sendster_contact_form_card_$div_id label {font-size: 1.05rem !important;font-weight: 500 !important;color: #3f4254 !important;display: inline-block !important;margin-bottom: 0.5rem !important;}
        #sendster_contact_form_card_$div_id .text-center {text-align: center !important;}
        #sendster_contact_form_card_$div_id .mb-3 {margin-bottom: 0.75rem !important;}
        #sendster_contact_form_card_$div_id button,#sendster_contact_form_card_$div_id input,#sendster_contact_form_card_$div_id select,#sendster_contact_form_card_$div_id textarea {margin: 0;font-family: inherit;font-size: inherit;line-height: inherit}
        #sendster_contact_form_card_$div_id .indicator-progress {display: none}
        #sendster_contact_form_card_$div_id [data-kt-indicator=on]>.indicator-progress {display: inline-block}
        #sendster_contact_form_card_$div_id [data-kt-indicator=on]>.indicator-label {display: none}
        #sendster_contact_form_card_$div_id .required:after { content: '*'; position: relative; font-size: inherit; color: #f1416c; padding-left: .25rem;font-weight: 700}
        #sendster_contact_form_card_$div_id .btn {display: inline-block;font-weight: 500;line-height: 1.5;color: #181c32;text-align: center;vertical-align: middle;cursor: pointer;user-select: none;background-color: transparent;border: 1px solid transparent;font-size: 1.1rem;border-radius: 0.475rem;transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;border: 0;padding: calc(0.75rem + 1px) calc(1.5rem + 1px);}
        #sendster_contact_form_card_$div_id .title{background-color: " . $style['title_background_color'] . " !important; color: " . $style['title_color'] . " !important; font-size: " . $style['title_size'] . "px !important;}
        #sendster_contact_form_card_$div_id button.btn{background-color: " . $style['btn_background_color'] . " !important; color: " . $style['btn_color'] . " !important;}
        #sendster_contact_form_card_$div_id .info-msg,#sendster_contact_form_card_$div_id .success-msg,#sendster_contact_form_card_$div_id .warning-msg,#sendster_contact_form_card_$div_id .error-msg {margin: 10px 0;padding: 10px;border-radius: 3px 3px 3px 3px;}
        #sendster_contact_form_card_$div_id .info-msg {color: #059;background-color: #BEF;}
        #sendster_contact_form_card_$div_id .success-msg {color: #FFFFFF;background-color: #50cd89;}
        #sendster_contact_form_card_$div_id .warning-msg {color: #9F6000;background-color: #FEEFB3;}
        #sendster_contact_form_card_$div_id .error-msg {color: #FFFFFF;background-color: #f1416c;}
        #sendster_contact_form_card_$div_id #sendster_submit:disabled {cursor: not-allowed}";

        if ($form_type) {
            $style_code .= "
            #sendster_contact_form_card_$div_id .shake {animation: shake 0.5s;}
            @keyframes shake {0% {transform: translate(1px, 1px) rotate(0deg);}10% {transform: translate(-1px, -2px) rotate(-1deg);}20% {transform: translate(-3px, 0px) rotate(1deg);}30% {transform: translate(3px, 2px) rotate(0deg);}40% {transform: translate(1px, -1px) rotate(1deg);}50% {transform: translate(-1px, 2px) rotate(-1deg);}60% {transform: translate(-3px, 1px) rotate(0deg);}70% {transform: translate(3px, 1px) rotate(-1deg);}80% {transform: translate(-1px, -1px) rotate(1deg);}90% {transform: translate(1px, 2px) rotate(0deg);}100% {transform: translate(1px, -2px) rotate(-1deg);}}
            #sendster_contact_form_card_$div_id.modal {position: fixed;z-index: 1;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0, 0, 0);background-color: rgba(0, 0, 0, 0.4);}
            #sendster_contact_form_card_$div_id .modal-content {font-family: Arial, Helvetica, sans-serif;position: relative;background-color: #fefefe;margin: auto;padding: 0;border-radius: .475rem !important;border: 1px solid #888;width: 80%;max-width: 800px !important;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);}
            #sendster_contact_form_card_$div_id .top-animation {-webkit-animation-name: animatetop;-webkit-animation-duration: 0.4s;animation-name: animatetop;animation-duration: 0.4s}
            @-webkit-keyframes animatetop {
              from {top: -300px;opacity: 0}
              to {top: 0;opacity: 1}
            }
            @keyframes animatetop {
              from {top: -300px;opacity: 0}
              to {top: 0;opacity: 1}
            }
            #sendster_contact_form_card_$div_id .close {opacity: 0.5;color: black;float: right;font-size: 28px;font-weight: bold;}
            #sendster_contact_form_card_$div_id .close:hover,.close:focus {opacity: 1;text-decoration: none;cursor: pointer;}
            #sendster_contact_form_card_$div_id .modal-header {padding: 2px 16px;color: black;display: flex;align-items: center;border-bottom: 1px solid #eff2f5;justify-content: space-between !important;}
            #sendster_contact_form_card_$div_id .modal-body {padding: 2px 16px;margin:1.25rem!important;}
            ";
        }

        if (strlen($custom_css) > 0) {
            $style_code = "$custom_css";
        }

        $style_code .= "</style>
        ";

        $form = $form . $style_code;

        return array('message' => trim($form));
    }
}
