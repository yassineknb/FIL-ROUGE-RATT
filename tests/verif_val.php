<?php

$baseUrl = 'http://localhost:8000/api';

function request($method, $endpoint, $data = [], $token = null)
{
    global $baseUrl;
    $url = $baseUrl . $endpoint;
    $ch = curl_init($url);

    $headers = [
        'Content-Type: application/json',
        'Accept: application/json',
    ];
    if ($token) {
        $headers[] = "Authorization: Bearer $token";
    }

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    if (!empty($data)) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return ['code' => $httpCode, 'body' => json_decode($response, true)];
}

echo "--- VALIDATION CHECK ---\n";

// Login to get token
$res = request('POST', '/auth/login', [
    'email' => 'user@lostfound.test',
    'password' => 'password'
]);
$token = $res['body']['data']['token'] ?? null;

if (!$token) {
    die("Login failed\n");
}

// Invalid Create (Empty Title)
$res = request('POST', '/items', [
    'title' => '',
    'type' => 'lost',
    'location' => 'Somewhere',
    'date' => '2023-01-01'
], $token);

if ($res['code'] === 422) {
    echo "Validation PASS (422)\n";
    print_r($res['body']);
} else {
    echo "Validation FAIL ({$res['code']})\n";
    print_r($res['body']);
}
