<?php
require_once 'common.php';
$status = false;
$result = [];

if( isset($_REQUEST['email']) && isset($_REQUEST['latitude']) && isset($_REQUEST['longitude']) ) {
    $email = $_REQUEST['email'];
    $latitude= $_REQUEST['latitude'];
    $longitude = $_REQUEST['longitude'];
    
    $dao = new PostDAO();
    $status = $dao->add($email, $longitude, $latitude);
}
if ($status)
    $result["status"] = "Post added successfully";
else 
    $result["status"] = "Post was not added";

$postJSON = json_encode($result);
echo $postJSON;
?>


