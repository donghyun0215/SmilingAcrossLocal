<?php

class Reward {
    private $itemName;
    private $imageURL;
    private $pointsUsed;
    private $timeRedeemed;

    public function __construct($itemName, $imageURL, $pointsUsed, $timeRedeemed) {
        $this->itemName= $itemName;   
        $this->imageURL = $imageURL;
        $this->pointsUsed = $pointsUsed;
        $this->timeRedeemed= $timeRedeemed;

    }

    public function getItemName() {
        return $this->itemName;
    }

    public function getImageURL() {
        return $this->imageURL;
    }

    public function getPointsUsed() {
        return $this->pointsUsed;
    }

    public function getTimeRedeemed() {
        return $this->timeRedeemed;
    }

}

?>