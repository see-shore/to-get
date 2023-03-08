package com.seeshore.toget.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin
public class HomeController {
    @RequestMapping("/")
    public String index() {
        return "index.html";
    }

    @RequestMapping("/products")
    public String products() {
        return "index.html";
    }

    @RequestMapping("/login")
    public String login() {
        return "index.html";
    }

    @RequestMapping("/admin")
    public String admin() {
        return "index.html";
    }
}
