<?php
session_start();
include_once '../config/database.php';
include_once '../models/User.php';

class AuthController {
    private $db;
    private $user;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->user = new User($this->db);
    }

    public function register() {
        if (isset($_POST['register'])) {
            $this->user->name = $_POST['name'];
            $this->user->email = $_POST['email'];
            $this->user->password = $_POST['password'];

            if ($this->user->register()) {
                header("Location: ../views/login.php");
            } else {
                echo "Error al registrar";
            }
        }
    }

    public function login() {
        if (isset($_POST['login'])) {
            $this->user->email = $_POST['email'];
            $this->user->password = $_POST['password'];

            if ($this->user->login()) {
                $_SESSION['user_id'] = $this->user->id;
                $_SESSION['user_name'] = $this->user->name;
                header("Location: ../views/dashboard.php");
            } else {
                echo "Email o contraseña incorrectos";
            }
        }
    }

    public function logout() {
        session_destroy();
        header("Location: ../views/login.php");
    }
}

$controller = new AuthController();

if (isset($_POST['register'])) {
    $controller->register();
} elseif (isset($_POST['login'])) {
    $controller->login();
} elseif (isset($_GET['logout'])) {
    $controller->logout();
}
?>
