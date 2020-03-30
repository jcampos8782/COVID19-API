package com.jsoncampos.seriesapi.dto;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "id", "name", "columns"})
public class SeriesDto {

	private String id;
	private String name;
	private List<DataDto> data;
	private List<String> columns;
	
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
	public List<DataDto> getData() {
		return this.data;
	}
	public List<String> getColumns() {
		return columns;
	}
	public void setColumns(List<String> columns) {
		this.columns = columns;
	}
	
	public static class Builder {
		private SeriesDto dto = new SeriesDto();
		
		public Builder withId(String id) {
			dto.id = id;
			return this;
		}
		
		public Builder withName(String name) {
			dto.name = name;
			return this;
		}
		
		public Builder withColumns(List<String> columns) {
			dto.columns = columns;
			return this;
		}
		
		public SeriesDto build() {
			checkNotNull(dto.getId(), "ID cannot be null");
			checkNotNull(dto.getName(), "Name cannot be null");
			checkNotNull(dto.getColumns(), "Columns cannot be null");
			return dto;
		}
	}
}
