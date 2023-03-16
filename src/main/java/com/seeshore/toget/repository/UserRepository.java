package com.seeshore.toget.repository;

import com.seeshore.toget.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM users u WHERE u.email = :email LIMIT 1;", nativeQuery = true)
    User findUserByEmail(@Param("email") String email);

    @Query(
            value = "SELECT * FROM users u " +
                    "WHERE u.last_login_date > DATE_SUB(convert_tz(now(),'+00:00','-07:00'), INTERVAL 30 MINUTE) " +
                    "AND u.email <> :email",
            nativeQuery = true
    )
    List<User> getRecentlyLoggedInUsers(@Param("email") String email);
}
