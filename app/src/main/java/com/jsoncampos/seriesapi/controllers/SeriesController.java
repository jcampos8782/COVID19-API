package com.jsoncampos.seriesapi.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Metrics;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.jsoncampos.seriesapi.controllers.responses.GetAllSeriesResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetSeriesByRegionResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetSeriesNearResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetSeriesResponse;
import com.jsoncampos.seriesapi.dto.mappers.Mappers;
import com.jsoncampos.seriesapi.models.Data;
import com.jsoncampos.seriesapi.models.Series;
import com.jsoncampos.seriesapi.services.SeriesSearchService;

@RestController
@CrossOrigin(origins = "*" )
@RequestMapping(path = "/api/series")
public class SeriesController {
	
	private static double DEFAULT_DISTANCE = 10.0;
	private static char DEFAULT_UNIT = 'k'; // Kilometers
	
	private SeriesSearchService searchSvc;
	
	@Autowired
	public SeriesController(SeriesSearchService searchSvc) {
		this.searchSvc = searchSvc;
	}
	
	@GetMapping
	public GetAllSeriesResponse getAllSeries() {
		 return new GetAllSeriesResponse(
				 searchSvc.findAll().stream().map(Mappers::convertToDto).collect(Collectors.toList()));
	}
	
	@GetMapping("{id}")
	public GetSeriesResponse getSeries(
			@PathVariable("id") String seriesId) {
		
		Series series = searchSvc.find(seriesId);
		if (series == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Series not found");
		}
		
		List<Data> dataForSeries = searchSvc.findDataBySeriesId(seriesId);
		
		return new GetSeriesResponse(
				Mappers.convertToDto(series),
				dataForSeries.stream().map(Mappers::convertToDto).collect(Collectors.toList()));
	}
	
	@GetMapping("{id}/geo")
	public GetSeriesNearResponse getSeriesNear(
			@PathVariable("id") String seriesId,
			@RequestParam double lat,
			@RequestParam double lon,
			@RequestParam Optional<Double> maxDistance,
			@RequestParam Optional<Character> unit) {
		
		Series series = searchSvc.find(seriesId);
		if (series == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Series not found");
		}
		
		List<Data> data = searchSvc.findDataNear(
				seriesId,
				lat, lon, 
				maxDistance.orElse(DEFAULT_DISTANCE),
				unit.orElse(DEFAULT_UNIT).equals('k') ? Metrics.KILOMETERS : Metrics.MILES);
		
		return new GetSeriesNearResponse(
				Mappers.convertToDto(series),
				data.stream().map(Mappers::convertToDto).collect(Collectors.toList()));
	}
	
	@GetMapping("{id}/regions/{regionId}")
	public GetSeriesByRegionResponse getSeriesByRegion(
			@PathVariable("id") String seriesId,
			@PathVariable("regionId") String regionId) {
		
		Series series = searchSvc.find(seriesId);
		if (series == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Series not found");
		}
		
		List<Data> data = searchSvc.findDataByRegionId(seriesId, regionId);
		
		return new GetSeriesByRegionResponse(
				Mappers.convertToDto(series),
				data.stream().map(Mappers::convertToDto).collect(Collectors.toList()));
	}
}
