# Lost & Found API (Laravel 10)

This is a RESTful API for a Lost & Found application, built with Laravel 10. It supports user authentication, role management (User/Admin), and CRUD operations for lost/found items.

## 🚀 Installation

1.  **Clone the repository** (if not already done).
2.  **Install Dependencies**:
    ```bash
    composer install
    ```
3.  **Environment Setup**:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    *Configure your `.env` with your database credentials (DB_DATABASE=lost_found).*

4.  **Database & Seeders**:
    ```bash
    php artisan migrate --seed
    ```
    *This will create the database schema and seed an admin and demo user.*

5.  **Serve**:
    ```bash
    php artisan serve
    ```
    API will be available at `http://localhost:8000`.

## 🧪 Running Tests

Run the feature tests to verify functionality:

```bash
php artisan test
```

## 📮 Manual Testing (Postman)

You can manually test the API using **Postman**. 

- **Header**: Add `Authorization: Bearer <your-token>` for protected routes.
- **Base URL**: `http://localhost:8000/api`

Refer to the **Endpoints** section below for available routes.

## 🔑 Authentication (Sanctum)

All protected routes require a Bearer Token.

- **Header**: `Authorization: Bearer <your-token>`

### Roles
- **User**: Can Create, Read, Update/Delete (Own/Self).
- **Admin**: Can Read All, Update Status, Delete Any.

### Credentials (Seeder)
- **Admin**: `admin@lostfound.test` / `password`
- **User**: `user@lostfound.test` / `password`

## 📚 API Endpoints

### Auth
- `POST /api/auth/register` - {name, email, password, password_confirmation}
- `POST /api/auth/login` - {email, password}
- `POST /api/auth/logout` (Auth)
- `GET /api/auth/me` (Auth)

### Items (Public)
- `GET /api/items` - List items.
  - Queries: `?type=lost|found`, `?location=Paris`, `?page=1`
- `GET /api/items/{id}` - Show item details.

### Items (Private - Auth)
- `POST /api/items` - Create item. {title, type, location, date, ...}
- `PUT /api/items/{id}` - Update item (Owner only).
- `DELETE /api/items/{id}` - Delete item (Owner only).
- `GET /api/my/items` - List my items.

### Admin (Auth + Role: Admin)
- `GET /api/admin/items` - View all items.
- `PATCH /api/admin/items/{id}/status` - {status: 'resolved'}
- `DELETE /api/admin/items/{id}` - Delete any item.

## 🔗 Documentation Links
- [Laravel Sanctum](https://laravel.com/docs/10.x/sanctum)
- [Laravel Authorization](https://laravel.com/docs/10.x/authorization)
- [CORS Configuration](https://laravel.com/docs/10.x/routing#cross-origin-resource-sharing-cors)
- [PHPUnit Testing](https://laravel.com/docs/10.x/testing)
