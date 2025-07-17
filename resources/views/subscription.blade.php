<!DOCTYPE html>
<html lang="en">

<head>
    <base href="">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="{{ URL::asset('/favicon.ico') }}">
    <title>Sendster</title>

    <style>
        html {
            margin: 0;
            padding: 0;
        }

        
    </style>
</head>

<body>
    <div class="container" id="">
        <div class="text-center">
            <h1 class="mb-3">This is title of the form</h1>
        </div>
        <div>
            <p style="text-align: center;">This is the form description</p>
        </div>
        <div class="mb-6">
            <label class="form-label mb-3">
                <span class="required">Enter your email</span>
            </label>
            <input type="email" class="form-control" name="email" placeholder="Enter email" autocomplete="off">
        </div>
        <div class="mb-6">
            <label class="form-label mb-3">
                <span class="">Enter your name</span>
            </label>
            <input type="text" class="form-control" name="name" placeholder="Enter name" autocomplete="off">
        </div>
        <div class="mb-6">
            <label class="form-label mb-3">
                <span class="">Enter your address</span>
            </label>
            <textarea rows="7" class="form-control" name="address" placeholder="Enter address" autocomplete="off"></textarea>
        </div>
        <div class="mb-6">
            <label class="form-label mb-3">
                <span class="">Enter your phone number</span>
            </label>
            <input type="number" class="form-control" name="phone" placeholder="Enter phone number" autocomplete="off">
        </div>
        <div class="mb-6">
            <label class="form-label mb-3">
                <span class="required">Are you a student?</span>
            </label>
            <input class="form-check-input" name="occupation" type="checkbox" style="margin-left: 1rem;">
        </div>
        <div class="text-center">
            <button type="button" class="btn btn-primary" style="background-color: rgb(0, 158, 247); color: rgb(255, 255, 255);">
                <span class="indicator-label">Subscribe</span>
                <span class="indicator-progress">Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
            </button>
        </div>
    </div>
</body>

</html>