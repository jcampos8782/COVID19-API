package com.jsoncampos.seriesapi.controllers.responses;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jsoncampos.seriesapi.dto.RegionDto;

public class GetNearestRegionResponse extends ResponseEntity<GetNearestRegionResponse.Dto> {
	public GetNearestRegionResponse(RegionDto region, List<RegionDto> parents, List<RegionDto> subregions) {
		super(new Dto(region, parents, subregions), HttpStatus.OK);
	}
	
	@JsonPropertyOrder({ "id", "name", "parents", "subregions" })
	static class Dto {
		private RegionDto region;
		private List<RegionDto> parents;
		private List<RegionDto> subregions;
		
		public Dto(RegionDto r, List<RegionDto> p, List<RegionDto> s) {
			this.region = r;
			this.parents = p;
			this.subregions = s;
		}

		public String getId() {
			return region.getId();
		}

		public String getName() {
			return region.getName();
		}
		
		public List<RegionDto> getParents() {
			return parents;
		}
		
		public List<RegionDto> getSubregions() {
			return subregions;
		}
	}	
}
