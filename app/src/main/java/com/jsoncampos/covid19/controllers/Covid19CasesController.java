package com.jsoncampos.covid19.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Metrics;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jsoncampos.covid19.models.Covid19Cases;
import com.jsoncampos.covid19.services.CaseSearchService;

@RestController
@RequestMapping(path = "/api/covid19/cases")
public class Covid19CasesController {
	
	private CaseSearchService searchSvc;
	
	@Autowired
	public Covid19CasesController(CaseSearchService searchSvc) {
		this.searchSvc = searchSvc;
	}
	
	@GetMapping("/geo")
	public ResponseEntity<List<Covid19Cases>> findCovid19CasesForGeolocation(
			@RequestParam double lat,
			@RequestParam double lon,
			@RequestParam double maxDistance,
			@RequestParam String unit) {
		
		return new ResponseEntity<List<Covid19Cases>>(
				searchSvc.findCasesNear(lat, lon, maxDistance, "k".equals(unit) ? Metrics.KILOMETERS : Metrics.MILES),
				HttpStatus.OK);
	}
}
