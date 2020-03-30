package com.jsoncampos.seriesapi.services;

import java.util.List;

import org.springframework.data.geo.Metric;

import com.jsoncampos.seriesapi.models.Data;
import com.jsoncampos.seriesapi.models.Series;

public interface SeriesSearchService {
	Series find(String seriesId);
	List<Series> findAll();
	
	List<Data> findDataBySeriesId(String seriesId);
	List<Data> findDataByRegionId(String seriesId, String regionId);
	List<Data> findDataNear(String seriesId, double latitude, double longitude, double maxDistance, Metric metric);
}
