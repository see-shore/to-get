package com.seeshore.toget.repository;

import com.seeshore.toget.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM Users u WHERE u.email = :email LIMIT 1;", nativeQuery = true)
    User findUserByEmail(@Param("email") String email);
}
