package com.jsoncampos.seriesapi.controllers.responses;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jsoncampos.seriesapi.dto.DataDto;
import com.jsoncampos.seriesapi.dto.SeriesDto;

public class GetSeriesResponse extends ResponseEntity<GetSeriesResponse.Dto> {
	public GetSeriesResponse(SeriesDto series, List<DataDto> data) {
		super(new Dto(series, data), HttpStatus.OK);
	}
	
	@JsonPropertyOrder({ "id", "name", "columns", "data" })
	static class Dto {
		
		private String id;
		private String name;
		private List<String> columns;
		private List<DataDto> data;
		
		Dto(SeriesDto series, List<DataDto> data) {
			this.id = series.getId();
			this.name = series.getName();
			this.columns = series.getColumns();
			this.data = data;
		}

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

		public List<String> getColumns() {
			return columns;
		}

		public void setColumns(List<String> columns) {
			this.columns = columns;
		}

		public List<DataDto> getData() {
			return data;
		}

		public void setData(List<DataDto> data) {
			this.data = data;
		}
	}
}
