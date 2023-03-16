package com.seeshore.toget.service;

import com.seeshore.toget.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    public Optional<User> findUserById(Long userId);
    public List<User> findAllUsers();
    public User saveUser(User user);
    public void deleteUserById(Long userId);
    public User findUserByEmail(String email);
    public List<User> getRecentUsers(String email);
}
