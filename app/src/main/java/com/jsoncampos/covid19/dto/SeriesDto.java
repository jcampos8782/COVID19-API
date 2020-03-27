package com.jsoncampos.covid19.dto;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SeriesDto {
	private SeriesDto.Location location;
	private Map<String,? extends Object> data;
	
	public SeriesDto.Location getLocation() {
		return location;
	}

	public void setLocation(SeriesDto.Location location) {
		this.location = location;
	}

	public Map<String,? extends Object> getData() {
		return data;
	}

	public void setData(Map<String,? extends Object> data) {
		this.data = data;
	}

	public static class Location {
		private String municipalityId;
		private String regionId;
		
		public String getMunicipalityId() {
			return municipalityId;
		}
		public void setMunicipalityId(String municipalityId) {
			this.municipalityId = municipalityId;
		}
		public String getRegionId() {
			return regionId;
		}
		public void setRegionId(String regionId) {
			this.regionId = regionId;
		}	
	}
	
	public static class Builder {
		private SeriesDto dto;
		
		public Builder() {
			this.dto = new SeriesDto();
			this.dto.location = new SeriesDto.Location();
			this.dto.data = new HashMap<String,Object>();
		}
		
		
		public Builder withLocation(String municipalityId, String regionId) {
			dto.location.setMunicipalityId(municipalityId);
			dto.location.setRegionId(regionId);
			return this;
		}
		
		
		public Builder withData(Map<String,? extends Object> data) {
			dto.data = data;
			return this;
		}
		
		public SeriesDto build() {
			checkNotNull(dto.getLocation(), "Location cannot be null");
			checkNotNull(dto.getLocation().getRegionId(), "Region cannot be null");
			checkNotNull(dto.data, "Data cannot be null");
			return dto;
		}
	}
}
