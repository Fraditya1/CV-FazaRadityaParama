<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"]));

    // Check that data was sent
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

    // Set the recipient file
    $file = '../messages.txt';

    // Build the content
    $content = "Name: $name
";
    $content .= "Email: $email
";
    $content .= "Message:
$message

";
    $content .= "---------------------

";

    // Save the data to the file
    if (file_put_contents($file, $content, FILE_APPEND | LOCK_EX)) {
<<<<<<< HEAD
        // Send a success response as JSON
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'success',
            'name' => $name,
            'message' => $message
        ]);
=======
        // Redirect to a success page (or back to contact page)
        header("Location: ../index.html?status=success#contact");
>>>>>>> b669f641dd6542a4d45d0f48a832e88916b493a0
        exit;
    } else {
        // Set a 500 (internal server error) response code
        http_response_code(500);
<<<<<<< HEAD
        echo json_encode(['status' => 'error', 'message' => 'Oops! Something went wrong.']);
=======
        echo "Oops! Something went wrong and we couldn't send your message.";
>>>>>>> b669f641dd6542a4d45d0f48a832e88916b493a0
        exit;
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>