package com.jsoncampos.seriesapi.services;

import com.jsoncampos.seriesapi.models.Facts;

public interface FactsService {
	public Facts getFactsForRegion(String regionId);
}
