package com.seeshore.toget.util;

public class UserIcon {
    static private String baseURL = "https://to-get.s3.us-west-2.amazonaws.com/profile-";
    static public String getIcon(int num) {
        return baseURL + num + ".png";
    }
}
