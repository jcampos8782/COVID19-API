package com.jsoncampos.seriesapi.services;

import com.jsoncampos.seriesapi.models.Location;

public interface LocationSearchService {
	Location findClosestLocation(double latitude, double longitude);
}
