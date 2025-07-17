<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class NotInstalled
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(isInstalled()) {
            if(basename($request->fullUrl()) == "install") {
                return redirect()->route("dashboard");
            }
            return redirect()->route(basename($request->fullUrl()));
        }
        return $next($request);
    }
}
