package com.jsoncampos.covid19.dto.mappers;

import com.jsoncampos.covid19.dto.Covid19CasesDto;
import com.jsoncampos.covid19.dto.MunicipalityDto;
import com.jsoncampos.covid19.dto.RegionDto;
import com.jsoncampos.covid19.models.Covid19Cases;
import com.jsoncampos.covid19.models.Municipality;
import com.jsoncampos.covid19.models.Region;

public class Mappers {
	public static Covid19CasesDto convertToCovid19CasesDto(Covid19Cases model) {
		return new Covid19CasesDto.Builder()
				.withDate(model.getDate())
				.withGeocoordinates(model.getGeo().getY(), model.getGeo().getX())
				.withLocation(model.getLocation().getMunicipality(), model.getLocation().getRegion())
				.withData(model.getCases().getConfirmed(), model.getCases().getDeaths(), model.getCases().getRecovered())
				.build();
	}
	
	public static RegionDto convertToRegionDto(Region model) {
		return new RegionDto.Builder()
				.withId(model.getId())
				.withName(model.getName())
				.build();
	}
	
	public static MunicipalityDto convertToMunicipalityDto(Municipality model) {
		return new MunicipalityDto.Builder()
				.withId(model.getId())
				.withName(model.getName())
				.build();
	}
}
