package com.dh.canchas365.amazon.bucket;

public enum BucketName {

    CLUB_IMAGES("1023c05-grupo1");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
