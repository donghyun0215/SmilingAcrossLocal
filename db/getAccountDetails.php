<?php
require_once 'common.php';
$dao = new PostDAO();
$account= $dao->getUserInfo(1); // Get an Indexed Array of Post objects

$items = [];
foreach( $travel_history as $place ) {
    $item = [];
    $item["id"] = $post_object->getID();
    $item["subject"] = $post_object->getSubject();
    $item["entry"] = $post_object->getEntry();
    $item["mood"] = $post_object->getMood();
    $items[] = $item;
}

$item=[];
$item['id']= $account->getUserID();
$item['email']= $account->getEmail();
$item['password']= $account->getPassword();
$item['points']= $account->getPoints();

$items[] = $item;

// make posts into json and return json data
$postJSON = json_encode($items);
echo $postJSON;
?>

