package com.jsoncampos.seriesapi.controllers.responses;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.jsoncampos.seriesapi.dto.SeriesDto;

public class GetSeriesNearResponse extends ResponseEntity<List<SeriesDto>> {
	public GetSeriesNearResponse(List<SeriesDto> series) {
		super(series, HttpStatus.OK);
	}
}
