package com.seeshore.toget.controller;

import com.seeshore.toget.model.User;
import com.seeshore.toget.model.response.Auth0User;
import com.seeshore.toget.service.IUserService;
import com.seeshore.toget.util.FileUtil;
import com.seeshore.toget.util.UserIcon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Controller
@CrossOrigin
public class UserController {

    @Autowired
    private IUserService userService;

    @Value("${auth0.domain}")
    private String auth0Domain;

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
            user.setOrderTotal(0);
            User savedUser = userService.saveUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Delete a user
    @DeleteMapping("/user")
    public ResponseEntity<Long> deleteUser(@RequestParam Long userId) {
        try {
            User user = userService.findUserById(userId).get();
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream inputStream = classLoader.getResourceAsStream("management.txt");
            String token = FileUtil.readFromInputStream(inputStream);
            token = token.replaceAll("\\s+", "");

            HttpHeaders headers = new HttpHeaders();
            RestTemplate restTemplate = new RestTemplate();
            String uri = "https://" + auth0Domain + "/api/v2/users-by-email?email=" + user.getEmail();
            headers.add("authorization", "Bearer " + token);
            HttpEntity<String> entity = new HttpEntity<String>(headers);
            ResponseEntity<Auth0User[]> response = restTemplate.exchange(uri, HttpMethod.GET, entity, Auth0User[].class);
            Auth0User[] users = response.getBody();
            if (users != null && users.length == 0) {
                System.out.println("Provided user ID in Auth0 is unknown");
            }
            String auth0Id = users[0].getAuth0UserId();
            uri = "https://" + auth0Domain + "/api/v2/users/auth0|" + auth0Id;
            ResponseEntity<?> deleteResponse = restTemplate.exchange(uri, HttpMethod.DELETE, entity, String.class);
            userService.deleteUserById(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(userId);
        } catch (Exception e) {
            System.out.println(e);
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
