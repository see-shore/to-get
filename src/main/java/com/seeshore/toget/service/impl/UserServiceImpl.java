package com.seeshore.toget.service.impl;

import com.seeshore.toget.model.User;
import com.seeshore.toget.repository.UserRepository;
import com.seeshore.toget.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User saveUser(User user) {
        return userRepository.saveAndFlush(user);
    }
}
