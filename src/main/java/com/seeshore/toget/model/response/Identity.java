package com.seeshore.toget.model.response;

import java.io.Serializable;

public class Identity implements Serializable {
    private String connection;
    private String provider;
    private String user_id;
    private boolean isSocial;

    public String getUser_id() {
        return user_id;
    }
}
