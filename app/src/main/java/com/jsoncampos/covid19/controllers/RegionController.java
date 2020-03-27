package com.jsoncampos.covid19.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jsoncampos.covid19.dto.RegionDto;
import com.jsoncampos.covid19.dto.mappers.Mappers;
import com.jsoncampos.covid19.services.RegionSearchService;

@RestController
@CrossOrigin(origins = "http://localhost:3000" )
@RequestMapping(path="/api/regions")
public class RegionController {
	
	private RegionSearchService searchSvc;
	
	@Autowired
	public RegionController(RegionSearchService searchSvc) {
		this.searchSvc = searchSvc;
	}
	
	@GetMapping
	public ResponseEntity<List<RegionDto>> getAllRegions() {
		return new ResponseEntity<List<RegionDto>>(
				searchSvc.findAll().stream().map(Mappers::convertToRegionDto).collect(Collectors.toList()),
				HttpStatus.OK);
	}
	
	@GetMapping("/{id}/municipalities")
	public ResponseEntity<List<RegionDto>> getSubRegions(@PathVariable("id") String regionId) {
		return new ResponseEntity<List<RegionDto>>(
				searchSvc.findSubRegions(regionId).stream().map(Mappers::convertToRegionDto).collect(Collectors.toList()),
				HttpStatus.OK);
	}
}
