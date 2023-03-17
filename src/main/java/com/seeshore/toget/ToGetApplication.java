package com.seeshore.toget;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@ComponentScan
public class ToGetApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToGetApplication.class, args);
	}

}
