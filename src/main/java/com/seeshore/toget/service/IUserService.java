package com.seeshore.toget.service;

import com.seeshore.toget.model.User;

import java.util.List;

public interface IUserService {

    public List<User> findAllUsers();
    public User saveUser(User user);
}
