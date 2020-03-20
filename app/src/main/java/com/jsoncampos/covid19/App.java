package com.jsoncampos.covid19;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.common.base.Preconditions;

@SpringBootApplication
public class App {
	
	public static void main(String... args) {
		Map<String,String> env = System.getenv();	
		
		Preconditions.checkNotNull(env.get("DB_USER"), "Required environment variable DB_USER not set");
		Preconditions.checkNotNull(env.get("DB_PASS"), "Required environment variable DB_USER not set");
		Preconditions.checkNotNull(env.get("DB_NAME"), "Required environment variable DB_NAME not set");
		Preconditions.checkNotNull(env.get("DB_HOST"), "Required environment variable DB_HOST not set");
		Preconditions.checkNotNull(env.get("DB_PORT"), "Required environment variable DB_PORT not set");
		
		SpringApplication.run(App.class, args);
	}
}
