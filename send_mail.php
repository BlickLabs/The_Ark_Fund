<?php
error_reporting(E_ALL);

require './vendor/autoload.php';
use Mailgun\Mailgun;

$name = $_POST['contact-name'];
$email = $_POST['contact-email'];
$type = $_POST['contact-type'];
$msg = $_POST['contact-message'];


/* Desarrollo */
$api_key = 'key-eb656047b090ea091ef7c5d2fbd83dc5';
// $send_to = '';
$send_to = 'luis@mavericks.capital';

$mgClient = new Mailgun($api_key);
$domain = "mg.mavericks.capital";

error_log("Antes de enviar el mail", 0);

    $result = $mgClient->sendMessage($domain, array(
        'from' => 'Mavericks - Notificaciones <postmaster@'. $domain .'>',
        'to' => $send_to,
        'subject' => 'Nuevo contacto',
        'text' =>

        'Hola equipo de Mavericks.

        ' . $name . ' a enviado un nuevo mensaje

        Los datos son los siguientes

        Nombre del cliente: ' . $name . '
        Correo electrónico: ' . $email. '
        Tipo: ' . $type. '
        Mensaje:
        '. $msg .'',
        'html' =>
        '<html>Hola equipo de Mavericks. <br>

        Los datos son los siguientes
        <ul>
        <li>Nombre del cliente: ' . $name . '</li>
        <li>Correo electrónico: ' . $email. '</li>
        <li>Tipo: ' . $type. '</li>
        <li>Mensaje: <p>'. $msg .'</p> </li>
        </ul>
        <hr>
        </html>'
    ));

$message = '<div class="alert alert-success" role="alert">¡Tu mensaje ha sido enviado, pronto nos pondremos en contacto contigo!</div>';
echo $message;

?>
