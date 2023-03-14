package com.seeshore.toget.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.seeshore.toget.service.IAmazonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AmazonServiceImpl implements IAmazonService {
    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Value("${aws.s3.region}")
    private String s3Region;

    @Override
    public String upload(MultipartFile file) throws IOException {

        Map<String, String> optionalMetadata = new HashMap<>();
        optionalMetadata.put("Content-Type", file.getContentType());
        optionalMetadata.put("Content-Length", String.valueOf(file.getSize()));

        UUID uuid = UUID.randomUUID();
        String path = String.format("%s/%s", bucketName, uuid);
        String fileName = String.format("%s", file.getOriginalFilename());

        ObjectMetadata objectMetadata = new ObjectMetadata();
        optionalMetadata.forEach(objectMetadata::addUserMetadata);

        String imageUrl = "https://" + bucketName + ".s3." + s3Region + ".amazonaws.com/"
                + uuid + "/" + fileName;

        amazonS3.putObject(path, fileName, file.getInputStream(), objectMetadata);

        return imageUrl;
    }
}
