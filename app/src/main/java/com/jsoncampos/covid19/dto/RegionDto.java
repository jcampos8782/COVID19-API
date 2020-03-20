package com.jsoncampos.covid19.dto;

import static com.google.common.base.Preconditions.checkNotNull;

public class RegionDto {
	private String id;
	private String name;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public static class Builder {
		private RegionDto dto;
		
		public Builder() {
			this.dto = new RegionDto();
		}
		
		public Builder withId(String id) {
			dto.id = id;
			return this;
		}
		
		public Builder withName(String name) {
			dto.name = name;
			return this;
		}
		
		public RegionDto build() {
			checkNotNull(dto.getId(), "Region ID cannot be null");
			checkNotNull(dto.getName(), "Region Name cannot be null");
			return dto;
		}
	}
}
