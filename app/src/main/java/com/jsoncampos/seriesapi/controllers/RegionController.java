package com.jsoncampos.seriesapi.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.jsoncampos.seriesapi.controllers.responses.GetAllRegionsResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetNearestRegionResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetRegionResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetSubregionsResponse;
import com.jsoncampos.seriesapi.dto.mappers.Mappers;
import com.jsoncampos.seriesapi.models.Location;
import com.jsoncampos.seriesapi.models.Region;
import com.jsoncampos.seriesapi.services.LocationSearchService;
import com.jsoncampos.seriesapi.services.RegionSearchService;

@RestController
@CrossOrigin(origins = "*" )
@RequestMapping(path="/api/regions")
public class RegionController {
	
	private RegionSearchService searchSvc;
	private LocationSearchService locationSvc;

	@Autowired
	public RegionController(RegionSearchService searchSvc, LocationSearchService locationSvc) {
		this.searchSvc = searchSvc;
		this.locationSvc = locationSvc;
	}

	@GetMapping
	public GetAllRegionsResponse getAllRegions() {
		return new GetAllRegionsResponse(
				searchSvc.findAll().stream().map(Mappers::convertToDto).collect(Collectors.toList()));
	}

	@GetMapping("/geo")
	public GetNearestRegionResponse getNearestRegion(
			@RequestParam double lat,
			@RequestParam double lon) {
		Location nearestLocation = locationSvc.findClosestLocation(lat, lon);

		if (nearestLocation == null) {
			return new GetNearestRegionResponse(null, new ArrayList<>(), new ArrayList<>());
		}

		Region nearestRegion = searchSvc.find(nearestLocation.getRegionId());
		List<Region> parents = new ArrayList<>();
		String parentId = nearestRegion.getParentId();

		while(parentId != null) {
			Region parent = searchSvc.find(parentId);
			parentId = parent.getParentId();
			parents.add(parent);
		}

		List<Region> subregions = searchSvc.findSubRegions(nearestRegion.getId());

		return new GetNearestRegionResponse(
				Mappers.convertToDto(nearestRegion),
				parents.stream().map(Mappers::convertToDto).collect(Collectors.toList()), 
				subregions.stream().map(Mappers::convertToDto).collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public GetRegionResponse getRegion(@PathVariable("id") String regionId) {
		Region region = searchSvc.find(regionId);

		if(region == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Region not found");
		}

		List<Region> parents = new ArrayList<>();
		String parentId = region.getParentId();

		while(parentId != null) {
			Region parent = searchSvc.find(parentId);
			parentId = parent.getParentId();
			parents.add(parent);
		}


		List<Region> subregions = searchSvc.findSubRegions(regionId);
		return new GetRegionResponse(
				Mappers.convertToDto(region),
				parents.stream().map(Mappers::convertToDto).collect(Collectors.toList()),
				subregions.stream().map(Mappers::convertToDto).collect(Collectors.toList()));
	}

	@GetMapping("/{id}/subregions")
	public GetSubregionsResponse getSubregions(@PathVariable("id") String regionId) {
		Region region = searchSvc.find(regionId);

		if(region == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Region not found");
		}

		List<Region> subregions = searchSvc.findSubRegions(regionId);
		return new GetSubregionsResponse(subregions.stream().map(Mappers::convertToDto).collect(Collectors.toList()));
	}
	
}
