package com.jsoncampos.seriesapi.controllers;

import java.io.IOException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jsoncampos.seriesapi.controllers.responses.GetHeadlinesResponse;
import com.jsoncampos.seriesapi.dto.mappers.Mappers;
import com.jsoncampos.seriesapi.models.HeadlinesResponse;
import com.jsoncampos.seriesapi.services.HeadlinesService;

@RestController
@CrossOrigin(origins = "*" )
@RequestMapping(path="/api/headlines")
public class HeadlinesController {
	
	@Value("${newsapi.defaultQuery}")
	private String defaultQuery;
	
	@Value("${newsapi.defaultRegion}")
	private String defaultRegion;
	
	private HeadlinesService svc;
	
	@Autowired
	public HeadlinesController(HeadlinesService svc) {
		this.svc = svc;
	}
	
	@GetMapping
	public GetHeadlinesResponse getHeadlines(
			@RequestParam Optional<String> query, 
			@RequestParam Optional<String> region) throws IOException {
			
		try {
		HeadlinesResponse response = svc.getTopHeadlines(
				query.orElse(defaultQuery), 
				region.orElse(defaultRegion));
				
		if (response.getStatus() == "error") {
			return new GetHeadlinesResponse(response.getMessage());
		}
		
		return new GetHeadlinesResponse(
				response.getArticles().stream().map(Mappers::convertToDto).collect(Collectors.toList()));
		
		} catch (IOException e) {
			return new GetHeadlinesResponse(e.getMessage());
		}
	}
}
