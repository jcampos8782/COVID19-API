package com.jsoncampos.seriesapi.dto;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "regions", "data" })
public class DataDto {
	private Map<String,? extends Object> data;
	private List<String> regions;

	public List<String> getRegions() {
		return regions;
	}
	
	public void setRegions(List<String> regions) {
		this.regions = regions;
	}

	public Map<String,? extends Object> getData() {
		return data;
	}

	public void setData(Map<String,? extends Object> data) {
		this.data = data;
	}
	
	public static class Builder {
		private DataDto dto;
		
		public Builder() {
			this.dto = new DataDto();
			this.dto.regions = new ArrayList<String>();
			this.dto.data = new HashMap<String,Object>();
		}

		public Builder withRegions(List<String> regions) {
			dto.setRegions(regions);
			return this;
		}
		
		public Builder withData(Map<String,? extends Object> data) {
			dto.data = data;
			return this;
		}
		
		public DataDto build() {
			checkNotNull(dto.getRegions(), "Regions cannot be null");
			checkNotNull(dto.data, "Data cannot be null");
			return dto;
		}
	}
}
