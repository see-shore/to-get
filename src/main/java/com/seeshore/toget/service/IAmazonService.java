package com.seeshore.toget.service;

import com.amazonaws.services.s3.model.PutObjectResult;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IAmazonService {
    public String upload(MultipartFile multipartFile) throws IOException;
}
