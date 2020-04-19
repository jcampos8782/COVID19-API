package com.jsoncampos.seriesapi.services;

import com.jsoncampos.seriesapi.models.Demographics;

public interface DemographicsService {
	Demographics getDemographicsForRegion(String regionId);
}
