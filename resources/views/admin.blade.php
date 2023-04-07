<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Admin Dashboard</title>

    @viteReactRefresh
    @vite('resources/js/admin/app.jsx')
</head>
<body>
<div id="app"></div>
</body>
</html>
