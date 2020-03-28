package com.jsoncampos.seriesapi.dto.mappers;

import com.jsoncampos.seriesapi.dto.RegionDto;
import com.jsoncampos.seriesapi.dto.SeriesDto;
import com.jsoncampos.seriesapi.models.Region;
import com.jsoncampos.seriesapi.models.Series;

public class Mappers {
	public static SeriesDto convertToSeriesDto(Series model) {
		return new SeriesDto.Builder()
				.withRegions(model.getRegions())
				.withData(model.getData())
				.build();
	}
	
	public static RegionDto convertToRegionDto(Region model) {
		return new RegionDto.Builder()
				.withId(model.getId())
				.withParentId(model.getParentId())
				.withName(model.getName())
				.build();
	}
}
