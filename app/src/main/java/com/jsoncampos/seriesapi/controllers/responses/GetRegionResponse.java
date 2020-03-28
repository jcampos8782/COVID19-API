package com.jsoncampos.seriesapi.controllers.responses;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jsoncampos.seriesapi.dto.RegionDto;

public class GetRegionResponse extends ResponseEntity<GetRegionResponse.Dto>{

	public GetRegionResponse(RegionDto region, List<RegionDto> subregions) {
		super(new Dto(region, subregions), HttpStatus.OK);
	}
	
	@JsonPropertyOrder({ "id", "name", "parentId", "subregions" })
	static class Dto {
		private RegionDto region;
		private List<RegionDto> subregions;
		
		public Dto(RegionDto r, List<RegionDto> s) {
			this.region = r;
			this.subregions = s;
		}

		public String getId() {
			return region.getId();
		}

		public String getName() {
			return region.getName();
		}
		
		public String getParentId() {
			return region.getParentId();
		}
		
		public List<RegionDto> getSubregions() {
			return subregions;
		}
	}	
}
