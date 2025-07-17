<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sendster mailing template</title>
</head>
<body>
    {!! $body !!}

    @if($unsubscribe !== "")
        <div style="text-align: center; border:1px solid black; padding: 8px 2px; margin:0;">
            {!! $unsubscribe !!}
        </div>
    @endif
</body>
</html>