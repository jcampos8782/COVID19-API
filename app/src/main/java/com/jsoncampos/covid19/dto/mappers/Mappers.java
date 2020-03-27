package com.jsoncampos.covid19.dto.mappers;

import com.jsoncampos.covid19.dto.RegionDto;
import com.jsoncampos.covid19.dto.SeriesDto;
import com.jsoncampos.covid19.models.Region;
import com.jsoncampos.covid19.models.Series;

public class Mappers {
	public static SeriesDto convertToSeriesDto(Series model) {
		return new SeriesDto.Builder()
				.withLocation(model.getLocation().getMunicipalityId(), model.getLocation().getRegionId())
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
