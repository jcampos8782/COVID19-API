package com.jsoncampos.covid19.services;

import java.util.List;

import org.springframework.data.geo.Metric;

import com.jsoncampos.covid19.models.Series;

public interface SeriesSearchService {
	List<Series> findSeriesByRegionId(String regionId);
	List<Series> findSeriesByMunicipalityId(String municipalityId);
	List<Series> findSeriesNear(double latitude, double longitude, double maxDistance, Metric metric);
}
