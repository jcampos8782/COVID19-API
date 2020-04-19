package com.jsoncampos.seriesapi.controllers.responses;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.jsoncampos.seriesapi.dto.DemographicsDto;

public class GetRegionDemographicsResponse extends ResponseEntity<DemographicsDto>{
	public GetRegionDemographicsResponse(DemographicsDto demographics) {
		super(demographics, HttpStatus.OK);
	}
}
