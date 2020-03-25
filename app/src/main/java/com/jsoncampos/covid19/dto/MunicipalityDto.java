package com.jsoncampos.covid19.dto;

import static com.google.common.base.Preconditions.checkNotNull;

public class MunicipalityDto {
	private String id;
	private String name;

	public String getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public static class Builder {
		private MunicipalityDto dto;
		
		public Builder() {
			this.dto = new MunicipalityDto();
		}
		
		public Builder withId(String id) {
			this.dto.setId(id);
			return this;
		}
		
		public Builder withName(String name) {
			this.dto.setName(name);
			return this;
		}
		
		public MunicipalityDto build() {
			checkNotNull(this.dto.getName());
			return this.dto;
		}
	}
}
