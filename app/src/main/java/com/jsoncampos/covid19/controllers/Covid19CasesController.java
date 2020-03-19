package com.jsoncampos.covid19.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Metrics;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jsoncampos.covid19.dto.Covid19CasesDto;
import com.jsoncampos.covid19.dto.mappers.Mappers;
import com.jsoncampos.covid19.models.Covid19Cases;
import com.jsoncampos.covid19.services.CaseSearchService;

@RestController
@RequestMapping(path = "/api/covid19/cases")
public class Covid19CasesController {
	
	private static double DEFAULT_DISTANCE = 10.0;
	private static char DEFAULT_UNIT = 'k'; // Kilometers
	
	private CaseSearchService searchSvc;
	
	@Autowired
	public Covid19CasesController(CaseSearchService searchSvc) {
		this.searchSvc = searchSvc;
	}
	
	@GetMapping("/geo")
	public ResponseEntity<List<Covid19CasesDto>> findCovid19CasesForGeolocation(
			@RequestParam double lat,
			@RequestParam double lon,
			@RequestParam Optional<Double> maxDistance,
			@RequestParam Optional<Character> unit) {
		
		List<Covid19Cases> cases = searchSvc.findCasesNear(
				lat, lon, 
				maxDistance.orElse(DEFAULT_DISTANCE),
				unit.orElse(DEFAULT_UNIT).equals('k') ? Metrics.KILOMETERS : Metrics.MILES);
		
		return new ResponseEntity<List<Covid19CasesDto>>(
				cases.stream().map(Mappers::convertToCovid19CasesDto).collect(Collectors.toList()),
				HttpStatus.OK);
	}
	
	@GetMapping("/regions/{region}")
	public ResponseEntity<List<Covid19CasesDto>> findCovid19CasesByRegion(
			@PathVariable("region") String region) {
		
		return new ResponseEntity<List<Covid19CasesDto>>(
				searchSvc.findCasesByRegion(region).stream().map(Mappers::convertToCovid19CasesDto).collect(Collectors.toList()),
				HttpStatus.OK);
	}
}
