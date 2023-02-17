package com.seeshore.toget.controller;

import com.seeshore.toget.model.User;
import com.seeshore.toget.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping("/user/new")
    User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
}
