package com.jsoncampos.seriesapi.controllers;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.jsoncampos.seriesapi.dto.HeadlineDto;
import com.jsoncampos.seriesapi.models.HeadlinesResponse;
import com.jsoncampos.seriesapi.models.HeadlinesResponse.Article;
import com.jsoncampos.seriesapi.services.HeadlinesService;
import com.jsoncampos.seriesapi.services.HeadlinesServiceImpl;

@RestController
@CrossOrigin(origins = "*" )
@RequestMapping(path="/api/headlines")
public class HeadlinesController {
	
	@GetMapping
	public ResponseEntity<List<HeadlineDto>> getHeadlines() throws IOException {
		HeadlinesService svc = new HeadlinesServiceImpl("https://newsapi.org/v2/", "049eb37fc0d847aeb42338f014abe761");
		HeadlinesResponse response = svc.getTopHeadlines("coronavirus", "us");
		
		return new ResponseEntity<List<HeadlineDto>>(
				response.getArticles().stream().map(HeadlinesController::mapToDto).collect(Collectors.toList()), 
				HttpStatus.OK);
	}
	
	private static HeadlineDto mapToDto(Article article) {
		HeadlineDto dto = new HeadlineDto();
		dto.setPublishedAt(article.getPublishedAt());
		dto.setSource(article.getSource().getName());
		dto.setTitle(article.getTitle());
		dto.setUrl(article.getTitle());
		return dto;
	}
	
	
}
