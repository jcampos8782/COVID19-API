package com.jsoncampos.seriesapi.controllers.responses;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.jsoncampos.seriesapi.dto.FactsDto;

public class GetRegionFactsResponse extends ResponseEntity<FactsDto>{
	public GetRegionFactsResponse(FactsDto dto) {
		super(dto, HttpStatus.OK);
	}
}
