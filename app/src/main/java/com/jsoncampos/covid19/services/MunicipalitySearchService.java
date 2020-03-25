package com.jsoncampos.covid19.services;

import java.util.List;

import com.jsoncampos.covid19.models.Municipality;

public interface MunicipalitySearchService {
	List<Municipality> findMunicipalitiesForRegion(String regionId);
}
