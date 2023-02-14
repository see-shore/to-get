package com.seeshore.toget;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class ToGetApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToGetApplication.class, args);
	}

}
