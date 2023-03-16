package com.seeshore.toget.controller;

import com.seeshore.toget.model.User;
import com.seeshore.toget.service.IUserService;
import com.seeshore.toget.util.UserIcon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Controller
@CrossOrigin
public class UserController {

    @Autowired
    private IUserService userService;

    // Fetch all users
    @GetMapping("/user/all")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = new ArrayList<>(userService.findAllUsers());
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Fetch one user (by email)
    @GetMapping("/user")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        try {
            User user = userService.findUserByEmail(email);
            user.setLastLoginDate(new Date());
            User savedUser = userService.saveUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Create a new user
    @PostMapping("/user/new")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        try {
            int iconNum = new Random().nextInt(5);
            user.setImageUrl(UserIcon.getIcon(iconNum));
            user.setLastLoginDate(new Date());
            User savedUser = userService.saveUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Delete a user
    @DeleteMapping("/user")
    public ResponseEntity<String> deleteUser(@RequestParam Long userId) {
        try {
            userService.deleteUserById(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Successfully deleted user with ID: " + userId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Update a user
    @PutMapping("/user")
    public ResponseEntity<User> updateUser(@RequestParam Long userId,
                                           @RequestBody User user) {
        try {
            Optional<User> userRecord = userService.findUserById(userId);
            if (userRecord.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided user ID is unknown");
            }

            User fetchedUser = userRecord.get();
            fetchedUser.setFirstName(user.getFirstName());
            fetchedUser.setLastName(user.getLastName());
            fetchedUser.setEmail(user.getEmail());

            User savedUser = userService.saveUser(fetchedUser);
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Fetch most recently logged-in users (last 30 minutes)
    @GetMapping("/user/recent")
    public ResponseEntity<List<User>> getRecentUsers(@RequestParam String email) {
        try {
            List<User> recentUsers = userService.getRecentUsers(email);
            return new ResponseEntity<>(recentUsers, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    e.getMessage(), e);
        }
    }
}
