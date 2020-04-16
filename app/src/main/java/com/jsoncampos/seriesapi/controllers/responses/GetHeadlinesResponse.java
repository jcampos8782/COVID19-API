package com.jsoncampos.seriesapi.controllers.responses;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.jsoncampos.seriesapi.dto.HeadlineDto;

public class GetHeadlinesResponse extends ResponseEntity<GetHeadlinesResponse.Dto> {
	
	public GetHeadlinesResponse(String error) {
		super(new Dto(error), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	public GetHeadlinesResponse(List<HeadlineDto> headlines) {
		super(new Dto(headlines), HttpStatus.OK);
	}
	
	public static class Dto {
		private String error;
		private List<HeadlineDto> headlines;
		
		public Dto(String error) {
			this.error = error;
		}
		
		public Dto(List<HeadlineDto> headlines) {
			this.headlines = headlines;
		}
		
		public String getError() {
			return error;
		}
		public void setError(String error) {
			this.error = error;
		}
		public List<HeadlineDto> getHeadlines() {
			return headlines;
		}
		public void setHeadlines(List<HeadlineDto> headlines) {
			this.headlines = headlines;
		}
		
		
	}
	

}
