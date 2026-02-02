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
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); // Fixed syntax

    if (!empty($data)) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return ['code' => $httpCode, 'body' => json_decode($response, true)];
}

// 1. Login User
$res = request('POST', '/auth/login', ['email' => 'user@lostfound.test', 'password' => 'password']);
$userToken = $res['body']['data']['token'];
$userId = $res['body']['data']['user']['id'];

// 2. Create Item to Delete
$res = request('POST', '/items', [
    'title' => 'Delete Me',
    'type' => 'lost',
    'location' => 'Trash',
    'date' => '2023-01-01'
], $userToken);
$itemId = $res['body']['data']['id'];

// 3. User Delete (Owner)
$res = request('DELETE', "/items/$itemId", [], $userToken);
if ($res['code'] === 200 || $res['code'] === 204) {
    echo "User Delete Message: " . ($res['body']['message'] ?? 'OK') . "\n";
    echo "User Delete: PASS ({$res['code']})\n";
} else {
    echo "User Delete: FAIL ({$res['code']})\n";
}

// 4. Login Admin
$res = request('POST', '/auth/login', ['email' => 'admin@lostfound.test', 'password' => 'password']);
$adminToken = $res['body']['data']['token'];

// 5. Create Item for Admin to Delete
$res = request('POST', '/items', [
    'title' => 'Admin Delete Me',
    'type' => 'lost',
    'location' => 'Trash',
    'date' => '2023-01-01'
], $userToken); // User creates it
$itemId2 = $res['body']['data']['id'];

// 6. Admin Delete
$res = request('DELETE', "/admin/items/$itemId2", [], $adminToken);
if ($res['code'] === 200 || $res['code'] === 204) {
    echo "Admin Delete Message: " . ($res['body']['message'] ?? 'OK') . "\n";
    echo "Admin Delete: PASS ({$res['code']})\n";
} else {
    echo "Admin Delete: FAIL ({$res['code']})\n";
    print_r($res['body']);
}
