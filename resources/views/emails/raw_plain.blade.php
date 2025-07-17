{{ \Illuminate\Support\Str::of(
    isset($plain_content) ? $plain_content : (isset($content) ? $content : '')
)->replaceMatches('/<[^>]+>/', '') }}