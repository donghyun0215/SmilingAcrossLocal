<?php
require_once 'common.php';
$dao = new PostDAO();
$posts=[];

if( isset($_REQUEST['email'])){
    $email= $_REQUEST['email'];
    $posts = $dao->getAllRewards($email);
}
 // Get an Indexed Array of Post objects

$items = [];
foreach( $posts as $post_object ) {
    $item = [];
    $item["item_name"] = $post_object->getItemName();
    $item["img_url"] = $post_object->getImageURL();
    $item["points_used"] = $post_object->getPointsUsed();
    $item["datetime"] = $post_object->getTimeRedeemed();
    $items[] = $item;
}
// make posts into json and return json data
$postJSON = json_encode($items);
echo $postJSON;
?>
