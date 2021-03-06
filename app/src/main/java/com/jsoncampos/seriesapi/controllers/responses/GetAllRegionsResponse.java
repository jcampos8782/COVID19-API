package com.jsoncampos.seriesapi.controllers.responses;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.jsoncampos.seriesapi.dto.RegionDto;

public class GetAllRegionsResponse extends ResponseEntity<List<RegionDto>> {
	public GetAllRegionsResponse(List<RegionDto> regions) {
		super(regions, HttpStatus.OK);
	}
}
