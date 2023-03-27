package com.seeshore.toget.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class Auth0User implements Serializable {
    @JsonProperty("email")
    private String email;
    @JsonProperty("family_name")
    private String family_name;
    @JsonProperty("identities")
    private Identity[] identities;

    public String getAuth0UserId() {
        return identities[0].getUser_id().replaceAll("\\s+", "");
    }
}
