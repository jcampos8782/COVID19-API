package com.jsoncampos.covid19.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Metrics;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jsoncampos.covid19.dto.SeriesDto;
import com.jsoncampos.covid19.dto.mappers.Mappers;
import com.jsoncampos.covid19.models.Series;
import com.jsoncampos.covid19.services.SeriesSearchService;

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
	public ResponseEntity<List<SeriesDto>> getAllSeries() {
		return new ResponseEntity<List<SeriesDto>>(
			searchSvc.findAll().stream().map(Mappers::convertToSeriesDto).collect(Collectors.toList()),
			HttpStatus.OK);
	}
	
	@GetMapping("/geo")
	public ResponseEntity<List<SeriesDto>> findSeriesNearLocation(
			@RequestParam double lat,
			@RequestParam double lon,
			@RequestParam Optional<Double> maxDistance,
			@RequestParam Optional<Character> unit) {
		
		List<Series> series = searchSvc.findSeriesNear(
				lat, lon, 
				maxDistance.orElse(DEFAULT_DISTANCE),
				unit.orElse(DEFAULT_UNIT).equals('k') ? Metrics.KILOMETERS : Metrics.MILES);
		
		return new ResponseEntity<List<SeriesDto>>(
				series.stream().map(Mappers::convertToSeriesDto).collect(Collectors.toList()),
				HttpStatus.OK);
	}
	
	@GetMapping("/regions/{id}")
	public ResponseEntity<List<SeriesDto>> findSeriesByRegion(
			@PathVariable("id") String regionId) {
		
		return new ResponseEntity<List<SeriesDto>>(
				searchSvc.findSeriesByRegionId(regionId).stream().map(Mappers::convertToSeriesDto).collect(Collectors.toList()),
				HttpStatus.OK);
	}
}
