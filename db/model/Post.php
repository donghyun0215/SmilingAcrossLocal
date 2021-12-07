<?php

class Post {
    private $longitude;
    private $latitude;
    private $time_visited;


    public function __construct($longitude, $latitude, $time_visited) { 
        $this->longitude = $longitude;
        $this->latitude= $latitude;
        $this->time_visited = $time_visited;
    }


    public function getLongitude() {
        return $this->longitude;
    }

    public function getLatitude() {
        return $this->latitude;
    }

    public function getTime() {
        return $this->time_visited;
    }


}

?>