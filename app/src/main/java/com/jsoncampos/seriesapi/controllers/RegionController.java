package com.jsoncampos.seriesapi.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.jsoncampos.seriesapi.controllers.responses.GetAllRegionsResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetRegionResponse;
import com.jsoncampos.seriesapi.dto.mappers.Mappers;
import com.jsoncampos.seriesapi.models.Region;
import com.jsoncampos.seriesapi.services.RegionSearchService;

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
	public GetAllRegionsResponse getAllRegions() {
		return new GetAllRegionsResponse(
				searchSvc.findAll().stream().map(Mappers::convertToDto).collect(Collectors.toList()));
	}
	
	@GetMapping("/{id}")
	public GetRegionResponse getRegion(@PathVariable("id") String regionId) {
		Region region = searchSvc.find(regionId);
		
		if(region == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Region not found");
		}
		
		List<Region> subregions = searchSvc.findSubRegions(regionId);
		return new GetRegionResponse(
				Mappers.convertToDto(region),
				subregions.stream().map(Mappers::convertToDto).collect(Collectors.toList()));
	}
}
