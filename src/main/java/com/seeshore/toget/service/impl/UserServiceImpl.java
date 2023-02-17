package com.seeshore.toget.service.impl;

import com.seeshore.toget.model.User;
import com.seeshore.toget.repository.UserRepository;
import com.seeshore.toget.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
