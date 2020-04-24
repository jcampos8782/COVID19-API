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
import com.jsoncampos.seriesapi.controllers.responses.GetRegionContactsResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetRegionDemographicsResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetRegionFactsResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetRegionResponse;
import com.jsoncampos.seriesapi.controllers.responses.GetSubregionsResponse;
import com.jsoncampos.seriesapi.dto.ContactsDto;
import com.jsoncampos.seriesapi.dto.DemographicsDto;
import com.jsoncampos.seriesapi.dto.FactsDto;
import com.jsoncampos.seriesapi.dto.mappers.Mappers;
import com.jsoncampos.seriesapi.models.Contacts;
import com.jsoncampos.seriesapi.models.Demographics;
import com.jsoncampos.seriesapi.models.Facts;
import com.jsoncampos.seriesapi.models.Location;
import com.jsoncampos.seriesapi.models.Region;
import com.jsoncampos.seriesapi.services.ContactsService;
import com.jsoncampos.seriesapi.services.DemographicsService;
import com.jsoncampos.seriesapi.services.FactsService;
import com.jsoncampos.seriesapi.services.LocationSearchService;
import com.jsoncampos.seriesapi.services.RegionSearchService;

@RestController
@CrossOrigin(origins = "*" )
@RequestMapping(path="/api/regions")
public class RegionController {
	
	private RegionSearchService searchSvc;
	private LocationSearchService locationSvc;
	private DemographicsService demographicsSvc;
	private FactsService factsSvc;
	private ContactsService contactsSvc;
	
	@Autowired
	public RegionController(
			RegionSearchService searchSvc, 
			LocationSearchService locationSvc, 
			DemographicsService demographicsSvc,
			FactsService factsSvc,
			ContactsService contactsSvc) {
		this.searchSvc = searchSvc;
		this.locationSvc = locationSvc;
		this.demographicsSvc = demographicsSvc;
		this.factsSvc = factsSvc;
		this.contactsSvc = contactsSvc;
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
	
	@GetMapping("/{id}/demographics")
	public GetRegionDemographicsResponse getRegionDemographics(@PathVariable("id") String regionId) {
		Region region = searchSvc.find(regionId);

		if(region == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Region not found");
		}
		
		Demographics demographics = demographicsSvc.getDemographicsForRegion(regionId);
		if (demographics == null) {
			return new GetRegionDemographicsResponse(new DemographicsDto());
		}
		
		return new GetRegionDemographicsResponse(Mappers.convertToDto(demographics));
	}
	
	@GetMapping("/{id}/contacts")
	public GetRegionContactsResponse getRegionContacts(@PathVariable("id") String regionId) {
		Region region = searchSvc.find(regionId);

		if(region == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Region not found");
		}
		
		Contacts contacts = contactsSvc.getContactsForRegion(regionId);
		if (contacts == null) {
			return new GetRegionContactsResponse(new ContactsDto());
		}
		
		return new GetRegionContactsResponse(Mappers.convertToDto(contacts));
	}
	
	@GetMapping("/{id}/facts")
	public GetRegionFactsResponse getRegionFacts(@PathVariable("id") String regionId) {
		Region region = searchSvc.find(regionId);

		if(region == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Region not found");
		}
		
		Facts facts = factsSvc.getFactsForRegion(regionId);
		if (facts == null) {
			return new GetRegionFactsResponse(new FactsDto());
		}
		
		return new GetRegionFactsResponse(Mappers.convertToDto(facts));
	}
}
