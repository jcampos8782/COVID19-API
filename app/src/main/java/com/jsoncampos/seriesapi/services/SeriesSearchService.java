package com.jsoncampos.seriesapi.services;

import java.util.List;

import org.springframework.data.geo.Metric;

import com.jsoncampos.seriesapi.models.Series;

public interface SeriesSearchService {
	List<Series> findAll();
	List<Series> findSeriesByRegionId(String regionId);
	List<Series> findSeriesNear(double latitude, double longitude, double maxDistance, Metric metric);
}
