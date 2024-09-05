<pre data-source="prism.js" class="language-php line-numbers tabcontent">
    <code class="language-php">// Middleware to track page views
->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        \Pirsch\Http\Middleware\TrackPageview::class,
    ]);
})

// Or track page views manually
Pirsch::track();

// Send custom events
Pirsch::track(
    name: 'Button clicked',
    meta: [
        'Label' => 'Get started',
    ],
);</code>
</pre>
