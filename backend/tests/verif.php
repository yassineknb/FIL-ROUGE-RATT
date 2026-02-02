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

function test($name, $result, $expectedCode)
{
    echo "TEST: $name ... ";
    if ($result['code'] === $expectedCode) {
        echo "PASS ({$result['code']})\n";
        return true;
    } else {
        echo "FAIL (Expected $expectedCode, got {$result['code']})\n";
        print_r($result['body']);
        return false;
    }
}

echo "--- STARTING VERIFICATION ---\n";

// 1. Register
$userEmail = 'verif_' . time() . '@example.com';
$res = request('POST', '/auth/register', [
    'name' => 'Verif User',
    'email' => $userEmail,
    'password' => 'password',
    'password_confirmation' => 'password'
]);
test("Register", $res, 201);
$token = $res['body']['data']['token'] ?? null;

if (!$token) {
    echo "FATAL: No token received after register.\n";
    exit(1);
}

// 2. Me
$res = request('GET', '/auth/me', [], $token);
test("Get Me (Auth)", $res, 200);

// 3. Me (No Token)
$res = request('GET', '/auth/me');
test("Get Me (Guest)", $res, 401);

// 4. Create Item
$res = request('POST', '/items', [
    'title' => 'Lost Keys',
    'type' => 'lost',
    'location' => 'Central Park',
    'date' => '2023-10-27',
    'description' => 'Blue keychain'
], $token);
test("Create Item", $res, 201);
$itemId = $res['body']['data']['id'] ?? null;

// 5. Update Item (Owner)
$res = request('PUT', "/items/$itemId", [
    'title' => 'Lost Keys (Updated)',
    'type' => 'lost',
    'location' => 'Central Park',
    'date' => '2023-10-27'
], $token);
test("Update Item (Owner)", $res, 200);

// 6. Public List
$res = request('GET', '/items');
test("Public List", $res, 200);

// 7. Filter List
$res = request('GET', '/items?type=lost');
test("Public List (Filtered)", $res, 200);

// 8. Admin Login
$adminRes = request('POST', '/auth/login', [
    'email' => 'admin@lostfound.test',
    'password' => 'password'
]);

if (test("Admin Login", $adminRes, 200)) {
    $adminToken = $adminRes['body']['data']['token'];

    // 9. Admin List
    $res = request('GET', '/admin/items', [], $adminToken);
    test("Admin List Items", $res, 200);

    // 10. Admin Update Status
    if ($itemId) {
        $res = request('PATCH', "/admin/items/$itemId/status", ['status' => 'resolved'], $adminToken);
        test("Admin Update Status", $res, 200);
    }
}

// 11. Logout
$res = request('POST', '/auth/logout', [], $token);
test("Logout", $res, 200);

// 12. Me after logout
$res = request('GET', '/auth/me', [], $token);
test("Get Me (After Logout)", $res, 401);

echo "--- VERIFICATION COMPLETE ---\n";
