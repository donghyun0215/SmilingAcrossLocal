<?php

require_once 'common.php';

class PostDAO {
    public function getAllTravel($email) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                    longitude, latitude, time_visited
                FROM travel_history
                WHERE
                email= :email"; 
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':email', $email, PDO::PARAM_STR);

        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $travel_history = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $travel_history[] =
                new Post (
                    $row['longitude'],
                    $row['latitude'],
                    $row['time_visited']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $travel_history;
    }

    public function getAllRewards($email) {
        // STEP 1
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "SELECT
                    item_name, img_url, points_used, time_redeemed
                FROM reward_history 
                WHERE
                    email=:email
                "; 
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        // STEP 3
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        // STEP 4
        $reward_history = []; // Indexed Array of Post objects
        while( $row = $stmt->fetch() ) {
            $reward_history[] =
                new Reward (
                    $row['item_name'],
                    $row['img_url'],
                    $row['points_used'],
                    $row['time_redeemed']
                    );
        }

        // STEP 5
        $stmt = null;
        $conn = null;

        // STEP 6
        return $reward_history;
    }

    public function add($email, $longitude, $latitude) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "INSERT INTO travel_history
                    (
                        email, 
                        longitude,
                        latitude,
                        time_visited
                    )
                VALUES
                    (
                        :email,
                        :longitude,
                        :latitude,
                        CURRENT_TIMESTAMP
                    )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':longitude', $longitude, PDO::PARAM_STR);
        $stmt->bindParam(':latitude', $latitude, PDO::PARAM_STR);

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }

    public function addReward($email, $item_name, $img_url, $points_used) {
        // STEP 1   
        $connMgr = new ConnectionManager();
        $conn = $connMgr->connect();

        // STEP 2
        $sql = "INSERT INTO reward_history
                    (
                        email, 
                        item_name,
                        img_url,
                        points_used,
                        time_redeemed
                    )
                VALUES
                    (
                        :email,
                        :item_name,
                        :img_url,
                        :points_used,
                        CURRENT_TIMESTAMP
                    )";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':item_name', $item_name, PDO::PARAM_STR);
        $stmt->bindParam(':img_url', $img_url, PDO::PARAM_STR);
        $stmt->bindParam(':points_used', $points_used, PDO::PARAM_STR);
        

        //STEP 3
        $status = $stmt->execute();
        
        // STEP 4
        $stmt = null;
        $conn = null;

        // STEP 5
        return $status;
    }
}


?>