package com.jsoncampos.seriesapi.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Metrics;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jsoncampos.seriesapi.controllers.responses.GetAllSeriesResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetSeriesByRegionResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetSeriesNearResponse;
import com.jsoncampos.seriesapi.dto.mappers.Mappers;
import com.jsoncampos.seriesapi.models.Series;
import com.jsoncampos.seriesapi.services.SeriesSearchService;

@RestController
@CrossOrigin(origins = "http://localhost:3000" )
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
		return new GetAllSeriesResponse(searchSvc.findAll()
				.stream()
				.map(Mappers::convertToSeriesDto)
				.collect(Collectors.toList()));
	}
	
	@GetMapping("/geo")
	public GetSeriesNearResponse getSeriesNear(
			@RequestParam double lat,
			@RequestParam double lon,
			@RequestParam Optional<Double> maxDistance,
			@RequestParam Optional<Character> unit) {
		
		List<Series> series = searchSvc.findSeriesNear(
				lat, lon, 
				maxDistance.orElse(DEFAULT_DISTANCE),
				unit.orElse(DEFAULT_UNIT).equals('k') ? Metrics.KILOMETERS : Metrics.MILES);
		
		return new GetSeriesNearResponse(series.stream()
				.map(Mappers::convertToSeriesDto)
				.collect(Collectors.toList()));
	}
	
	@GetMapping("/regions/{id}")
	public GetSeriesByRegionResponse getSeriesByRegion(
			@PathVariable("id") String regionId) {
		
		return new GetSeriesByRegionResponse(searchSvc.findSeriesByRegionId(regionId)
				.stream()
				.map(Mappers::convertToSeriesDto)
				.collect(Collectors.toList()));
	}
}
