package com.jsoncampos.covid19.dto.mappers;

import com.jsoncampos.covid19.dto.Covid19CasesDto;
import com.jsoncampos.covid19.models.Covid19Cases;

public class Mappers {
	public static Covid19CasesDto convertToCovid19CasesDto(Covid19Cases model) {
		return new Covid19CasesDto.Builder()
				.withDate(model.getDate())
				.withGeocoordinates(model.getGeo().getY(), model.getGeo().getX())
				.withLocation(model.getLocation().getMunicipality(), model.getLocation().getRegion())
				.withData(model.getCases().getConfirmed(), model.getCases().getDeaths(), model.getCases().getRecovered())
				.build();
	}
}
